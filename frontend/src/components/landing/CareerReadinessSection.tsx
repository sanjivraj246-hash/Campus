'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Sparkles, CheckCircle2, ArrowRight, Target, ShieldCheck } from 'lucide-react';
import OctagonalButton from './OctagonalButton';

export default function CareerReadinessSection() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScore(78);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const breakdown = [
    { label: 'Technical Skills', val: 78, color: 'bg-indigo-500' },
    { label: 'DSA', val: 68, color: 'bg-purple-500' },
    { label: 'Projects', val: 82, color: 'bg-cyan-500' },
    { label: 'Resume', val: 85, color: 'bg-emerald-500' },
    { label: 'Interview', val: 74, color: 'bg-rose-500' },
    { label: 'Communication', val: 69, color: 'bg-amber-500' },
  ];

  const priorities = [
    { num: '01', title: 'Improve DSA', desc: 'Master Medium/Hard Graph Traversals & Dynamic Programming on the coding arena.' },
    { num: '02', title: 'Build one advanced project', desc: 'Deploy an end-to-end distributed system with Redis caching and Docker.' },
    { num: '03', title: 'Practice technical interviews', desc: 'Complete 3 simulated AI mock interview rounds with live feedback.' },
  ];

  return (
    <section id="readiness" className="py-24 px-3 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
          <Target className="w-3.5 h-3.5 text-indigo-400" />
          <span>BENCHMARK READINESS GAUGE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Are you ready for <br className="hidden sm:inline" />
          your dream role?
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The CampusAI Career Readiness Index unifies your algorithmic acumen, portfolio depth, resume ATS score, and mock interview performance into one actionable hiring benchmark.
        </p>
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#070c1e] via-[#050814] to-[#0a1026] border border-indigo-500/30 p-8 sm:p-12 shadow-2xl backdrop-blur-3xl relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left 5 Cols: Giant Animated Circular Progress Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-slate-950/80 border border-white/[0.08] shadow-2xl">
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-indigo-400 mb-2">
              CAREER READINESS
            </span>

            <div className="relative w-48 h-48 my-4 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#readinessGrad2)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * score) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="readinessGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white">{score}</span>
                <span className="text-xs text-slate-400 font-bold uppercase mt-1">/ 100</span>
              </div>
            </div>

            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
              <span>Tier-1 MNC Ready (Top 12% Bracket)</span>
            </span>
          </div>

          {/* Right 7 Cols: Metric Breakdown & Next 3 Priorities */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Metric Breakdown Grid */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Readiness Pillar Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {breakdown.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04]">
                    <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                      <span>{item.label}</span>
                      <span className="font-bold text-white">{item.val}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next 3 Priorities */}
            <div className="pt-4 border-t border-white/[0.08]">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-3">
                🎯 Your Next 3 Priorities
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {priorities.map((p) => (
                  <div
                    key={p.num}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.06] text-left flex flex-col justify-between"
                  >
                    <div>
                      <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold text-xs flex items-center justify-center mb-2">
                        {p.num}
                      </span>
                      <h4 className="text-xs font-bold text-white mb-1">{p.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
