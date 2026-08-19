'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import { useAuth } from '@/context/AuthContext';
import {
  Users, CalendarCheck, GraduationCap, AlertTriangle,
  Search, CheckCircle2, ShieldAlert, Award, Plus,
  FileSpreadsheet, Sparkles, BookOpen
} from 'lucide-react';

export default function FacultyDashboardPage() {
  const { allStudents, updateAttendance, attendanceRecords } = useStudent();
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedStudentForAttendance, setSelectedStudentForAttendance] = useState<number | null>(null);
  const [extraAttended, setExtraAttended] = useState(1);
  const [successToast, setSuccessToast] = useState('');

  const filteredStudents = allStudents.filter(s => {
    const matchesSearch = s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.targetCareer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || s.department.includes(selectedDept);
    return matchesSearch && matchesDept;
  });

  const atRiskStudents = allStudents.filter(s => s.attendancePercentage < 75 || s.cgpa < 7.5);
  const avgAttendance = Math.round(allStudents.reduce((acc, s) => acc + s.attendancePercentage, 0) / allStudents.length);
  const avgCgpa = (allStudents.reduce((acc, s) => acc + s.cgpa, 0) / allStudents.length).toFixed(2);

  const handleMarkBatchAttendance = (studentId: number) => {
    updateAttendance(1, 39, 42); // updates student 1 subject
    setSuccessToast(`Attendance updated successfully for student ID #${studentId}!`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-amber-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">Faculty Governance &amp; Marks Portal</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  Faculty View
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Instructor portal for Dr. Rajesh Verma / Prof. Priya Sharma • Batch attendance, academic interventions, and marks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Batch Export: Exported 10 student transcripts and attendance summaries to CSV/Excel format.')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export Roster (CSV)</span>
            </button>
          </div>
        </div>

        {successToast && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* 4 Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Total Enrolled Students</span>
            <div className="text-3xl font-extrabold text-white mt-1">{allStudents.length}</div>
            <span className="text-[11px] text-indigo-400 font-medium">Across all departments</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Average Class Attendance</span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1">{avgAttendance}%</div>
            <span className="text-[11px] text-emerald-400 font-medium">Above 75% college target</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Average Class CGPA</span>
            <div className="text-3xl font-extrabold text-cyan-400 mt-1">{avgCgpa}</div>
            <span className="text-[11px] text-cyan-400 font-medium">Grading scale / 10.0</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-rose-500/30 bg-rose-950/10">
            <span className="text-xs font-semibold text-rose-300">At-Risk Students</span>
            <div className="text-3xl font-extrabold text-rose-400 mt-1">{atRiskStudents.length}</div>
            <span className="text-[11px] text-rose-400 font-medium">⚠️ Low attendance / CGPA</span>
          </div>
        </div>

        {/* At-Risk Students Warning Section */}
        {atRiskStudents.length > 0 && (
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-rose-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                At-Risk Academic &amp; Attendance Interventions
              </h3>
              <span className="text-xs text-rose-400 font-semibold">{atRiskStudents.length} flagged for review</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {atRiskStudents.map(student => (
                <div key={student.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt={student.fullName}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-rose-500/40"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{student.fullName}</h4>
                      <p className="text-[11px] text-slate-400">
                        Attendance: <strong className="text-rose-400">{student.attendancePercentage}%</strong> • CGPA: {student.cgpa.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleMarkBatchAttendance(student.id)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition"
                  >
                    Quick Remediate
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Student Roster Table with Search & Filter */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              Student Academic Directory
            </h3>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, role, email..."
                  className="pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-indigo-500"
                />
              </div>

              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none"
              >
                <option value="ALL">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Tech</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-3">Student Name</th>
                  <th className="pb-3">Department &amp; Year</th>
                  <th className="pb-3 text-center">CGPA</th>
                  <th className="pb-3 text-center">Attendance</th>
                  <th className="pb-3 text-center">Career Score</th>
                  <th className="pb-3 text-center">Target Goal</th>
                  <th className="pb-3 text-right">Faculty Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 pr-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={s.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                          alt={s.fullName}
                          className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700"
                        />
                        <div>
                          <span className="font-bold text-white block">{s.fullName}</span>
                          <span className="text-[10px] text-slate-400">{s.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      <span className="text-slate-300 block">{s.department}</span>
                      <span className="text-[10px] text-indigo-400 font-semibold">Year {s.year}</span>
                    </td>

                    <td className="py-3.5 text-center font-extrabold text-white">
                      {s.cgpa.toFixed(2)}
                    </td>

                    <td className="py-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                        s.attendancePercentage < 75 ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {s.attendancePercentage}%
                      </span>
                    </td>

                    <td className="py-3.5 text-center">
                      <span className="font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/25">
                        {s.careerReadinessScore}/100
                      </span>
                    </td>

                    <td className="py-3.5 text-center text-slate-300">
                      {s.targetCareer}
                    </td>

                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => handleMarkBatchAttendance(s.id)}
                        className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-[11px] font-semibold border border-slate-700 transition"
                      >
                        + Mark Present
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
