'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Flame, CheckCircle2, Trophy, Terminal, ArrowRight, Play, Cpu, Layers } from 'lucide-react';
import Link from 'next/link';
import OctagonalButton from './OctagonalButton';

export default function CodingPracticeSection() {
  const [selectedTopic, setSelectedTopic] = useState('Dynamic Programming');

  const stats = [
    { label: 'Problems Solved', val: '124', icon: CheckCircle2, color: 'text-indigo-400' },
    { label: 'Day Streak', val: '18 Days', icon: Flame, color: 'text-amber-400' },
    { label: 'Accuracy', val: '86%', icon: Trophy, color: 'text-emerald-400' },
  ];

  const topics = [
    { name: 'Arrays', solved: 32, total: 35, level: 'EASY / MED', progress: 91 },
    { name: 'Strings', solved: 28, total: 30, level: 'EASY / MED', progress: 93 },
    { name: 'Linked Lists', solved: 18, total: 20, level: 'MEDIUM', progress: 90 },
    { name: 'Trees', solved: 22, total: 28, level: 'MED / HARD', progress: 78 },
    { name: 'Graphs', solved: 14, total: 22, level: 'HARD', progress: 63 },
    { name: 'Dynamic Programming', solved: 10, total: 25, level: 'HARD', progress: 40 },
  ];

  return (
    <section id="coding" className="py-24 px-3 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>DSA &amp; CODING ARENA</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Practice what companies ask.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Curated DSA problem sets categorized by Tier-1 company recurrence, time-space efficiency benchmarks, and AI code optimization feedback.
        </p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-10">
        {stats.map((st, i) => {
          const IconComp = st.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-[24px] bg-[#050814]/90 border border-white/[0.08] text-center shadow-xl backdrop-blur-xl flex flex-col items-center justify-center"
            >
              <div className={`w-10 h-10 rounded-2xl bg-slate-900 border border-white/[0.06] flex items-center justify-center ${st.color} mb-3 shadow-md`}>
                <IconComp className="w-5 h-5" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-white">{st.val}</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                {st.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* DSA Topic Breakdown Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[28px] bg-[#050814]/90 border border-white/[0.08] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
      >
        <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Algorithmic Topic Mastery</h3>
              <p className="text-xs text-slate-400">Targeting FAANG &amp; MNC placement technical rounds</p>
            </div>
          </div>

          <Link href="/coding" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            <span>Open Interactive Code Editor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 DSA Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          {topics.map((t, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedTopic(t.name)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                selectedTopic === t.name
                  ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-950/70 border-white/[0.05] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-white">{t.name}</span>
                <span className="text-[10px] font-mono font-semibold text-slate-400">
                  {t.solved} / {t.total}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-2.5">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-1000"
                  style={{ width: `${t.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>{t.level}</span>
                <span className="text-indigo-300 font-bold">{t.progress}% Mastered</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Problem Preview for Selected Topic */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">
              Active Challenge • {selectedTopic}
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white">
              {selectedTopic === 'Dynamic Programming'
                ? 'Longest Increasing Subsequence with Binary Search O(N log N)'
                : selectedTopic === 'Graphs'
                ? 'Shortest Path in Weighted DAG with Topological Sort'
                : selectedTopic === 'Trees'
                ? 'Lowest Common Ancestor in Binary Search Tree'
                : 'Two Pointer Optimal Traversal'}
            </h4>
          </div>

          <OctagonalButton variant="sm" href="/coding">
            Solve Problem
          </OctagonalButton>
        </div>
      </motion.div>
    </section>
  );
}
