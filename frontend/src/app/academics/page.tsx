'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import {
  GraduationCap, TrendingUp, AlertTriangle, BookOpen,
  Award, CheckCircle2, ArrowRight, Sparkles, LineChart as ChartIcon
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid, AreaChart, Area
} from 'recharts';

export default function AcademicsPage() {
  const { student, academicRecords } = useStudent();

  const semesterTrendData = [
    { sem: 'Sem 1', gpa: 8.40 },
    { sem: 'Sem 2', gpa: 8.65 },
    { sem: 'Sem 3', gpa: 8.75 },
    { sem: 'Sem 4', gpa: 8.90 },
    { sem: 'Sem 5 (Current)', gpa: student.cgpa },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Academic Performance &amp; CGPA</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Semester evaluations, marks analytics, and AI-powered weak subject detection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Cumulative CGPA</span>
              <span className="text-2xl font-extrabold text-white">{student.cgpa.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* AI Weak Subject Alert Banner */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900/80 to-rose-950/30 border border-amber-500/30 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                AI Weak Subject Advisory: Computer Networks (CS305)
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  -12% Performance Drop
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Your performance in Network Protocol layers dropped by 12% in Midterm 2.
                Recommended revision: <strong>TCP 3-Way Handshake</strong>, <strong>Subnet Masking calculations</strong>, and <strong>DNS Resolution Lifecycle</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={() => alert('Revision blueprint: 1. Watch MIT OpenCourseWare Lecture 14; 2. Solve 10 subnetting numericals; 3. Implement socket client-server in Python.')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-md shadow-amber-500/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Revision Plan</span>
          </button>
        </div>

        {/* 2-Column: Semester CGPA Trend + Subject Marks Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 5 Cols: CGPA Trend Line Chart */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                Semester-by-Semester CGPA Growth
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Consistent upward trajectory from Semester 1 to Semester 5
              </p>

              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={semesterTrendData}>
                    <defs>
                      <linearGradient id="cgpaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="sem" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <YAxis domain={[7.5, 10]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="gpa" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#cgpaGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Department Rank: #4 of 120</span>
              <span className="text-emerald-400 font-semibold">Eligibility: 100% MNCs</span>
            </div>
          </div>

          {/* Right 7 Cols: Current Semester Subject Marks Table */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
              <span>Semester 5 Subject Marks &amp; AI Feedback</span>
              <span className="text-xs text-indigo-400 font-semibold">{academicRecords.length} Subjects</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="pb-3">Subject</th>
                    <th className="pb-3 text-center">Internals (30)</th>
                    <th className="pb-3 text-center">Exams (50)</th>
                    <th className="pb-3 text-center">Total (100)</th>
                    <th className="pb-3 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {academicRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3.5 pr-2">
                        <span className="font-bold text-white block">{rec.subjectName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{rec.subjectCode}</span>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 italic">
                          {rec.aiFeedback}
                        </p>
                      </td>
                      <td className="py-3.5 text-center font-semibold text-slate-300">{rec.internalMarks}</td>
                      <td className="py-3.5 text-center font-semibold text-slate-300">{rec.examMarks}</td>
                      <td className="py-3.5 text-center font-extrabold text-white">{rec.totalMarks}</td>
                      <td className="py-3.5 text-center">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                            rec.grade === 'O' || rec.grade === 'A+'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : rec.grade === 'A'
                              ? 'bg-indigo-500/20 text-indigo-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {rec.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
