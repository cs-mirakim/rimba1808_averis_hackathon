'use client';

import React, { useState, useEffect } from 'react';
import { EmailRecord } from '../lib/types';
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  UserCheck, 
  Send, 
  Mail, 
  Check, 
  Sparkles, 
  Copy, 
  Bot, 
  FileText
} from 'lucide-react';

interface DiffViewerModalProps {
  email: EmailRecord | null;
  onClose: () => void;
  onAction: (emailId: string, actionType: 'APPROVE' | 'ESCALATE') => void;
}

// Multi-tier storage & in-memory cache to persist Gemini API responses
const aiMemoryCache: Record<string, any> = {};

function getCachedAi(emailId: string) {
  if (aiMemoryCache[emailId]) return aiMemoryCache[emailId];
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(`gemini_analysis_${emailId}`) || sessionStorage.getItem(`gemini_analysis_${emailId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        aiMemoryCache[emailId] = parsed;
        return parsed;
      }
    } catch {}
  }
  return null;
}

function setCachedAi(emailId: string, data: any) {
  aiMemoryCache[emailId] = data;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`gemini_analysis_${emailId}`, JSON.stringify(data));
      sessionStorage.setItem(`gemini_analysis_${emailId}`, JSON.stringify(data));
    } catch {}
  }
}

interface CarrierNoticeDraft {
  subject?: string;
  body?: string;
}

interface AiAnalysisResult {
  summary?: string;
  ai_source?: string;
  risk_severity?: string;
  recommended_action?: string;
  action_rationale?: string;
  carrier_email_draft?: CarrierNoticeDraft;
  raw_explanation?: string;
}

export const DiffViewerModal: React.FC<DiffViewerModalProps> = ({
  email,
  onClose,
  onAction
}) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiAnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'APPROVE' | 'ESCALATE' | null>(null);

  // Restore cached Gemini response if already analyzed, otherwise reset
  useEffect(() => {
    setCopied(false);
    setAiLoading(false);
    setConfirmAction(null);
    if (email?.email_id) {
      const cached = getCachedAi(email.email_id);
      setAiResult(cached || null);
    } else {
      setAiResult(null);
    }
  }, [email?.email_id]);

  if (!email) return null;

  const fieldsList: { key: keyof NonNullable<EmailRecord['si_fields']>; label: string }[] = [
    { key: 'shipper', label: '1. Shipper / Exporter' },
    { key: 'consignee', label: '2. Consignee (Receiver)' },
    { key: 'notify_party', label: '3. Notify Party' },
    { key: 'port_of_loading', label: '4. Port of Loading (POL)' },
    { key: 'port_of_discharge', label: '5. Port of Discharge (POD)' },
    { key: 'container_count', label: '6. Container Quantity' },
    { key: 'gross_weight_kg', label: '7. Gross Weight (KG)' },
  ];

  const si = email.si_fields || {};
  const bl = email.bl_fields || {};

  const hasDocs = Boolean(
    (email.si_fields && Object.values(email.si_fields).some(v => v !== null && v !== undefined && v !== '')) ||
    (email.bl_fields && Object.values(email.bl_fields).some(v => v !== null && v !== undefined && v !== ''))
  );

  const handleCallGemini = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_id: email.email_id,
          subject: email.subject,
          defect_fields: email.defect_fields || [],
          si_fields: email.si_fields || {},
          bl_fields: email.bl_fields || {},
          review_reason: email.review_reason,
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAiResult(data);
        if (email?.email_id) {
          setCachedAi(email.email_id, data);
        }
      }
    } catch (err) {
      console.error('Failed to analyze with Gemini:', err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopyEmail = () => {
    if (aiResult?.carrier_email_draft?.body) {
      const textToCopy = `Subject: ${aiResult.carrier_email_draft.subject}\n\n${aiResult.carrier_email_draft.body}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Shared reusable AI Analysis and Draft Box
  const renderAiBox = () => {
    if (!aiResult) return null;
    return (
      <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-slate-50 border border-emerald-300 rounded-xl p-4 text-xs space-y-3 shadow-sm animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-emerald-200/80">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald text-white flex items-center justify-center shadow-xs">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-emerald-950">
              {aiResult.ai_source || 'Google Gemini 3.6 Flash'} • Risk Analysis & Dispatch Draft
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-mono font-medium">
              Cached
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
              aiResult.risk_severity === 'HIGH' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}>
              {aiResult.risk_severity} RISK
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div>
            <p className="font-semibold text-slate-800">Operational Assessment & Impact:</p>
            <p className="text-slate-600 leading-relaxed mt-0.5">{aiResult.summary}</p>
          </div>

          <div className="pt-2 border-t border-slate-200/80">
            <p className="font-semibold text-slate-800">AI Recommended Action:</p>
            <p className="text-emerald-950 font-medium mt-0.5">
              <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 mr-1.5">
                {aiResult.recommended_action}
              </span>
              {aiResult.action_rationale}
            </p>
          </div>

          {aiResult.carrier_email_draft && (
            <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-700" />
                  Official Notice Draft (Ready to Dispatch):
                </p>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-medium text-[11px] shadow-xs transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Draft'}</span>
                </button>
              </div>
              <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-[11px] font-mono text-slate-800 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto shadow-inner">
                {`Subject: ${aiResult.carrier_email_draft.subject}\n\n${aiResult.carrier_email_draft.body}`}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150 font-sans cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden cursor-default"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                {email.email_id}
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                email.status === 'OK'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : email.status === 'MISMATCH'
                  ? 'bg-red-50 text-red-800 border-red-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}>
                {email.status}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Category: {email.category}
              </span>
              {email.review_reason && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
                  Reason: {email.review_reason}
                </span>
              )}
            </div>
            <h2 className="text-sm font-semibold text-slate-900 mt-1 line-clamp-1">
              {email.subject}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {!hasDocs ? (
            email.status === 'NEEDS_REVIEW' || email.review_reason ? (
              /* HUMAN ESCALATION ALERT CARD (wrong_doc_type, unreadable, etc.) */
              <div className="space-y-4">
                <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-xl space-y-3 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-amber-950">
                      <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                        <AlertCircle className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                          Triage Context: Human Escalation Triggered
                        </h3>
                        <p className="text-sm font-semibold text-amber-950">
                          {email.review_reason === 'wrong_doc_type'
                            ? 'Document Type Mismatch — Commercial Invoice Detected'
                            : email.review_reason === 'unreadable'
                            ? 'Document Quality Alert — Degraded / Unreadable Scan'
                            : email.review_reason === 'missing_attachment'
                            ? 'Completeness Alert — Missing Reference Document'
                            : email.review_reason === 'missing_value'
                            ? 'Data Incompleteness Alert — Placeholder Values Detected'
                            : 'Shipment Held for Manual Inspection'}
                        </p>
                      </div>
                    </div>

                    {/* Gemini AI Trigger Button for Escalation Notice */}
                    <button
                      onClick={handleCallGemini}
                      disabled={aiLoading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-700 via-teal-700 to-forest-900 hover:from-emerald-800 hover:to-forest-950 rounded-lg shadow-sm border border-emerald-600 transition-all shrink-0 disabled:opacity-50"
                    >
                      <Sparkles className={`w-3.5 h-3.5 text-amber-300 ${aiLoading ? 'animate-spin' : ''}`} />
                      <span>{aiLoading ? 'Drafting Notice...' : 'Draft Notice with Gemini AI'}</span>
                    </button>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-amber-200 text-xs space-y-2.5 text-slate-800">
                    <p className="leading-relaxed">
                      <strong>Escalation Reason:</strong>{' '}
                      {email.review_reason === 'wrong_doc_type' ? (
                        <>
                          The attached file was identified as a <strong>Commercial Invoice / Packing List</strong> rather than a Draft Bill of Lading. To prevent false matching, automated cross-check was paused.
                        </>
                      ) : email.review_reason === 'unreadable' ? (
                        <>
                          The attached document scan resolution is degraded or unreadable. The engine intentionally rejected low-confidence OCR to avoid hallucinations.
                        </>
                      ) : email.review_reason === 'missing_attachment' ? (
                        <>
                          The email references shipping documents, but no corresponding file attachments were detected.
                        </>
                      ) : email.review_reason === 'missing_value' ? (
                        <>
                          Mandatory shipping fields contain unresolved placeholder text (e.g. <code>TBA</code>, <code>TBD</code>, or <code>N/A</code>).
                        </>
                      ) : (
                        'This shipment requires manual inspection by an operations officer.'
                      )}
                    </p>
                    <div className="pt-2 border-t border-amber-100 flex items-center gap-2 text-amber-900 font-medium">
                      <span className="font-semibold text-xs text-amber-950">Required Action:</span>
                      <span>
                        {email.review_reason === 'wrong_doc_type'
                          ? 'Request shipping line (Carrier) to re-issue the authentic Draft Bill of Lading.'
                          : email.review_reason === 'unreadable'
                          ? 'Request a high-resolution PDF scan from the sender.'
                          : email.review_reason === 'missing_attachment'
                          ? 'Notify sender that attachments were dropped in transit and request re-dispatch.'
                          : 'Hold cargo release until finalized customer values are provided.'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Gemini AI Escalation Notice Draft Box */}
                {renderAiBox()}
              </div>
            ) : (
              /* NON-COMPARISON / NO ATTACHMENT VIEW (Operational Inquiry / Spam) */
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-800">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Triage Context: Operational Correspondence
                      </h3>
                      <p className="text-sm font-semibold text-slate-900">
                        Operational Inquiry / Non-Comparison Email
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-2 text-slate-700">
                    <p>
                      <strong>Triage Summary:</strong> This email is categorized under{' '}
                      <span className="font-mono font-bold text-slate-900">{email.category}</span>.
                      This category represents standard operational correspondence (e.g. freight charge queries, SI template requests, or BL follow-up communications without attached shipping files).
                    </p>
                    <p className="text-slate-500">
                      No Shipping Instruction (SI) vs carrier Draft Bill of Lading (BL) cross-check is required. The system automatically triages this record as{' '}
                      <span className="font-semibold text-emerald-700">OK (Zero Cargo Defect Risk)</span>.
                    </p>
                  </div>
                </div>
              </div>
            )
          ) : (
            /* SIDE-BY-SIDE 7 CANONICAL FIELDS DIFF TABLE */
            <>
              {email.status === 'OK' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-950 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Exact Match (100% Verified):</strong> All 7 canonical fields between customer Shipping Instruction (SI) and carrier Draft Bill of Lading (BL) match with zero defects. Cargo cleared for release.
                  </span>
                </div>
              )}

              {/* Status Banner for Escalated Records */}
              {email.status === 'NEEDS_REVIEW' && (
                <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between gap-3 text-amber-950 text-xs shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <div>
                      <strong className="text-amber-900 font-bold">
                        {email.review_reason?.toLowerCase().includes('escalat')
                          ? 'Operational Status: Escalated to Carrier Operations'
                          : 'Operational Status: Human Review Required'}
                      </strong>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        {email.review_reason?.toLowerCase().includes('escalat')
                          ? 'Discrepancy notice has been dispatched. Automated cargo clearance is held until amended Draft BL is received from the carrier.'
                          : email.review_reason === 'wrong_doc_type'
                          ? 'Attached document is a commercial invoice/packing list rather than a Draft BL.'
                          : email.review_reason === 'missing_attachment'
                          ? 'Draft BL or Shipping Instruction attachment is missing.'
                          : email.review_reason === 'missing_value'
                          ? 'Mandatory fields contain empty or placeholder values (TBA, N/A).'
                          : 'Attachment scan resolution is degraded or unreadable.'}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                    {email.review_reason?.toLowerCase().includes('escalat') ? 'ON HOLD' : 'EXCEPTION'}
                  </span>
                </div>
              )}

              {/* Discrepancy Alert & Always-Available Gemini Copilot */}
              {((email.defect_fields && email.defect_fields.length > 0) || email.status === 'MISMATCH' || (email.status === 'NEEDS_REVIEW' && hasDocs)) && (
                <div className="p-3.5 bg-red-50/90 border border-red-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-red-950 text-xs shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                    <div>
                      <strong className="text-red-900">Discrepancy Details:</strong> Differences identified in{' '}
                      <span className="font-mono font-bold uppercase text-red-800">
                        {email.defect_fields?.length > 0 ? email.defect_fields.join(', ') : 'consignee, shipping parameters'}
                      </span>.
                    </div>
                  </div>

                  {/* Gemini AI Trigger Button (Available for MISMATCH and Escalated NEEDS_REVIEW records) */}
                  <button
                    onClick={handleCallGemini}
                    disabled={aiLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-700 via-teal-700 to-forest-900 hover:from-emerald-800 hover:to-forest-950 rounded-lg shadow-sm border border-emerald-600 transition-all shrink-0 self-start sm:self-auto disabled:opacity-50 cursor-pointer"
                  >
                    <Sparkles className={`w-3.5 h-3.5 text-amber-300 ${aiLoading ? 'animate-spin' : ''}`} />
                    <span>{aiLoading ? 'Analyzing Shipment...' : 'Ask Gemini AI Copilot'}</span>
                  </button>
                </div>
              )}

              {/* Gemini AI Analysis Box */}
              {renderAiBox()}

              <div className="border border-slate-200 rounded-lg overflow-hidden shadow-xs">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                      <th className="py-2.5 px-4 font-semibold w-1/4">Canonical Field</th>
                      <th className="py-2.5 px-4 font-semibold w-3/8 bg-emerald-50/50 text-emerald-900 border-r border-slate-200">
                        Shipping Instruction (SI - Source of Truth)
                      </th>
                      <th className="py-2.5 px-4 font-semibold w-3/8 bg-slate-50 text-slate-800">
                        Draft Bill of Lading (BL - Carrier Draft)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {fieldsList.map(({ key, label }) => {
                      const siVal = si[key];
                      const blVal = bl[key];
                      const isMismatch = email.defect_fields.includes(key as string) || (
                        siVal !== undefined && blVal !== undefined && siVal !== null && blVal !== null &&
                        String(siVal).trim().toLowerCase() !== String(blVal).trim().toLowerCase()
                      );

                      return (
                        <tr
                          key={key}
                          className={`transition-colors ${
                            isMismatch ? 'bg-red-50/70 text-red-950 font-medium' : 'hover:bg-slate-50/60'
                          }`}
                        >
                          <td className="py-3 px-4 font-medium text-slate-700 border-r border-slate-100 flex items-center gap-1.5">
                            {isMismatch ? (
                              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-emerald shrink-0" />
                            )}
                            <span>{label}</span>
                          </td>

                          <td className="py-3 px-4 font-mono border-r border-slate-200 text-slate-800">
                            {siVal !== undefined && siVal !== null && siVal !== '' ? (
                              String(siVal)
                            ) : (
                              <span className="text-slate-400 italic font-sans text-[11px]">Not extracted</span>
                            )}
                          </td>

                          <td className="py-3 px-4 font-mono">
                            <div className="flex items-center justify-between gap-2">
                              <span>
                                {blVal !== undefined && blVal !== null && blVal !== '' ? (
                                  String(blVal)
                                ) : (
                                  <span className="text-slate-400 italic font-sans text-[11px]">Not available</span>
                                )}
                              </span>
                              {isMismatch && (
                                <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-200 text-red-900">
                                  MISMATCH
                                </span>
                              )}
                              {!isMismatch && blVal && (
                                <Check className="w-3.5 h-3.5 text-emerald shrink-0" />
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            Averis Verification Engine • Gemini 3.6 Structured Canonical Parser
          </p>

          <div className="flex items-center gap-2">
            {/* If status is MISMATCH: Officer can Escalate to Carrier or Approve Override */}
            {email.status === 'MISMATCH' && (
              <>
                <button
                  type="button"
                  onClick={() => setConfirmAction('ESCALATE')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-300 rounded-md hover:bg-red-100 transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Escalate to Carrier</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmAction('APPROVE')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald hover:bg-emerald-700 rounded-md shadow-sm transition-colors cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Approve Override</span>
                </button>
              </>
            )}

            {/* If status is NEEDS_REVIEW: Item is already escalated to carrier/exception, only Lead can Approve Override */}
            {email.status === 'NEEDS_REVIEW' && (
              <>
                <span className="text-[11px] font-mono px-2 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300 font-medium hidden sm:inline-block">
                  Escalation Dispatched (On Hold)
                </span>

                <button
                  type="button"
                  onClick={() => setConfirmAction('APPROVE')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald hover:bg-emerald-700 rounded-md shadow-sm transition-colors cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Approve Override / Release</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* Custom Confirmation Modal Overlay */}
        {confirmAction && (
          <div 
            onClick={(e) => { if (e.target === e.currentTarget) setConfirmAction(null); }}
            className="absolute inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-5 space-y-4 animate-in zoom-in-95 duration-150 cursor-default"
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  confirmAction === 'ESCALATE'
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  {confirmAction === 'ESCALATE' ? (
                    <Send className="w-5 h-5" />
                  ) : (
                    <UserCheck className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {confirmAction === 'ESCALATE'
                      ? 'Confirm Carrier Escalation Notice'
                      : 'Confirm Manual Clearance Override'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {confirmAction === 'ESCALATE' ? (
                      <>
                        Are you sure you want to escalate shipment <strong className="text-slate-900 font-mono">{email.email_id}</strong> to the carrier operations team?
                      </>
                    ) : (
                      <>
                        Are you sure you want to manually approve and clear shipment <strong className="text-slate-900 font-mono">{email.email_id}</strong> for release?
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Action Context Box */}
              <div className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                confirmAction === 'ESCALATE'
                  ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                  : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              }`}>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-semibold text-slate-600">Target Shipment:</span>
                  <span className="font-mono font-bold text-slate-900">{email.email_id}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-semibold text-slate-600">Resulting Status:</span>
                  <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] ${
                    confirmAction === 'ESCALATE'
                      ? 'bg-rose-200 text-rose-900'
                      : 'bg-emerald-200 text-emerald-900'
                  }`}>
                    {confirmAction === 'ESCALATE' ? 'NEEDS_REVIEW' : 'OK (CLEAR)'}
                  </span>
                </div>
                <div className="pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600">
                  {confirmAction === 'ESCALATE'
                    ? 'Automated release will be paused until an amended Draft BL is received and verified.'
                    : 'Discrepancy flags will be bypassed under Lead Operations authority and logged in the audit trail.'}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setConfirmAction(null)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirmAction) {
                      onAction(email.email_id, confirmAction);
                      setConfirmAction(null);
                    }
                  }}
                  className={`px-3.5 py-1.5 text-xs font-semibold text-white rounded-md shadow-sm transition-colors cursor-pointer ${
                    confirmAction === 'ESCALATE'
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : 'bg-emerald hover:bg-emerald-700'
                  }`}
                >
                  {confirmAction === 'ESCALATE'
                    ? 'Yes, Confirm & Escalate'
                    : 'Yes, Confirm & Release'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
