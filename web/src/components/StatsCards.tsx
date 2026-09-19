'use client';

import React from 'react';
import { DashboardStats } from '../lib/types';
import { Mail, CheckCircle, AlertOctagon, HelpCircle } from 'lucide-react';

interface StatsCardsProps {
  stats: DashboardStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Ingestion Batch',
      value: stats.totalProcessed,
      subtitle: 'Emails triaged from inbox',
      icon: Mail,
      iconBg: 'bg-slate-100 text-slate-700 border-slate-200',
      badge: 'Batch Live',
      badgeStyle: 'bg-slate-100 text-slate-700 border border-slate-200'
    },
    {
      title: 'Clean Match Rate',
      value: `${stats.matchRatePercent}%`,
      subtitle: `${stats.cleanMatches} BLs matched SI 100%`,
      icon: CheckCircle,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'Zero Defect',
      badgeStyle: 'bg-emerald-50 text-emerald-800 border border-emerald-200'
    },
    {
      title: 'Discrepancies Caught',
      value: stats.mismatchesDetected,
      subtitle: 'Defects caught before finalization',
      icon: AlertOctagon,
      iconBg: 'bg-rose-50 text-rose-700 border-rose-200',
      badge: 'Action Required',
      badgeStyle: 'bg-rose-50 text-rose-800 border border-rose-200'
    },
    {
      title: 'Needs Human Review',
      value: stats.needsHumanReview,
      subtitle: 'Edge cases & blurry OCR escalations',
      icon: HelpCircle,
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
      badge: 'Escalated',
      badgeStyle: 'bg-amber-50 text-amber-800 border border-amber-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeStyle}`}>
                  {card.badge}
                </span>
              </div>

              <p className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono mt-1">
                {card.value}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium leading-tight">
                {card.subtitle}
              </p>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ml-2 ${card.iconBg} shadow-2xs group-hover:scale-105 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
