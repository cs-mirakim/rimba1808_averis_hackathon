'use client';

import React from 'react';
import { 
  Inbox, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  BarChart3, 
  Ship, 
  ShieldCheck, 
  Database, 
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  stats: {
    total: number;
    mismatches: number;
    needsReview: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange, stats }) => {
  const navItems = [
    { id: 'all', label: 'All Ingestion', icon: Inbox, count: stats.total },
    { id: 'mismatch', label: 'Discrepancies', icon: AlertTriangle, count: stats.mismatches, badgeColor: 'bg-red-950 text-red-300 border border-red-800' },
    { id: 'needs_review', label: 'Needs Review', icon: HelpCircle, count: stats.needsReview, badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800' },
    { id: 'verified', label: 'Verified Clean', icon: CheckCircle2 },
    { id: 'analytics', label: 'Performance Metrics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-forest-950 text-slate-100 flex flex-col justify-between shrink-0 border-r border-emerald-900/40 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-emerald-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald flex items-center justify-center text-white shadow-sm">
              <Ship className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                AVERIS DOCS
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-800/80 text-emerald-200 font-mono font-medium">OPS</span>
              </h1>
              <p className="text-xs text-emerald-300/70">Shipping Verification Engine</p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-4">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-400/60 mb-2">
            Operations Triage
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-800/90 text-white font-semibold'
                      : 'text-slate-300 hover:bg-forest-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      item.badgeColor || (isActive ? 'bg-emerald-950 text-emerald-200' : 'bg-forest-900 text-slate-300')
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Engine Status Card */}
      <div className="p-4 border-t border-emerald-900/40 space-y-2.5">
        <div className="bg-forest-900/80 rounded-lg p-3 border border-emerald-900/50 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-bright animate-pulse" />
              <span className="text-[11px] font-medium text-emerald-200">Supabase Connected</span>
            </div>
            <Database className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-emerald-900/40">
            <span>Model: Gemini 3.6</span>
            <span className="text-emerald-300 font-mono font-medium">99.4% F1</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Averis x Monash 2026</span>
        </div>
      </div>
    </aside>
  );
};
