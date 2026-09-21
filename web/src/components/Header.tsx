'use client';

import React from 'react';
import { RefreshCw, RotateCcw, Menu } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  onResetSandbox?: () => void;
  isLoading: boolean;
  isResetting?: boolean;
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRefresh,
  onResetSandbox,
  isLoading,
  isResetting,
  onToggleMobileSidebar
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between shrink-0 font-sans shadow-2xs">
      {/* Left: Mobile Hamburger & Title */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium min-w-0">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-1.5 -ml-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
            title="Open Operations Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <span className="font-bold text-slate-800 text-xs sm:text-sm truncate">
          Averis x Monash 2026
        </span>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span className="text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] hidden sm:inline">
          Cloud + AI Edition
        </span>
      </div>

      {/* Right Controls: Actions & Team Identification */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {onResetSandbox && (
          <button
            onClick={onResetSandbox}
            disabled={isResetting || isLoading}
            title="Reset all records and statuses to official 100.0% benchmark baseline"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50/80 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors disabled:opacity-50 shadow-2xs cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-amber-700 shrink-0 ${isResetting ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset Sandbox</span>
            <span className="sm:hidden text-[11px]">Reset</span>
          </button>
        )}

        <button
          onClick={onRefresh}
          disabled={isLoading}
          title="Synchronize and fetch latest verification statuses from Supabase"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50 shadow-2xs cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-500 shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isLoading ? 'Syncing...' : 'Sync Supabase'}</span>
          <span className="sm:hidden text-[11px]">{isLoading ? 'Syncing' : 'Sync'}</span>
        </button>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-bold text-xs font-mono shadow-2xs shrink-0">
            R8
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-none">Rimba 0818</p>
            <p className="text-[10px] text-slate-500 leading-none mt-1">Hackathon Team</p>
          </div>
        </div>
      </div>
    </header>
  );
};
