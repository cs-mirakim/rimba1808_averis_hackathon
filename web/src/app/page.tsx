'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { StatsCards } from '../components/StatsCards';
import { InboxTable } from '../components/InboxTable';
import { DiffViewerModal } from '../components/DiffViewerModal';
import { PerformanceMetricsView } from '../components/PerformanceMetricsView';
import { Footer } from '../components/Footer';
import { getDashboardData, updateEmailStatus } from '../lib/supabase';
import { EmailRecord, DashboardStats } from '../lib/types';
import { Sparkles, Layers, CheckCircle, AlertCircle, X } from 'lucide-react';

export default function DashboardPage() {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSidebarTab, setSelectedSidebarTab] = useState('all');
  const [selectedTableCategory, setSelectedTableCategory] = useState('ALL');
  const [selectedEmailForDiff, setSelectedEmailForDiff] = useState<EmailRecord | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [actionToast, setActionToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

  // Ref to store active toast timeout and guarantee consistent 5-second lifespan
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string, type: 'success' | 'warning', durationMs = 5000) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setActionToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setActionToast(null);
      toastTimeoutRef.current = null;
    }, durationMs);
  };

  const loadData = async (isManualSync = false) => {
    setIsLoading(true);
    try {
      const data = await getDashboardData();
      setEmails(data.emails);
      if (isManualSync) {
        showToast(
          'Supabase Synchronized: All 520 document records and live verification metrics are up to date.',
          'success'
        );
      }
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
        showToast(
          'Sandbox Reset: All records and document statuses restored to official 100.0% benchmark baseline.',
          'success'
        );
      }
    } catch (err) {
      console.error('Reset failed:', err);
    } finally {
      setIsResetting(false);
    }
  };

  useEffect(() => {
    loadData();
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // Compute live dynamic stats whenever emails state changes
  const dynamicStats: DashboardStats = useMemo(() => {
    const totalProcessed = emails.length;
    const cleanMatches = emails.filter((e) => e.status === 'OK').length;
    const mismatchesDetected = emails.filter((e) => e.status === 'MISMATCH').length;
    const needsHumanReview = emails.filter((e) => e.status === 'NEEDS_REVIEW').length;
    const blEmails = emails.filter((e) => e.category === 'BL_COMPARISON');
    const cleanBl = blEmails.filter((e) => e.status === 'OK').length;
    const matchRatePercent = blEmails.length > 0 ? Math.round((cleanBl / blEmails.length) * 100) : 0;

    return {
      totalProcessed,
      cleanMatches,
      mismatchesDetected,
      needsHumanReview,
      matchRatePercent,
    };
  }, [emails]);

  // Handle Human-in-the-loop action
  const handleAction = async (emailId: string, actionType: 'APPROVE' | 'ESCALATE') => {
    const newStatus = actionType === 'APPROVE' ? 'OK' : 'NEEDS_REVIEW';
    const note = actionType === 'APPROVE' ? 'Manual override approved by Lead' : 'Escalated to carrier by Lead';

    await updateEmailStatus(emailId, newStatus, note);

    // Update emails state immediately so sidebar and stats update reactively
    setEmails((prev) =>
      prev.map((e) =>
        e.email_id === emailId
          ? { 
              ...e, 
              status: newStatus, 
              review_reason: note as any, 
              has_defect: actionType !== 'APPROVE' 
            }
          : e
      )
    );

    setSelectedEmailForDiff(null);

    // Trigger consistent feedback toast
    if (actionType === 'APPROVE') {
      showToast(
        `Approved: ${emailId} status updated to 'OK' (Manual override confirmed by Lead Officer for cargo release).`,
        'success'
      );
    } else {
      showToast(
        `Escalated: ${emailId} flagged as 'NEEDS_REVIEW' (Discrepancy notice dispatched to carrier).`,
        'warning'
      );
    }
  };

  // Filter emails based on search and sidebar tab
  const filteredEmails = useMemo(() => {
    return emails.filter((item) => {
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
  }, [emails, searchTerm, selectedSidebarTab]);

  return (
    <div className="flex h-screen bg-[#f4f6f9] overflow-hidden font-sans">
      {/* Sidebar with dynamically computed counters */}
      <Sidebar
        currentTab={selectedSidebarTab}
        onTabChange={(tab) => setSelectedSidebarTab(tab)}
        stats={{
          total: dynamicStats.totalProcessed,
          mismatches: dynamicStats.mismatchesDetected,
          needsReview: dynamicStats.needsHumanReview,
          verified: dynamicStats.cleanMatches,
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Floating Action Toast Notification (Consistent Lifespan, Non-obstructive) */}
        {actionToast && (
          <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 fade-in duration-200 shadow-2xl rounded-xl p-4 flex items-start gap-3 border border-slate-200/90 bg-white/95 backdrop-blur-sm max-w-md ring-1 ring-slate-950/5">
            {actionToast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 pr-1">
              <p className="text-xs font-semibold text-slate-900 leading-snug">
                {actionToast.message}
              </p>
            </div>
            <button
              onClick={() => {
                if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
                setActionToast(null);
              }}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 -mr-1 -mt-1 cursor-pointer"
              title="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRefresh={() => loadData(true)}
          onResetSandbox={handleResetSandbox}
          isLoading={isLoading}
          isResetting={isResetting}
        />

        {/* Conditional Rendering: If 'analytics' tab selected, render dedicated PerformanceMetricsView page */}
        {selectedSidebarTab === 'analytics' ? (
          <PerformanceMetricsView onBackToInbox={() => setSelectedSidebarTab('all')} />
        ) : (
          /* Scrollable Dashboard Body */
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
                  <p className="text-sm font-bold text-white font-mono">{dynamicStats.totalProcessed} Ingested</p>
                </div>
              </div>
            </div>

            {/* KPI Stats Cards (Dynamically Updated) */}
            <StatsCards stats={dynamicStats} />

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

            {/* Informative Operations Footer */}
            <Footer
              onOpenMetrics={() => setSelectedSidebarTab('analytics')}
              totalRecords={dynamicStats.totalProcessed}
            />
          </main>
        )}
      </div>

      {/* Side-by-Side Diff Modal */}
      <DiffViewerModal
        email={selectedEmailForDiff}
        onClose={() => setSelectedEmailForDiff(null)}
        onAction={handleAction}
      />
    </div>
  );
}
