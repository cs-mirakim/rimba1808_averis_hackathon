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
      accent: 'border-l-4 border-l-slate-400',
      badge: 'Batch Live',
      badgeStyle: 'bg-slate-100 text-slate-700'
    },
    {
      title: 'Clean Match Rate',
      value: `${stats.matchRatePercent}%`,
      subtitle: `${stats.cleanMatches} BLs matched SI 100%`,
      icon: CheckCircle,
      accent: 'border-l-4 border-l-emerald',
      badge: 'Zero Defect',
      badgeStyle: 'bg-emerald-50 text-emerald-800 border border-emerald-200'
    },
    {
      title: 'Discrepancies Caught',
      value: stats.mismatchesDetected,
      subtitle: 'Defects caught before finalization',
      icon: AlertOctagon,
      accent: 'border-l-4 border-l-red-500',
      badge: 'Action Required',
      badgeStyle: 'bg-red-50 text-red-800 border border-red-200'
    },
    {
      title: 'Needs Human Review',
      value: stats.needsHumanReview,
      subtitle: 'Edge cases & blurry OCR escalations',
      icon: HelpCircle,
      accent: 'border-l-4 border-l-amber-500',
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
            className={`bg-white rounded-lg p-4 border border-slate-200 shadow-sm ${card.accent} flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {card.title}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${card.badgeStyle}`}>
                {card.badge}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
                  {card.value}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {card.subtitle}
                </p>
              </div>
              <div className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                <Icon className="w-4 h-4" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
