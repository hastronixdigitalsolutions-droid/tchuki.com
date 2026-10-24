import React, { useState } from 'react';
import { Search, Filter, MessageSquare, Phone, Mail, Building, Trash2, CheckCircle2, Clock, Archive, X, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Inquiry } from '../../types';

export const AdminInquiries: React.FC = () => {
  const { inquiries, businesses, updateInquiryStatus, deleteInquiry } = useData();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [internalNotes, setInternalNotes] = useState('');

  const filtered = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesSearch =
      inq.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.organization && inq.organization.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleOpenDetail = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setInternalNotes(inq.internal_notes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, internalNotes);
    setSelectedInquiry({ ...selectedInquiry, internal_notes: internalNotes });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            Contact & Inquiry Management
          </h2>
          <p className="text-xs text-slate-400">
            Review incoming leads, product orders, software project requests, and partnerships submitted through public forms.
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-400">
          Total Inquiries: <span className="font-bold text-white tabular-nums">{inquiries.length}</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, organization, email..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              statusFilter === 'all' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('new')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              statusFilter === 'new' ? 'bg-emerald-950 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              statusFilter === 'in_progress' ? 'bg-amber-950 text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatusFilter('resolved')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              statusFilter === 'resolved' ? 'bg-blue-950 text-blue-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-3">
        {filtered.map((inq) => {
          const biz = businesses.find((b) => b.id === inq.business_id);

          return (
            <div
              key={inq.id}
              onClick={() => handleOpenDetail(inq)}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-white font-heading">
                    {inq.full_name}
                  </span>
                  {inq.organization && (
                    <span className="text-xs text-slate-400 font-sans">
                      ({inq.organization})
                    </span>
                  )}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 capitalize">
                    {inq.inquiry_type}
                  </span>
                  {biz && (
                    <span className="text-[10px] font-mono text-emerald-400">
                      → {biz.name}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 line-clamp-1 font-sans">
                  {inq.message}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span>{new Date(inq.created_at).toLocaleString()}</span>
                  <span>·</span>
                  <span>{inq.phone}</span>
                  <span>·</span>
                  <span>{inq.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-md font-semibold uppercase ${
                    inq.status === 'new'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                      : inq.status === 'in_progress'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                      : inq.status === 'resolved'
                      ? 'bg-blue-950 text-blue-400 border border-blue-800/60'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {inq.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs">
            No inquiries match current filter parameters.
          </div>
        )}
      </div>

      {/* Inquiry Detail & Internal Notes Drawer Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-left max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
              Inquiry Record #{selectedInquiry.id}
            </span>

            <h3 className="text-xl font-bold text-white font-heading">
              {selectedInquiry.full_name}
            </h3>
            {selectedInquiry.organization && (
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Organization: {selectedInquiry.organization}
              </p>
            )}

            {/* Contact details bar */}
            <div className="my-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-emerald-400 hover:underline">
                  {selectedInquiry.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Phone:</span>
                <a href={`tel:${selectedInquiry.phone}`} className="text-emerald-400 hover:underline">
                  {selectedInquiry.phone}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="capitalize text-white">{selectedInquiry.inquiry_type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Received Date:</span>
                <span>{new Date(selectedInquiry.created_at).toLocaleString()}</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                Inquiry Message / Request
              </div>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Change Selector */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                Update Status
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {(['new', 'in_progress', 'resolved', 'archived'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      updateInquiryStatus(selectedInquiry.id, st, internalNotes);
                      setSelectedInquiry({ ...selectedInquiry, status: st });
                    }}
                    className={`py-2 px-2.5 rounded-lg font-mono text-[11px] uppercase transition-colors cursor-pointer ${
                      selectedInquiry.status === st
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Private Internal Notes (PDF Spec: optionally record private internal notes) */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                Private Admin Internal Notes (Not Visible Publicly)
              </div>
              <textarea
                rows={3}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Log internal follow-up notes, quotation numbers, WhatsApp discussion notes..."
                className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none resize-none"
              />
              <button
                onClick={handleSaveNotes}
                className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Internal Notes</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  deleteInquiry(selectedInquiry.id);
                  setSelectedInquiry(null);
                }}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Inquiry</span>
              </button>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

