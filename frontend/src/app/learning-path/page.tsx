'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import {
  Compass, CheckCircle2, Clock, BookOpen,
  Code2, Sparkles, Trophy, ExternalLink, ArrowRight,
  TrendingUp, Award, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LearningPathPage() {
  const { student, learningPath, toggleRoadmapModule } = useStudent();

  const handleToggle = (monthNumber: number) => {
    toggleRoadmapModule(monthNumber);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  const completedPct = Math.round((learningPath.completedModules / learningPath.totalModules) * 100);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Personalized AI Learning Path
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic 6-month placement roadmap customized for {learningPath.targetRole}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Roadmap Progress</div>
              <div className="text-sm font-bold text-emerald-400">{completedPct}% Completed</div>
            </div>
            <div className="w-28 bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${completedPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-6">
          {learningPath.modules.map((mod) => (
            <div
              key={mod.monthNumber}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
                mod.isCompleted
                  ? 'bg-gradient-to-br from-emerald-950/20 via-slate-900/80 to-slate-900/60 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-base flex-shrink-0 shadow-md ${
                      mod.isCompleted
                        ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                        : 'bg-slate-800 text-indigo-300 border border-slate-700'
                    }`}
                  >
                    {mod.isCompleted ? <CheckCircle2 className="w-6 h-6" /> : `M${mod.monthNumber}`}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-base font-bold ${mod.isCompleted ? 'text-emerald-200' : 'text-white'}`}>
                        {mod.topic}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          mod.difficulty === 'HARD'
                            ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                            : mod.difficulty === 'MEDIUM'
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {mod.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {mod.estimatedHours} Hours
                  </span>

                  <button
                    onClick={() => handleToggle(mod.monthNumber)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                      mod.isCompleted
                        ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25'
                    }`}
                  >
                    {mod.isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed (+Score Boost)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Mark as Completed</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tasks, Resources & Milestone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Practice Tasks */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    Hands-on Practice Tasks
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {mod.practiceTasks.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Curated Resources */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Recommended Study Resources
                  </div>
                  <div className="space-y-2">
                    {mod.resources.map((res, idx) => (
                      <a
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-xs text-slate-200 hover:text-white transition flex items-center justify-between group"
                      >
                        <span className="truncate">{res.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Milestone Capstone */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/30 to-purple-950/30 border border-indigo-500/25 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5" />
                      Project Milestone
                    </div>
                    <p className="text-xs font-semibold text-white mt-1">
                      {mod.projectMilestone}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Showcases practical application on your public portfolio
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-indigo-500/20 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+4% Career Readiness on Completion</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
