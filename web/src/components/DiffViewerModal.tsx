'use client';

import React from 'react';
import { EmailRecord } from '../lib/types';
import { X, AlertCircle, CheckCircle2, ShieldAlert, UserCheck, Send, Mail, Check, FileQuestion } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden font-sans">
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
                      Emel Pertanyaan / Bukan Perbandingan Dokumen
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-2 text-slate-700">
                  <p>
                    <strong>Maklumat Ringkas:</strong> Emel ini dikelaskan sebagai{' '}
                    <span className="font-mono font-bold text-slate-900">{email.category}</span>.
                    Emel kategori ini adalah pertanyaan biasa (contohnya pertanyaan caj invois, permintaan borang SI, atau pertanyaan draf BL tanpa sebarang fail dokumen dilampirkan).
                  </p>
                  <p className="text-slate-500">
                    Oleh itu, tiada perbandingan 7 medan Shipping Instruction (SI) vs Bill of Lading (BL) diperlukan. Sistem menandakan status emel ini sebagai{' '}
                    <span className="font-semibold text-emerald-700">OK (Sifar Risiko Kargo)</span>.
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
                    <strong>Padanan Sempurna (100% Match):</strong> Kesemua 7 canonical fields antara Shipping Instruction (SI) dan Draft Bill of Lading (BL) adalah tepat dan sepadan. Sedia untuk pelepasan kargo.
                  </span>
                </div>
              )}

              {email.has_defect && email.defect_fields.length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-900 text-xs">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                  <span>
                    <strong>Discrepancy Alert:</strong> Enjin pengesahan mengesan percanggahan pada{' '}
                    <span className="font-mono font-bold uppercase">{email.defect_fields.join(', ')}</span>.
                    Sila semak sebelum mengesahkan draf ini kepada syarikat perkapalan.
                  </span>
                </div>
              )}

              {email.status === 'NEEDS_REVIEW' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3 text-amber-900 text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Human Escalation Triggered:</strong>{' '}
                    {email.review_reason === 'wrong_doc_type'
                      ? 'Dokumen yang dilampirkan adalah invois / packing list, bukan Bill of Lading.'
                      : email.review_reason === 'missing_attachment'
                      ? 'Lampiran draf BL atau SI tercicir / tiada dalam emel.'
                      : email.review_reason === 'missing_value'
                      ? 'Terdapat nilai kosong atau placeholder seperti TBA / N/A pada medan wajib.'
                      : 'Fail imbasan lampiran rosak atau tidak dapat dibaca oleh OCR.'}
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
                Tutup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
