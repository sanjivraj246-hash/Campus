'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import { PlacementApplication } from '@/types';
import {
  Briefcase, Plus, Trophy, Clock, CheckCircle2,
  XCircle, Calendar, MapPin, Sparkles, Building2,
  ArrowRight, DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PlacementsPage() {
  const { placements, addPlacementApplication, updatePlacementStatus, student } = useStudent();

  const [showAddModal, setShowAddModal] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('Associate Software Engineer');
  const [ctcLpa, setCtcLpa] = useState<number>(24.0);
  const [location, setLocation] = useState('Bangalore, India');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<PlacementApplication['status']>('APPLIED');

  const columns: { status: PlacementApplication['status']; label: string; color: string }[] = [
    { status: 'APPLIED', label: 'Applied', color: 'border-slate-700 bg-slate-900/40 text-slate-300' },
    { status: 'ONLINE_ASSESSMENT', label: 'Online Assessment', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' },
    { status: 'TECHNICAL_INTERVIEW', label: 'Technical Interview', color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300' },
    { status: 'HR_INTERVIEW', label: 'HR / Leadership', color: 'border-purple-500/40 bg-purple-950/20 text-purple-300' },
    { status: 'SELECTED', label: 'Selected / Offer 🎉', color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300' },
    { status: 'REJECTED', label: 'Archived', color: 'border-rose-500/30 bg-rose-950/20 text-rose-400' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    addPlacementApplication({
      companyName,
      roleTitle,
      ctcLpa,
      location,
      appliedDate: new Date().toISOString().split('T')[0],
      status,
      notes
    });

    if (status === 'SELECTED') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }

    setCompanyName('');
    setShowAddModal(false);
  };

  const selectedCount = placements.filter(p => p.status === 'SELECTED').length;
  const maxOffer = Math.max(...placements.filter(p => p.status === 'SELECTED').map(p => p.ctcLpa), 0);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-cyan-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Placement &amp; CTC Tracker</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage your MNC placement pipeline, interview rounds, and job offers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Application</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400">Active Applications</span>
              <div className="text-3xl font-extrabold text-white mt-1">
                {placements.filter(p => p.status !== 'REJECTED' && p.status !== 'SELECTED').length}
              </div>
              <span className="text-[11px] text-indigo-400 font-medium">In interview pipeline</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400">Offers Released</span>
              <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                {selectedCount}
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">🎉 Highest CTC: {maxOffer} LPA</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400">Student Readiness</span>
              <div className="text-3xl font-extrabold text-purple-400 mt-1">
                {student.careerReadinessScore}/100
              </div>
              <span className="text-[11px] text-purple-300 font-medium">Target: {student.targetCareer}</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Kanban Board View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const apps = placements.filter(p => p.status === col.status);
            return (
              <div
                key={col.status}
                className="rounded-3xl bg-slate-900/50 border border-slate-800 p-4 flex flex-col min-w-[220px]"
              >
                {/* Column Header */}
                <div className={`p-2.5 rounded-2xl border text-xs font-bold mb-3 flex items-center justify-between ${col.color}`}>
                  <span>{col.label}</span>
                  <span className="w-5 h-5 rounded-full bg-slate-950/80 flex items-center justify-center text-[10px]">
                    {apps.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3 flex-1">
                  {apps.length === 0 ? (
                    <div className="p-4 text-center text-[11px] text-slate-600 border border-dashed border-slate-800 rounded-2xl">
                      No applications
                    </div>
                  ) : (
                    apps.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-xs font-bold text-white truncate">{app.companyName}</h4>
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                              {app.ctcLpa} LPA
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 font-medium">{app.roleTitle}</p>
                          <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {app.location}
                          </p>

                          {app.notes && (
                            <p className="text-[10px] text-slate-400 mt-2 line-clamp-2 bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/60 italic">
                              {app.notes}
                            </p>
                          )}
                        </div>

                        {/* Status Change Selector */}
                        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                          <span className="text-slate-500">Move stage:</span>
                          <select
                            value={app.status}
                            onChange={(e) => updatePlacementStatus(app.id, e.target.value as any)}
                            className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] rounded p-1 outline-none"
                          >
                            <option value="APPLIED">Applied</option>
                            <option value="ONLINE_ASSESSMENT">OA Round</option>
                            <option value="TECHNICAL_INTERVIEW">Technical</option>
                            <option value="HR_INTERVIEW">HR Round</option>
                            <option value="SELECTED">Selected 🎉</option>
                            <option value="REJECTED">Rejected</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Application Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
              <h3 className="text-lg font-bold text-white mb-1">Add Placement Application</h3>
              <p className="text-xs text-slate-400 mb-6">Track application progress across recruitment rounds</p>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Google, Microsoft, Adobe"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Job Role Title</label>
                  <input
                    type="text"
                    required
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="e.g. Associate Software Engineer"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Package (CTC in LPA)</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={ctcLpa}
                      onChange={(e) => setCtcLpa(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Stage</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                    >
                      <option value="APPLIED">Applied</option>
                      <option value="ONLINE_ASSESSMENT">Online Assessment</option>
                      <option value="TECHNICAL_INTERVIEW">Technical Interview</option>
                      <option value="HR_INTERVIEW">HR Interview</option>
                      <option value="SELECTED">Selected / Offer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Round Notes / Feedback</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notes on questions asked or schedule details..."
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/25"
                  >
                    Save Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
