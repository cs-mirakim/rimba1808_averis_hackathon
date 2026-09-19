'use client';

import React from 'react';
import { 
  Inbox, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  BarChart3, 
  Ship, 
  Globe, 
  Github, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  stats: {
    total: number;
    mismatches: number;
    needsReview: number;
    verified: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange, stats }) => {
  const navItems = [
    { 
      id: 'all', 
      label: 'All Ingestion', 
      icon: Inbox, 
      count: stats.total, 
      activeBadge: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      inactiveBadge: 'bg-slate-100 text-slate-700 border border-slate-200' 
    },
    { 
      id: 'mismatch', 
      label: 'Discrepancies', 
      icon: AlertTriangle, 
      count: stats.mismatches, 
      activeBadge: 'bg-rose-100 text-rose-800 border border-rose-200',
      inactiveBadge: 'bg-rose-50 text-rose-700 border border-rose-200' 
    },
    { 
      id: 'needs_review', 
      label: 'Needs Review', 
      icon: HelpCircle, 
      count: stats.needsReview, 
      activeBadge: 'bg-amber-100 text-amber-800 border border-amber-200',
      inactiveBadge: 'bg-amber-50 text-amber-700 border border-amber-200' 
    },
    { 
      id: 'verified', 
      label: 'Verified Clean', 
      icon: CheckCircle2, 
      count: stats.verified, 
      activeBadge: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      inactiveBadge: 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
    },
    { 
      id: 'analytics', 
      label: 'Performance Metrics', 
      icon: BarChart3 
    },
  ];

  return (
    <aside className="w-64 bg-white text-slate-800 flex flex-col justify-between shrink-0 border-r border-slate-200 min-h-screen font-sans">
      <div>
        {/* Brand Header - exactly h-16 (64px) aligned seamlessly with top navbar */}
        <div className="h-16 px-5 border-b border-slate-200 flex items-center shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center text-white shadow-2xs shrink-0">
              <Ship className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-sm tracking-tight text-slate-900 truncate">
                Averis SDOC
              </h1>
              <p className="text-[11px] text-emerald-700 font-semibold truncate leading-tight">
                Shipping Verification Engine
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3.5 py-4">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-950 border border-emerald-200/90 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold transition-colors ${
                      isActive ? item.activeBadge : item.inactiveBadge
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

      {/* Sidebar Footer Section (Identical to Image 2 Concept) */}
      <div className="p-4 border-t border-slate-200 space-y-3">
        {/* Language Toggle & GitHub Link (Image 2) */}
        <div className="flex items-center justify-between text-xs text-slate-600 px-0.5">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-medium">EN (English)</span>
          </div>

          <a
            href="https://github.com/cs-mirakim/rimba1808_averis_hackathon"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-slate-700" />
            <span className="text-[11px] font-medium">GitHub</span>
          </a>
        </div>

        {/* User Profile Card (Image 2) */}
        <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/90 hover:bg-slate-100 transition-colors shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-2xs">
              N
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate leading-tight">Amir Hakim</p>
              <p className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">amirhakiml2ews@gmail.com</p>
            </div>
          </div>
          <div 
            title="Lead Officer • Rimba 0818"
            className="text-rose-500 p-1 rounded-md shrink-0"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-500" />
          </div>
        </div>
      </div>
    </aside>
  );
};
