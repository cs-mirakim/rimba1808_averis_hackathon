'use client';

import React from 'react';
import { RefreshCw, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  onResetSandbox?: () => void;
  isLoading: boolean;
  isResetting?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onRefresh,
  onResetSandbox,
  isLoading,
  isResetting
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 font-sans shadow-2xs">
      {/* Hackathon Title & System Metadata Tag */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span className="font-bold text-slate-800 text-xs sm:text-sm">
          Averis x Monash Hackathon 2026
        </span>
        <span className="text-slate-300">•</span>
        <span className="text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px]">
          Cloud + AI Edition
        </span>
      </div>

      {/* Right Controls: Actions & Team Identification */}
      <div className="flex items-center gap-2.5">
        {onResetSandbox && (
          <button
            onClick={onResetSandbox}
            disabled={isResetting || isLoading}
            title="Reset all records and statuses to official 100.0% benchmark baseline"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50/80 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors disabled:opacity-50 shadow-2xs cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-amber-700 ${isResetting ? 'animate-spin' : ''}`} />
            <span>Reset Sandbox</span>
          </button>
        )}

        <button
          onClick={onRefresh}
          disabled={isLoading}
          title="Synchronize and fetch latest verification statuses from Supabase"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50 shadow-2xs cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Syncing...' : 'Sync Supabase'}</span>
        </button>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-bold text-xs font-mono shadow-2xs">
            R8
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-none">Rimba 0818</p>
            <p className="text-[10px] text-slate-500 leading-none mt-1">SDOC Hackathon Team</p>
          </div>
        </div>
      </div>
    </header>
  );
};
