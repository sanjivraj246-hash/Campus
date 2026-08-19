'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/layout/AppShell';
import ReadinessScoreWidget from '@/components/dashboard/ReadinessScoreWidget';
import { useStudent } from '@/context/StudentContext';
import {
  GraduationCap, CalendarCheck, Code2, Briefcase,
  Trophy, ArrowUpRight, CheckCircle2, Clock,
  Bot, FileText, Cpu, Sparkles, AlertTriangle, ArrowRight
} from 'lucide-react';

export default function StudentDashboardPage() {
  const {
    student, learningPath, projects, hackathons,
    placements, codingProblems, toggleRoadmapModule
  } = useStudent();

  const solvedCount = codingProblems.filter(p => p.isSolved).length;
  const activeApplications = placements.filter(p => p.status !== 'REJECTED');

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <img
              src={student.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'}
              alt={student.fullName}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-md shadow-indigo-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  Welcome back, {student.fullName}
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Year {student.year}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                <span>{student.department}</span>
                <span>•</span>
                <span className="text-indigo-300 font-semibold">{student.college}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">🎯 Target: {student.targetCareer}</span>
              </p>
            </div>
          </div>

          {/* Quick AI Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/career-mentor"
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Ask Mentor</span>
            </Link>

            <Link
              href="/resume-analyzer"
              className="px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Analyze Resume</span>
            </Link>
          </div>
        </div>

        {/* Core AI Career Readiness Engine Component */}
        <ReadinessScoreWidget />

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: CGPA */}
          <Link
            href="/academics"
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Current CGPA</span>
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white mt-2 flex items-baseline gap-1.5">
              <span>{student.cgpa.toFixed(2)}</span>
              <span className="text-xs text-slate-500 font-normal">/ 10.0</span>
            </div>
            <div className="mt-2 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <span>Top 5% in Department</span>
            </div>
          </Link>

          {/* Card 2: Attendance */}
          <Link
            href="/attendance"
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Overall Attendance</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white mt-2 flex items-baseline gap-1.5">
              <span>{student.attendancePercentage}%</span>
            </div>
            <div className="mt-2 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <span>Above 75% Cutoff Threshold</span>
            </div>
          </Link>

          {/* Card 3: Coding Progress */}
          <Link
            href="/coding"
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Coding Practice</span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition">
                <Code2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white mt-2 flex items-baseline gap-1.5">
              <span>{solvedCount} / {codingProblems.length}</span>
              <span className="text-xs text-slate-500 font-normal">Problems Solved</span>
            </div>
            <div className="mt-2 text-[11px] text-purple-400 font-medium flex items-center gap-1">
              <span>🔥 14-Day Practice Streak</span>
            </div>
          </Link>

          {/* Card 4: Placement Applications */}
          <Link
            href="/placements"
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Placement Pipeline</span>
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white mt-2 flex items-baseline gap-1.5">
              <span>{activeApplications.length}</span>
              <span className="text-xs text-slate-500 font-normal">Active Drives</span>
            </div>
            <div className="mt-2 text-[11px] text-cyan-400 font-medium flex items-center gap-1">
              <span>🎉 1 Offer Received (32 LPA)</span>
            </div>
          </Link>
        </div>

        {/* 2-Column Section: Learning Roadmap & Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Cols: 6-Month Learning Roadmap Snapshot */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    Personalized AI Learning Path
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Targeted {learningPath.targetRole} Blueprint (6-Month Duration)
                  </p>
                </div>
                <Link
                  href="/learning-path"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>Full Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3 mt-4">
                {learningPath.modules.slice(0, 4).map((mod) => (
                  <div
                    key={mod.monthNumber}
                    onClick={() => toggleRoadmapModule(mod.monthNumber)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                      mod.isCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-indigo-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          mod.isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {mod.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : mod.monthNumber}
                      </div>
                      <div className="min-w-0">
                        <h4 className={`text-xs font-bold truncate ${mod.isCompleted ? 'text-emerald-200 line-through' : 'text-white'}`}>
                          {mod.topic}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">{mod.projectMilestone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                        {mod.estimatedHours} hrs
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          mod.isCompleted
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                        }`}
                      >
                        {mod.isCompleted ? 'Completed (+Score)' : 'Mark Done'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{learningPath.completedModules} of {learningPath.totalModules} Months Completed</span>
              <span className="text-indigo-400 font-semibold">Toggling updates Career Score in real time</span>
            </div>
          </div>

          {/* Right 5 Cols: Upcoming Hackathons & Placement Schedules */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hackathons Widget */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Upcoming Hackathons
                </h3>
                <Link href="/hackathons" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {hackathons.slice(0, 2).map((h) => (
                  <div key={h.id} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">{h.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {h.mode}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 truncate">{h.organizer} • Prize: {h.prizePool}</p>
                    <div className="mt-2.5 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Starts: {h.dateStart}</span>
                      <a
                        href={h.registrationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                      >
                        <span>Register</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Placement Interview Alert Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/50 via-slate-900/80 to-purple-950/40 border border-indigo-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Next Interview Scheduled
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Round 2
                </span>
              </div>
              <h4 className="text-base font-bold text-white mt-1">Google India — ASE Role</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Technical Interview scheduled on <strong>Aug 22, 2:00 PM</strong>. Focus: Graphs and System Design.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Link
                  href="/interview"
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                >
                  Start AI Mock Prep
                </Link>
                <Link
                  href="/placements"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
