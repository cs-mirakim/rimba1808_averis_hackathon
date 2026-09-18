'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { StatsCards } from '../components/StatsCards';
import { InboxTable } from '../components/InboxTable';
import { DiffViewerModal } from '../components/DiffViewerModal';
import { PerformanceMetricsModal } from '../components/PerformanceMetricsModal';
import { getDashboardData, updateEmailStatus } from '../lib/supabase';
import { EmailRecord, DashboardStats } from '../lib/types';
import { Sparkles, Layers, CheckCircle, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProcessed: 0,
    cleanMatches: 0,
    mismatchesDetected: 0,
    needsHumanReview: 0,
    matchRatePercent: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSidebarTab, setSelectedSidebarTab] = useState('all');
  const [selectedTableCategory, setSelectedTableCategory] = useState('ALL');
  const [selectedEmailForDiff, setSelectedEmailForDiff] = useState<EmailRecord | null>(null);
  const [isMetricsOpen, setIsMetricsOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [actionToast, setActionToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getDashboardData();
      setEmails(data.emails);
      setStats(data.stats);
    } catch (e) {
      console.error('Failed to load dashboard data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSandbox = async () => {
    setIsResetting(true);
    try {
      const res = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' })
      });
      if (res.ok) {
        await loadData();
        setActionToast({
          message: '↺ Sandbox Direset: Kesemua data dan status dokumen telah dikembalikan ke tetapan asal 97.83% benchmark!',
          type: 'success'
        });
        setTimeout(() => setActionToast(null), 5000);
      }
    } catch (err) {
      console.error('Reset failed:', err);
    } finally {
      setIsResetting(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Human-in-the-loop action
  const handleAction = async (emailId: string, actionType: 'APPROVE' | 'ESCALATE') => {
    const newStatus = actionType === 'APPROVE' ? 'OK' : 'NEEDS_REVIEW';
    const note = actionType === 'APPROVE' ? 'Manual override approved by Lead' : 'Escalated to carrier by Lead';

    await updateEmailStatus(emailId, newStatus, note);

    setEmails((prev) =>
      prev.map((e) =>
        e.email_id === emailId
          ? { ...e, status: newStatus, review_reason: note as any, has_defect: actionType !== 'APPROVE' }
          : e
      )
    );

    setSelectedEmailForDiff(null);

    // Trigger feedback toast
    if (actionType === 'APPROVE') {
      setActionToast({
        message: `✅ Diluluskan! ${emailId} telah ditukar ke status 'OK' (Disahkan oleh Lead Officer untuk pelepasan kargo).`,
        type: 'success'
      });
    } else {
      setActionToast({
        message: `⚠️ Dieskalasi! ${emailId} ditandakan sebagai 'NEEDS_REVIEW' (Notis pembetulan dihantar ke Carrier).`,
        type: 'warning'
      });
    }

    setTimeout(() => {
      setActionToast(null);
    }, 4500);
  };

  // Filter emails based on search and sidebar tab
  const filteredEmails = emails.filter((item) => {
    // Search query filter
    const matchesSearch =
      item.email_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.si_fields?.shipper && item.si_fields.shipper.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.si_fields?.port_of_discharge && item.si_fields.port_of_discharge.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    // Sidebar tab filter
    if (selectedSidebarTab === 'mismatch') return item.status === 'MISMATCH';
    if (selectedSidebarTab === 'needs_review') return item.status === 'NEEDS_REVIEW';
    if (selectedSidebarTab === 'verified') return item.status === 'OK';

    return true;
  });

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        currentTab={selectedSidebarTab}
        onTabChange={(tab) => {
          if (tab === 'analytics') {
            setIsMetricsOpen(true);
          } else {
            setSelectedSidebarTab(tab);
          }
        }}
        stats={{
          total: emails.length,
          mismatches: stats.mismatchesDetected,
          needsReview: stats.needsHumanReview,
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Floating Action Toast Notification */}
        {actionToast && (
          <div className="absolute top-4 right-6 z-40 animate-in slide-in-from-top-2 fade-in duration-200 shadow-xl rounded-lg p-3.5 flex items-center gap-3 border bg-white max-w-md">
            {actionToast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            )}
            <p className="text-xs font-medium text-slate-800 leading-snug">
              {actionToast.message}
            </p>
          </div>
        )}

        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRefresh={loadData}
          onResetSandbox={handleResetSandbox}
          isLoading={isLoading}
          isResetting={isResetting}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-forest-800 rounded-xl p-5 text-white border border-emerald-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald text-white uppercase tracking-wider font-mono">
                  Live Operations
                </span>
                <span className="text-xs text-emerald-300">Averis Automated Ingestion Active</span>
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                Shipping Document Verification Engine
              </h1>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Single Source of Truth (SI) cross-checked against carrier Draft Bill of Lading (BL).
                Powered by deterministic rule normalizers and Google Gemini 3.6 Flash structured extraction.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-300">Active Pipeline</p>
                <p className="text-sm font-bold text-white font-mono">520 Ingested</p>
              </div>
            </div>
          </div>

          {/* KPI Stats Cards */}
          <StatsCards stats={stats} />

          {/* Inbox Triage Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Inbox Document Triage & Verification Logs
                </h2>
                <p className="text-xs text-slate-500">
                  Select any shipment to inspect side-by-side 7 canonical fields and manage discrepancies.
                </p>
              </div>
            </div>

            <InboxTable
              emails={filteredEmails}
              selectedCategory={selectedTableCategory}
              onCategorySelect={setSelectedTableCategory}
              onSelectEmail={(email) => setSelectedEmailForDiff(email)}
            />
          </div>
        </main>
      </div>

      {/* Side-by-Side Diff Modal */}
      <DiffViewerModal
        email={selectedEmailForDiff}
        onClose={() => setSelectedEmailForDiff(null)}
        onAction={handleAction}
      />

      {/* Performance Metrics Modal */}
      <PerformanceMetricsModal
        isOpen={isMetricsOpen}
        onClose={() => setIsMetricsOpen(false)}
      />
    </div>
  );
}
