import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email_id, subject, defect_fields = [], si_fields = {}, bl_fields = {}, review_reason } = body;

    const isReview = Boolean(review_reason);
    const prompt = isReview
      ? `You are Averis Docs AI, an autonomous logistics compliance specialist for Averis & APRIL Group.
A shipment document exception requires human triage.
Context:
- Email ID: ${email_id}
- Subject: ${subject}
- Escalation Reason: ${review_reason}

Respond with a JSON object strictly matching this format:
{
  "risk_severity": "HIGH",
  "summary": "Concise 2-sentence explanation of the escalation reason (${review_reason}) and cargo release risk.",
  "recommended_action": "ESCALATE",
  "action_rationale": "Clear operational recommendation for the operations lead.",
  "carrier_email_draft": {
    "subject": "DOCUMENTATION EXCEPTION NOTICE - ${email_id} - Immediate Action Required",
    "body": "Professional 3-paragraph email to carrier/supplier requesting authentic documents or clarification."
  }
}`
      : `You are Averis Docs AI, an autonomous logistics compliance specialist for Averis & APRIL Group.
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
    const fallbackResponse = isReview
      ? {
          success: true,
          ai_source: 'Averis Deterministic Reasoning Engine',
          risk_severity: 'HIGH',
          summary: review_reason === 'wrong_doc_type'
            ? 'Commercial Invoice / Packing List received instead of carrier Draft Bill of Lading. Verification was safely paused to prevent false matching.'
            : review_reason === 'unreadable'
            ? 'Attached document scan is degraded or unreadable. Automatic verification was halted to avoid hallucinations.'
            : review_reason === 'missing_attachment'
            ? 'Email references shipping documents but attachments are missing.'
            : 'Shipment flagged with missing mandatory fields or placeholders.',
          recommended_action: 'ESCALATE',
          action_rationale: 'Officer must request the carrier or dispatching party to provide authentic, legible Draft Bill of Lading documentation.',
          carrier_email_draft: {
            subject: `DOCUMENTATION NOTICE - ${email_id} - ${review_reason === 'wrong_doc_type' ? 'Authentic Draft BL Required' : 'Legible Documentation Required'}`,
            body: review_reason === 'wrong_doc_type'
              ? `Dear Carrier Operations Team,\n\nWe received the attachments for shipment "${subject}". However, the attached document was identified as a Commercial Invoice rather than the carrier Draft Bill of Lading.\n\nPlease immediately issue and transmit the authentic Draft Bill of Lading for automated verification prior to vessel cutoff.\n\nBest Regards,\nDocumentation Operations Team, Averis / APRIL Group`
              : `Dear Carrier Operations Team,\n\nRegarding shipment "${subject}", the documentation attached could not be processed due to: ${review_reason}.\n\nPlease provide high-resolution, complete Draft Bill of Lading documents at your earliest convenience.\n\nBest Regards,\nDocumentation Operations Team, Averis / APRIL Group`
          }
        }
      : {
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
