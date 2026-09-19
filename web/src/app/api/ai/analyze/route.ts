import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Lightweight sliding-window in-memory rate limiter (Protects Free-Tier Quota)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 25; // 25 calls per minute max
const ipRequestHistory = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestHistory.get(ip) || [];
  const validTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  validTimestamps.push(now);
  ipRequestHistory.set(ip, validTimestamps);
  return false;
}

// Input sanitization helper to neutralize Prompt Injection & Payload bloat
function sanitizeInput(str: unknown, maxLen = 250): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[^\w\s.,!?:;@()/#&_'-]/gi, '') // Remove dangerous escape/control characters
    .trim()
    .slice(0, maxLen);
}

export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before requesting further AI analyses.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const email_id = sanitizeInput(body.email_id, 30);
    const subject = sanitizeInput(body.subject, 180);
    const review_reason = sanitizeInput(body.review_reason, 100);
    
    // Whitelist validate defect_fields array
    const ALLOWED_FIELDS = ['shipper', 'consignee', 'notify_party', 'port_of_loading', 'port_of_discharge', 'container_count', 'gross_weight_kg'];
    const defect_fields = Array.isArray(body.defect_fields)
      ? body.defect_fields.filter((f: any) => typeof f === 'string' && ALLOWED_FIELDS.includes(f))
      : [];

    const isReview = Boolean(review_reason);

    // Enforce strict prompt boundary encapsulation
    const prompt = isReview
      ? `You are Averis Docs AI, an autonomous logistics compliance specialist for Averis & APRIL Group.
A shipment document exception requires human triage.
Context (Delimited):
- Email ID: <<<${email_id}>>>
- Subject: <<<${subject}>>>
- Escalation Reason: <<<${review_reason}>>>

Respond strictly with a valid JSON object matching this schema:
{
  "risk_severity": "HIGH",
  "summary": "Concise 2-sentence explanation of the escalation reason (${review_reason}) and cargo release risk.",
  "recommended_action": "ESCALATE",
  "action_rationale": "Clear operational recommendation for the operations lead.",
  "carrier_email_draft": {
    "subject": "DOCUMENTATION EXCEPTION NOTICE - ${email_id} - Immediate Action Required",
    "body": "Professional 3-paragraph email to carrier/supplier requesting authentic documents."
  }
}`
      : `You are Averis Docs AI, an autonomous logistics compliance specialist for Averis & APRIL Group.
Analyze this shipping document discrepancy between the Customer Shipping Instruction (SI - Single Source of Truth) and Carrier Draft Bill of Lading (BL).

SHIPMENT CONTEXT (Delimited):
- Email ID: <<<${email_id}>>>
- Subject: <<<${subject}>>>
- Flagged Defective Fields: <<<${defect_fields.join(', ') || 'None'}>>>

Respond strictly with a valid JSON object matching this schema:
{
  "risk_severity": "HIGH",
  "summary": "Concise 2-sentence explanation of the discrepancy and cargo risk.",
  "recommended_action": "ESCALATE",
  "action_rationale": "Clear operational reasoning for the lead officer.",
  "carrier_email_draft": {
    "subject": "DISCREPANCY AMENDMENT NOTICE - ${email_id} - Carrier Draft BL Correction Required",
    "body": "Professional 3-paragraph email to shipping line operations demanding corrected draft BL."
  }
}`;

    if (GEMINI_API_KEY && !GEMINI_API_KEY.startsWith('your_')) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
        
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.1
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
        console.warn('Gemini API call failed, safely falling back to deterministic reasoning:', err);
      }
    }

    // Secure fallback
    const defectiveStr = defect_fields.join(', ') || 'cargo details';
    const fallbackResponse = isReview
      ? {
          success: true,
          ai_source: 'Averis Deterministic Reasoning Engine',
          risk_severity: 'HIGH',
          summary: review_reason === 'wrong_doc_type'
            ? 'Commercial Invoice / Packing List received instead of carrier Draft Bill of Lading. Verification paused to prevent false matching.'
            : review_reason === 'unreadable'
            ? 'Attached document scan is degraded or unreadable. Halted to avoid hallucinations.'
            : review_reason === 'missing_attachment'
            ? 'Email references shipping documents but attachments are missing.'
            : 'Shipment flagged with missing mandatory fields or placeholders.',
          recommended_action: 'ESCALATE',
          action_rationale: 'Officer must request the carrier to provide authentic, legible Draft Bill of Lading documentation.',
          carrier_email_draft: {
            subject: `DOCUMENTATION NOTICE - ${email_id} - ${review_reason === 'wrong_doc_type' ? 'Authentic Draft BL Required' : 'Legible Documentation Required'}`,
            body: `Dear Carrier Operations Team,\n\nRegarding shipment "${subject}", please provide authentic, high-resolution Draft Bill of Lading documentation to complete verification.\n\nBest Regards,\nOperations Team, Averis Shipping Documentation`
          }
        }
      : {
          success: true,
          ai_source: 'Averis Deterministic Reasoning Engine',
          risk_severity: defect_fields.includes('consignee') || defect_fields.includes('gross_weight_kg') ? 'HIGH' : 'MEDIUM',
          summary: `Discrepancy detected in ${defectiveStr}. Draft Bill of Lading differs from authorized Shipping Instruction, risking customs detention and demurrage fees.`,
          recommended_action: 'ESCALATE',
          action_rationale: `Customer authorization in SI is binding. Discrepancy in ${defectiveStr} must be rectified before issuing original documents.`,
          carrier_email_draft: {
            subject: `DISCREPANCY AMENDMENT NOTICE - ${email_id} - Urgent BL Correction Required`,
            body: `Dear Carrier Operations Team,\n\nA discrepancy was identified in field(s): ${defectiveStr} for shipment "${subject}". Please issue an amended Draft Bill of Lading.\n\nBest Regards,\nOperations Lead, Averis Shipping Documentation`
          }
        };

    return NextResponse.json(fallbackResponse);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to process AI analysis request.' }, { status: 500 });
  }
}
