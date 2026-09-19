'use client';

import React from 'react';
import { Search, RefreshCw, RotateCcw, Filter, Bell, User, X } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  onResetSandbox?: () => void;
  isLoading: boolean;
  isResetting?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  onRefresh,
  onResetSandbox,
  isLoading,
  isResetting
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 font-sans shadow-2xs">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        {/* Hackathon Edition Tag (from Image 3) */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-medium shrink-0">
          <span className="font-semibold text-slate-800 text-xs">Averis x Monash Hackathon 2026</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px]">
            Cloud + AI Edition
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search email ID, company, port, or status..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-9 py-1.5 text-xs bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs transition-all text-slate-800 placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              title="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

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
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50 shadow-2xs cursor-pointer"
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
