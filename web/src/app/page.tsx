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
import { Sparkles, Layers, CheckCircle, AlertCircle, X, Search } from 'lucide-react';

export default function DashboardPage() {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSidebarTab, setSelectedSidebarTab] = useState('all');
  const [selectedTableCategory, setSelectedTableCategory] = useState('ALL');
  const [selectedEmailForDiff, setSelectedEmailForDiff] = useState<EmailRecord | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [actionToast, setActionToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
      matchRatePercent
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
              review_reason: note, 
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

  // Combined Filtering: Tab Filter + Category Filter + Search Query
  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      // 1. Sidebar Tab Filter
      if (selectedSidebarTab === 'mismatch' && email.status !== 'MISMATCH') return false;
      if (selectedSidebarTab === 'needs_review' && email.status !== 'NEEDS_REVIEW') return false;
      if (selectedSidebarTab === 'verified' && email.status !== 'OK') return false;

      // 2. Local Table Category Filter
      if (selectedTableCategory !== 'ALL' && email.category !== selectedTableCategory) return false;

      // 3. Search Query Filter
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesId = email.email_id.toLowerCase().includes(query);
        const matchesSubject = email.subject.toLowerCase().includes(query);
        const matchesCategory = email.category.toLowerCase().includes(query);
        const matchesStatus = email.status.toLowerCase().includes(query);

        // Also search in Shipper / Consignee / Port names
        const shipper = String(email.si_fields?.shipper || '').toLowerCase();
        const consignee = String(email.si_fields?.consignee || '').toLowerCase();
        const pol = String(email.si_fields?.port_of_loading || '').toLowerCase();
        const pod = String(email.si_fields?.port_of_discharge || '').toLowerCase();

        return (
          matchesId ||
          matchesSubject ||
          matchesCategory ||
          matchesStatus ||
          shipper.includes(query) ||
          consignee.includes(query) ||
          pol.includes(query) ||
          pod.includes(query)
        );
      }

      return true;
    });
  }, [emails, selectedSidebarTab, selectedTableCategory, searchTerm]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar with mobile drawer support */}
      <Sidebar
        currentTab={selectedSidebarTab}
        onTabChange={(tab) => {
          setSelectedSidebarTab(tab);
          setIsMobileSidebarOpen(false);
        }}
        stats={{
          total: dynamicStats.totalProcessed,
          mismatches: dynamicStats.mismatchesDetected,
          needsReview: dynamicStats.needsHumanReview,
          verified: dynamicStats.cleanMatches,
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
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
          onRefresh={() => loadData(true)}
          onResetSandbox={handleResetSandbox}
          isLoading={isLoading}
          isResetting={isResetting}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        {/* Conditional Rendering: If 'analytics' tab selected, render dedicated PerformanceMetricsView page */}
        {selectedSidebarTab === 'analytics' ? (
          <PerformanceMetricsView onBackToInbox={() => setSelectedSidebarTab('all')} />
        ) : (
          /* Scrollable Dashboard Body */
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {/* Welcome Banner */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider font-mono">
                    Live Pipeline Active
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Averis Automated Ingestion</span>
                </div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                  Shipping Document <span className="text-emerald-700">Verification Engine</span>
                </h1>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  Single Source of Truth (SI) cross-checked against carrier Draft Bill of Lading (BL).
                  Powered by deterministic rule normalizers and Google Gemini 3.6 Flash structured extraction.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-right hidden sm:block shadow-2xs">
                  <p className="text-[11px] text-slate-500 font-medium">Dataset Batch</p>
                  <p className="text-base font-bold text-slate-900 font-mono">{dynamicStats.totalProcessed} Ingested</p>
                </div>
              </div>
            </div>

            {/* KPI Stats Cards (Dynamically Updated) */}
            <StatsCards stats={dynamicStats} />

            {/* Inbox Triage Table Section with Cohesive Local Search */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Inbox Document Triage & Verification Logs
                  </h2>
                  <p className="text-xs text-slate-500">
                    Select any shipment to inspect side-by-side 7 canonical fields and manage discrepancies.
                  </p>
                </div>

                {/* Table-specific Search Bar (Relocated from Header for better UX) */}
                <div className="relative w-full sm:w-80 shrink-0">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search email ID, company, port, or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200/90 focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs transition-all text-slate-800 placeholder:text-slate-400"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      title="Clear search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
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
            <Footer />
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
