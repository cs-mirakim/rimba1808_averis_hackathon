'use client';

import React from 'react';
import { Ship } from 'lucide-react';

interface FooterProps {
  onOpenMetrics?: () => void;
  totalRecords?: number;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="mt-8 pt-4 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-sans">
      {/* Left: Project Title & Hackathon Info (Using exact Ship brand icon) */}
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-md bg-emerald flex items-center justify-center text-white shrink-0 shadow-2xs">
          <Ship className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-bold text-slate-800">
          Averis SDOC • Shipping Verification Engine
        </span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-500">
          Averis x Monash Hackathon 2026
        </span>
      </div>

      {/* Right: Team Members Attribution */}
      <div className="text-xs text-slate-600 font-medium">
        <span>4-Member Team: </span>
        <strong className="text-slate-800 font-semibold">Amir Hakim</strong>
        <span className="text-slate-400"> • </span>
        <strong className="text-slate-800 font-semibold">Moi</strong>
        <span className="text-slate-400"> • </span>
        <strong className="text-slate-800 font-semibold">Eqhlas</strong>
        <span className="text-slate-400"> • </span>
        <strong className="text-slate-800 font-semibold">Paan</strong>
      </div>
    </footer>
  );
};
