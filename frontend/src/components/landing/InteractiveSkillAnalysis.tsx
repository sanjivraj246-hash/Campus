'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, TrendingUp, AlertCircle, CheckCircle2, ArrowRight, Target, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import OctagonalButton from './OctagonalButton';

export default function InteractiveSkillAnalysis() {
  const [selectedRole, setSelectedRole] = useState('Software Engineer');

  const skillsData = [
    { name: 'DSA & Algorithms', student: 68, industry: 90, status: 'Needs Improvement', priority: 'CRITICAL', color: 'bg-rose-500' },
    { name: 'Java / OOPs', student: 85, industry: 85, status: 'Strong', priority: 'MATCHED', color: 'bg-emerald-500' },
    { name: 'Python & Scripting', student: 80, industry: 75, status: 'Strong', priority: 'MATCHED', color: 'bg-emerald-500' },
    { name: 'React & Next.js', student: 90, industry: 80, status: 'Strong', priority: 'MATCHED', color: 'bg-emerald-500' },
    { name: 'SQL & Database Design', student: 75, industry: 85, status: 'Moderate', priority: 'MEDIUM', color: 'bg-indigo-500' },
    { name: 'Cloud & DevOps (Docker, AWS)', student: 60, industry: 80, status: 'Beginner', priority: 'HIGH', color: 'bg-amber-500' },
  ];

  return (
    <section id="ai-intelligence" className="py-24 px-3 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI SKILL GAP MATRIX</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Know where you stand.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          CampusAI turns your academic, technical and career data into a clear picture of where you are — and where you need to go.
        </p>
      </div>

      {/* Interactive Skill Gap Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[28px] sm:rounded-3xl bg-[#050814]/90 border border-white/[0.08] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Matrix Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              Skill-Gap Benchmark Diagnostic
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparing: <strong className="text-white">Your Profile</strong> vs <strong className="text-cyan-400">Industry Requirements</strong>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-400 hidden sm:inline font-medium">Target Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-950/90 border border-white/10 text-xs font-bold text-white outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              <option value="Software Engineer">Software Engineer (Tier-1 MNC)</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Cloud & DevOps Engineer">Cloud &amp; DevOps Engineer</option>
              <option value="AI & ML Engineer">AI &amp; Machine Learning Engineer</option>
            </select>
          </div>
        </div>

        {/* Skill Bars with Direct Visual Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-6 relative z-10">
          {skillsData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-4 rounded-2xl bg-slate-950/60 border border-white/[0.05] hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-white text-xs">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px]">
                    You: <strong className="text-indigo-300">{item.student}%</strong>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 text-[11px]">
                    Req: <strong className="text-cyan-300">{item.industry}%</strong>
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.priority === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : item.priority === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : item.priority === 'MEDIUM'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                {/* Industry Benchmark Pin */}
                <div
                  className="absolute top-0 bottom-0 bg-cyan-400/80 w-1 z-10"
                  style={{ left: `${item.industry}%` }}
                />
                {/* Student Score Bar */}
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    item.student >= item.industry
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                  }`}
                  style={{ width: `${item.student}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Skill Gap Detected & Recommendation Engine Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-purple-950/40 to-slate-950/70 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4 relative z-10"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400 block">
                AI SKILL GAP DETECTED
              </span>
              <p className="text-xs font-semibold text-white mt-0.5">
                &ldquo;Focus on <strong className="text-rose-300">DSA</strong> and <strong className="text-amber-300">Cloud</strong> to improve your {selectedRole} readiness.&rdquo;
              </p>
            </div>
          </div>

          <OctagonalButton variant="sm" href="/skill-gap">
            Open Skill Matrix
          </OctagonalButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
