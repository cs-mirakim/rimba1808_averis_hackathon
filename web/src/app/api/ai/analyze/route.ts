import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email_id, subject, defect_fields = [], si_fields = {}, bl_fields = {} } = body;

    const prompt = `You are Averis Docs AI, an autonomous logistics compliance specialist for Averis & APRIL Group.
Analyze this shipping document discrepancy between the Customer Shipping Instruction (SI - Single Source of Truth) and Carrier Draft Bill of Lading (BL).

SHIPMENT CONTEXT:
- Email ID: ${email_id}
- Subject: ${subject}
- Flagged Defective Fields: ${defect_fields.join(', ') || 'None'}

DATA VALUES:
SI (Customer Order):
${JSON.stringify(si_fields, null, 2)}

BL (Carrier Draft):
${JSON.stringify(bl_fields, null, 2)}

Respond with a JSON object strictly matching this format:
{
  "risk_severity": "HIGH",
  "summary": "Concise 2-sentence explanation of the discrepancy and cargo risk.",
  "recommended_action": "ESCALATE",
  "action_rationale": "Clear operational reasoning for the lead officer.",
  "carrier_email_draft": {
    "subject": "DISCREPANCY AMENDMENT NOTICE - ${email_id} - Carrier Draft BL Correction Required",
    "body": "Professional 3-paragraph email to shipping line operations demanding corrected draft BL before vessel cutoff."
  }
}`;

    if (GEMINI_API_KEY && !GEMINI_API_KEY.startsWith('your_')) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            return NextResponse.json({ success: true, ai_source: 'Google Gemini 3.6 Flash', ...parsed });
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to rule reasoning engine:', err);
      }
    }

    // High-precision fallback if quota limit or offline
    const defectiveStr = defect_fields.join(', ') || 'cargo details';
    const fallbackResponse = {
      success: true,
      ai_source: 'Averis Deterministic Reasoning Engine',
      risk_severity: defect_fields.includes('consignee') || defect_fields.includes('gross_weight_kg') ? 'HIGH' : 'MEDIUM',
      summary: `Discrepancy detected in ${defectiveStr}. Draft Bill of Lading differs from authorized Shipping Instruction, risking customs penalty and demurrage fees at port of discharge.`,
      recommended_action: 'ESCALATE',
      action_rationale: `Customer authorization in SI is strictly binding. Discrepancy in ${defectiveStr} must be rectified by shipping line before issuance of original negotiable documents.`,
      carrier_email_draft: {
        subject: `DISCREPANCY AMENDMENT NOTICE - ${email_id} - Urgent BL Correction Required`,
        body: `Dear Carrier Operations Team,\n\nUpon automated verification of Draft Bill of Lading for ${subject}, a critical discrepancy was identified in field(s): ${defectiveStr}.\n\nSI Instruction specifies: ${defect_fields.map((f: string) => `${f}: ${si_fields[f] || 'N/A'}`).join(' | ')}\nDraft BL specifies: ${defect_fields.map((f: string) => `${f}: ${bl_fields[f] || 'N/A'}`).join(' | ')}\n\nPlease immediately issue an amended Draft Bill of Lading matching our Shipping Instruction to prevent cargo release delays.\n\nBest Regards,\nOperations Lead, Averis Shipping Documentation`
      }
    };

    return NextResponse.json(fallbackResponse);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
