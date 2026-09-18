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

export const DiffViewerModal: React.FC<DiffViewerModalProps> = ({
  email,
  onClose,
  onAction
}) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Automatically reset AI Copilot response whenever a different email is opened
  useEffect(() => {
    setAiResult(null);
    setAiLoading(false);
    setCopied(false);
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
          defect_fields: email.defect_fields,
          si_fields: email.si_fields,
          bl_fields: email.bl_fields,
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAiResult(data);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150 font-sans">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
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
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
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
            /* NON-COMPARISON / NO ATTACHMENT VIEW */
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

              {email.has_defect && email.defect_fields.length > 0 && (
                <div className="p-3.5 bg-red-50/90 border border-red-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-red-950 text-xs shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                    <div>
                      <strong className="text-red-900">Discrepancy Alert:</strong> The verification engine flagged differences in{' '}
                      <span className="font-mono font-bold uppercase text-red-800">{email.defect_fields.join(', ')}</span>.
                    </div>
                  </div>

                  {/* Gemini AI Trigger Button */}
                  <button
                    onClick={handleCallGemini}
                    disabled={aiLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-700 via-teal-700 to-forest-900 hover:from-emerald-800 hover:to-forest-950 rounded-lg shadow-sm border border-emerald-600 transition-all shrink-0 self-start sm:self-auto disabled:opacity-50"
                  >
                    <Sparkles className={`w-3.5 h-3.5 text-amber-300 ${aiLoading ? 'animate-spin' : ''}`} />
                    <span>{aiLoading ? 'Analyzing Shipment...' : 'Ask Gemini AI Copilot'}</span>
                  </button>
                </div>
              )}

              {/* Gemini AI Analysis Box */}
              {aiResult && (
                <div className="bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-slate-50 border border-emerald-200 rounded-xl p-4 text-xs space-y-3 shadow-sm animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald text-white flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-emerald-950">
                        {aiResult.ai_source || 'Google Gemini 3.6 Flash'} • Risk Analysis & Carrier Dispute Draft
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      aiResult.risk_severity === 'HIGH' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {aiResult.risk_severity} RISK
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold text-slate-800">Discrepancy Root Cause & Cargo Impact:</p>
                      <p className="text-slate-600 leading-relaxed mt-0.5">{aiResult.summary}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80">
                      <p className="font-semibold text-slate-800">AI Recommended Action:</p>
                      <p className="text-emerald-900 font-medium mt-0.5">
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
                            Official Carrier Discrepancy Notice Draft (Ready to Dispatch):
                          </p>
                          <button
                            onClick={handleCopyEmail}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-[11px] transition-colors"
                          >
                            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                            <span>{copied ? 'Copied!' : 'Copy Draft'}</span>
                          </button>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-slate-200 text-[11px] font-mono text-slate-800 whitespace-pre-line leading-relaxed max-h-40 overflow-y-auto">
                          {`Subject: ${aiResult.carrier_email_draft.subject}\n\n${aiResult.carrier_email_draft.body}`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {email.status === 'NEEDS_REVIEW' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3 text-amber-900 text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Human Escalation Triggered:</strong>{' '}
                    {email.review_reason === 'wrong_doc_type'
                      ? 'Attached document is a commercial invoice or packing list, not a Bill of Lading.'
                      : email.review_reason === 'missing_attachment'
                      ? 'Draft BL or Shipping Instruction attachment is missing or dropped.'
                      : email.review_reason === 'missing_value'
                      ? 'Mandatory fields contain empty or placeholder values (e.g., TBA, N/A, ___).'
                      : 'Attachment file scan is unreadable or corrupted.'}
                  </span>
                </div>
              )}

              <div className="border border-slate-200 rounded-lg overflow-hidden">
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
            {/* Action buttons only shown when there's an actual discrepancy or review needed */}
            {hasDocs && (email.status === 'MISMATCH' || email.status === 'NEEDS_REVIEW') && (
              <>
                <button
                  onClick={() => onAction(email.email_id, 'ESCALATE')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-300 rounded-md hover:bg-red-100 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Escalate to Carrier</span>
                </button>

                <button
                  onClick={() => onAction(email.email_id, 'APPROVE')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald hover:bg-emerald-700 rounded-md shadow-sm transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Approve Override</span>
                </button>
              </>
            )}

            {/* When clean or no docs, just show Close button */}
            {(!hasDocs || email.status === 'OK') && (
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md shadow-sm transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
