'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import {
  CalendarCheck, AlertTriangle, CheckCircle2,
  TrendingUp, ShieldAlert, Info, Calculator, Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid
} from 'recharts';

export default function AttendancePage() {
  const { student, attendanceRecords } = useStudent();

  const [missCalculatorSubject, setMissCalculatorSubject] = useState(attendanceRecords[0]?.subjectCode || 'CS301');
  const [extraMissClasses, setExtraMissClasses] = useState(2);

  const monthlyAttendanceData = [
    { month: 'Jun', percentage: 92 },
    { month: 'Jul', percentage: 88 },
    { month: 'Aug (Current)', percentage: Math.round(student.attendancePercentage) },
  ];

  const selectedRecord = attendanceRecords.find(r => r.subjectCode === missCalculatorSubject) || attendanceRecords[0];
  const projectedTotal = (selectedRecord?.totalClasses || 40) + extraMissClasses;
  const projectedPct = Math.round(((selectedRecord?.attendedClasses || 35) / Math.max(projectedTotal, 1)) * 100);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-emerald-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Attendance Tracking &amp; Compliance</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Subject-wise attendance tracking, 75% cutoff threshold compliance, and forecast calculator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Overall Attendance</span>
              <span className="text-2xl font-extrabold text-emerald-400">{student.attendancePercentage}%</span>
            </div>
          </div>
        </div>

        {/* Warning Banner if any subject < 75% */}
        {attendanceRecords.some(r => r.percentage <= 75) && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-300">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>
                <strong>Attendance Warning:</strong> You have 1 subject (Computer Networks CS305) on the 75.0% threshold. Attend the next 3 sessions to ensure examination hall ticket clearance.
              </span>
            </div>
          </div>
        )}

        {/* 2-Column: Subject Cards Grid + Monthly Trend / Bunk Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Cols: Subject Attendance Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                <span>Subject-Wise Attendance Breakdown</span>
                <span className="text-xs text-emerald-400 font-semibold">Min 75% Required</span>
              </h3>

              <div className="space-y-3">
                {attendanceRecords.map((rec) => {
                  const isLow = rec.percentage <= 75;
                  return (
                    <div
                      key={rec.id}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white">{rec.subjectName}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">{rec.subjectCode}</span>
                        </div>

                        <div className="text-right">
                          <span className={`text-base font-extrabold ${isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {rec.percentage}%
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ml-2 ${
                            isLow ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                          }`}>
                            {rec.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>Attended: {rec.attendedClasses} of {rec.totalClasses} classes</span>
                          <span>{rec.totalClasses - rec.attendedClasses} Missed</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isLow ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${rec.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Monthly Chart & AI Attendance Simulator */}
          <div className="lg:col-span-5 space-y-6">
            {/* Monthly Trend Chart */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Monthly Attendance Trend
              </h3>
              <p className="text-xs text-slate-400 mb-4">Semester 5 consistency analysis</p>

              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <YAxis domain={[50, 100]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                    <Bar dataKey="percentage" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance Forecaster / Calculator */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-purple-950/40 border border-indigo-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Attendance Forecast Calculator</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Select Subject</label>
                  <select
                    value={missCalculatorSubject}
                    onChange={(e) => setMissCalculatorSubject(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  >
                    {attendanceRecords.map(r => (
                      <option key={r.id} value={r.subjectCode}>{r.subjectName} ({r.subjectCode})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Simulate Missing Next <strong className="text-indigo-300">{extraMissClasses}</strong> Classes:
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={extraMissClasses}
                    onChange={(e) => setExtraMissClasses(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Projected Attendance:</span>
                  <span className={`text-base font-extrabold ${projectedPct < 75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {projectedPct}% {projectedPct < 75 ? '(Below Cutoff)' : '(Safe)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
