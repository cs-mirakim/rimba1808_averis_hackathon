'use client';

import React, { useState, useEffect } from 'react';
import { EmailRecord, EmailCategory } from '../lib/types';
import { FileText, Eye, Check, AlertTriangle, HelpCircle, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface InboxTableProps {
  emails: EmailRecord[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onSelectEmail: (email: EmailRecord) => void;
}

export const InboxTable: React.FC<InboxTableProps> = ({
  emails,
  selectedCategory,
  onCategorySelect,
  onSelectEmail
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, emails.length]);

  const categories = [
    { id: 'ALL', label: 'All Items' },
    { id: 'BL_COMPARISON', label: 'BL Comparison' },
    { id: 'SI_REQUEST', label: 'SI Requests' },
    { id: 'INVOICE_QUERY', label: 'Invoices' },
    { id: 'SPAM', label: 'Spam' },
  ];

  const filteredEmails = selectedCategory === 'ALL'
    ? emails
    : emails.filter((e) => e.category === selectedCategory);

  const totalPages = Math.ceil(filteredEmails.length / pageSize) || 1;
  const paginatedEmails = filteredEmails.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Table Filter Tabs */}
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          {categories.map((cat) => {
            const count = cat.id === 'ALL' ? emails.length : emails.filter(e => e.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-white text-slate-900 border border-slate-300 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-slate-100 text-slate-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-[11px] text-slate-500 hidden sm:inline">
          Showing {filteredEmails.length} shipments
        </span>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 w-28">Email ID</th>
              <th className="py-3 px-4">Subject & Context</th>
              <th className="py-3 px-4 w-36">Category</th>
              <th className="py-3 px-4 w-32">Verdict</th>
              <th className="py-3 px-4 w-48">Discrepancy Details</th>
              <th className="py-3 px-4 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEmails.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400">
                  No records match the selected filter.
                </td>
              </tr>
            ) : (
              paginatedEmails.map((email) => {
                return (
                  <tr
                    key={email.email_id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onSelectEmail(email)}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">
                      {email.email_id}
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-medium text-slate-900 line-clamp-1 group-hover:text-emerald transition-colors">
                        {email.subject}
                      </p>
                      {email.si_fields?.shipper && (
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          Shipper: {email.si_fields.shipper}
                        </p>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {email.category}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {email.status === 'OK' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                          <Check className="w-3 h-3 text-emerald" />
                          OK
                        </span>
                      )}
                      {email.status === 'MISMATCH' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-red-50 text-red-800 border border-red-300">
                          <AlertTriangle className="w-3 h-3 text-red-600" />
                          MISMATCH
                        </span>
                      )}
                      {email.status === 'NEEDS_REVIEW' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                          <HelpCircle className="w-3 h-3 text-amber-600" />
                          REVIEW
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {email.defect_fields.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {email.defect_fields.map((f) => (
                            <span
                              key={f}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-100 text-red-800 border border-red-200"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      ) : email.review_reason ? (
                        <span className="text-[11px] font-mono text-amber-800 italic">
                          {email.review_reason}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          Zero defects
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEmail(email);
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                          email.category === 'BL_COMPARISON' && email.si_fields
                            ? 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-300'
                            : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-300'
                        }`}
                      >
                        <span>{email.category === 'BL_COMPARISON' && email.si_fields ? 'Diff' : 'View'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing <span className="font-semibold text-slate-900">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-slate-900">
              {Math.min(currentPage * pageSize, filteredEmails.length)}
            </span>{' '}
            of <span className="font-semibold text-slate-900">{filteredEmails.length}</span> shipments
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="px-2 font-mono text-xs font-semibold text-slate-700">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
