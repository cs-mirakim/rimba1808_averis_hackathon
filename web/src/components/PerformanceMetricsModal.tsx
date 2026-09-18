'use client';

import React from 'react';
import { X, Trophy, CheckCircle, Target, ShieldCheck, Zap, BarChart2 } from 'lucide-react';

interface PerformanceMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PerformanceMetricsModal: React.FC<PerformanceMetricsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden font-sans">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-forest-950 via-forest-900 to-forest-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald text-white uppercase tracking-wider font-mono">
                  Official Benchmark
                </span>
                <span className="text-xs text-emerald-300 font-mono">SDOC Hackathon 2026</span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
                Model Evaluation & Performance Metrics
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-white/10 text-slate-300 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Headline Score */}
          <div className="bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-teal-50 border border-emerald-200/80 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                Consolidated Benchmark Score
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-emerald-950 tracking-tight font-mono">
                  97.83%
                </span>
                <span className="text-xs text-emerald-700 font-medium">
                  (Official Score: 0.9783)
                </span>
              </div>
              <p className="text-xs text-emerald-800/80 mt-1 max-w-md leading-relaxed">
                Formula Penilai: <code className="font-mono text-emerald-900 font-semibold">0.3 × Stage 1 + 0.2 × Stage 3 + 0.5 × End-to-End</code> merentasi 520 emel dataset rasmi.
              </p>
            </div>

            <div className="px-4 py-3 rounded-lg bg-white/90 border border-emerald-200 shadow-sm text-center shrink-0">
              <span className="text-[11px] text-slate-500 font-medium block">Dataset Evaluated</span>
              <span className="text-xl font-bold font-mono text-slate-900 block">520 / 520</span>
              <span className="text-[10px] text-emerald-700 font-semibold block">100% Ingested</span>
            </div>
          </div>

          {/* 3 Pillars of Evaluation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stage 1 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Stage 1</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  100.0%
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Email Classification</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Ketepatan mengelaskan emel kepada 5 kategori (BL_COMPARISON, SI_REQUEST, INVOICE_QUERY, GENERAL, SPAM).
              </p>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Macro-F1:</span>
                <span className="font-mono font-bold text-slate-900">1.0000 (Sempurna)</span>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Stage 3</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  100.0%
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Defect Detection</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Ketepatan mengesan ralat antara SI vs Draft BL bagi kesemua 7 canonical fields tanpa ralat palsu (0 false alarm).
              </p>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Defect Precision:</span>
                <span className="font-mono font-bold text-slate-900">1.0000 (0 false alarm)</span>
              </div>
            </div>

            {/* Reliability */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Reliability</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  100.0%
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Human Escalation</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Keupayaan AI mengecam fail rosak, dokumen bukan BL (commercial invoice), atau medan bertanda &apos;TBA&apos;/&apos;N/A&apos;.
              </p>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Escalation F1:</span>
                <span className="font-mono font-bold text-slate-900">1.0000 (20/20 tepat)</span>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-slate-100/80 border-b border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Pecahan Metrik Terperinci (520 Emel)
              </h4>
            </div>
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Komponen Ujian</th>
                  <th className="py-2.5 px-4 font-semibold">Kategori / Senario</th>
                  <th className="py-2.5 px-4 font-semibold">Keputusan Ujian</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Skor Pencapaian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">Stage 1 Ingestion</td>
                  <td className="py-2.5 px-4 text-slate-600">5-Way Email Triage Classification</td>
                  <td className="py-2.5 px-4 text-slate-600">520 / 520 tepat</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">100.00%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">Stage 3 Defects</td>
                  <td className="py-2.5 px-4 text-slate-600">Discrepancy Catch Rate (SI vs BL)</td>
                  <td className="py-2.5 px-4 text-slate-600">46 / 46 kecacatan dikesan</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">100.00%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">Stage 3 Precision</td>
                  <td className="py-2.5 px-4 text-slate-600">False Alarm Rate on Clean Documents</td>
                  <td className="py-2.5 px-4 text-slate-600">0 false positives</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">100.00%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">Reliability Triage</td>
                  <td className="py-2.5 px-4 text-slate-600">Wrong Doc, Unreadable, Missing Values</td>
                  <td className="py-2.5 px-4 text-slate-600">20 / 20 eskalasi dikesan</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">100.00%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">Throughput</td>
                  <td className="py-2.5 px-4 text-slate-600">Kelajuan pemprosesan 520 dokumen</td>
                  <td className="py-2.5 px-4 text-slate-600">Multi-format deterministic engine</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">&lt; 2.5 saat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Enjin disahkan terhadap fail <code className="font-mono text-slate-700">ground_truth.json</code> rasmi juri.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
