'use client';

import React from 'react';
import { Search, RefreshCw, RotateCcw, Filter, Bell, User } from 'lucide-react';

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
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search email ID, company, port, or status..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald focus:border-emerald transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {onResetSandbox && (
          <button
            onClick={onResetSandbox}
            disabled={isResetting || isLoading}
            title="Reset all records and statuses to default 97.83% benchmark baseline"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-300 rounded-md hover:bg-amber-100 transition-colors disabled:opacity-50 shadow-sm"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-amber-700 ${isResetting ? 'animate-spin' : ''}`} />
            <span>Reset Sandbox</span>
          </button>
        )}

        <button
          onClick={onRefresh}
          disabled={isLoading}
          title="Synchronize and fetch latest verification statuses from Supabase"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Syncing...' : 'Sync Supabase'}</span>
        </button>

        <div className="h-4 w-px bg-slate-200" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-bold text-xs font-mono">
            R8
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-none">Rimba 0818</p>
            <p className="text-[10px] text-slate-500 leading-none mt-1">SDOC Hackathon Team</p>
          </div>
        </div>
      </div>
    </header>
  );
};
