'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, Bot, Target, FileText,
  Cpu, Compass, Trophy, Code2, MessagesSquare,
  Briefcase, CheckCircle2, Zap, Play, ShieldCheck,
  TrendingUp, Award, Users, ChevronRight, Activity, Terminal,
  BookOpen, BrainCircuit, Lightbulb
} from 'lucide-react';
import OctagonalButton from './OctagonalButton';

export default function CinematicHero() {
  const [readinessScore, setReadinessScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReadinessScore(78);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const metricPillars = [
    { name: 'Technical Skills', val: 78, color: 'bg-indigo-500' },
    { name: 'DSA', val: 68, color: 'bg-purple-500' },
    { name: 'Projects', val: 82, color: 'bg-cyan-500' },
    { name: 'Resume', val: 85, color: 'bg-emerald-500' },
    { name: 'Interview', val: 74, color: 'bg-rose-500' },
  ];

  return (
    <section className="relative w-full pt-28 pb-12 sm:pt-32 sm:pb-16 px-3 sm:px-5 md:px-6 lg:px-8">
      {/* Outer Immersive Framed Container matching Reference DNA */}
      <div className="relative max-w-7xl mx-auto rounded-[28px] sm:rounded-[36px] bg-[#050814]/90 border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-3xl p-6 sm:p-10 lg:p-14">
        
        {/* Layered Visual Background: Neural Mesh + Particles + Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated Light Orbs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.18, 0.32, 0.18],
              scale: [1, 1.15, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/40 via-purple-600/30 to-cyan-500/20 rounded-full blur-[140px]"
          />
          <div className="absolute -bottom-32 -right-20 w-[500px] h-[500px] bg-gradient-to-tl from-purple-700/20 via-indigo-900/30 to-transparent rounded-full blur-[120px]" />

          {/* Abstract AI Neural Network Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf808_1px,transparent_1px),linear-gradient(to_bottom,#818cf808_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_70%,transparent_100%)]" />
        </div>

        {/* TOP / MAIN HERO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
          
          {/* LEFT 6 COLS: Hero Copy, Badges & Cut Buttons */}
          <div className="lg:col-span-6 text-left space-y-6">
            
            {/* 0.35s: Eyebrow / AI Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/30 backdrop-blur-xl text-xs font-semibold text-indigo-300 shadow-lg shadow-indigo-500/10"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              <span className="tracking-wider uppercase text-[11px] font-bold">AI-POWERED CAREER INTELLIGENCE</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
            </motion.div>

            {/* 0.5s: Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-white leading-[1.08]"
            >
              Your AI-Powered <br className="hidden sm:inline" />
              Path to{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Career Success
              </span>
            </motion.h1>

            {/* 0.65s: Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              Analyze your skills, discover your gaps, build the right projects, prepare for interviews, and become placement-ready with AI.
            </motion.p>

            {/* 0.8s: Octagonal Cut-Corner CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <OctagonalButton variant="primary" href="/dashboard">
                Get Started
              </OctagonalButton>

              <OctagonalButton variant="border" href="#ai-intelligence">
                Explore Platform
              </OctagonalButton>
            </motion.div>

            {/* Secondary Hero Information Columns (Left & Right Insights) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-4 max-w-lg text-xs"
            >
              {/* Secondary Hero Info: Left Side */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>Career Intelligence 01</span>
                </div>
                <div className="text-white font-bold text-xs leading-snug">
                  Understand. Improve. Get Hired.
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  AI-powered career intelligence for students.
                </p>
              </div>

              {/* Secondary Hero Info: Right Side */}
              <div className="space-y-1 pl-3 border-l border-white/[0.08]">
                <div className="flex items-center gap-1 text-purple-400 font-bold text-[10px] uppercase tracking-wider">
                  <Bot className="w-3 h-3 text-purple-400" />
                  <span>AI Career Mentor</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Personalized guidance based on your skills, goals and progress.
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT 6 COLS: 3D Floating CampusAI Dashboard Visual */}
          <div className="lg:col-span-6 relative">
            
            {/* 1.4s: Floating AI Floating Badge 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 1.3 },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#080d1e]/90 border border-indigo-500/30 backdrop-blur-xl shadow-2xl text-xs font-bold text-indigo-300 absolute -top-5 -left-4 z-20"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>ATS Resume: 85/100</span>
            </motion.div>

            {/* 1.4s: Floating AI Floating Badge 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 1.4 },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
              }}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#080d1e]/90 border border-purple-500/30 backdrop-blur-xl shadow-2xl text-xs font-bold text-purple-300 absolute -bottom-5 -right-2 z-20"
            >
              <Bot className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>AI Career Mentor Active</span>
            </motion.div>

            {/* 1.0s: Main Floating CampusAI Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-gradient-to-br from-[#0b1024]/95 via-[#080d1f]/90 to-[#0f172a]/80 border border-white/[0.12] p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden"
            >
              {/* Internal Mockup Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">Student Career Hub</h3>
                    <p className="text-[10px] text-slate-400">Aarav Patel • Software Engineer Target</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Sync
                  </span>
                </div>
              </div>

              {/* 1.2s: Internal Elements - Circular Gauge & Pillar Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4 items-center">
                
                {/* CAREER READINESS 78 / 100 Gauge */}
                <div className="sm:col-span-5 p-3.5 rounded-2xl bg-slate-950/70 border border-white/[0.06] flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-indigo-400">
                    CAREER READINESS
                  </span>

                  <div className="relative w-24 h-24 my-2 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#heroGrad)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * readinessScore) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="50%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-white">{readinessScore}</span>
                      <span className="text-[8px] text-slate-400 font-bold uppercase">/ 100</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Tier-1 Ready
                  </span>
                </div>

                {/* Technical Skills Breakdown */}
                <div className="sm:col-span-7 space-y-2 p-3 rounded-2xl bg-slate-950/50 border border-white/[0.04]">
                  {metricPillars.map((item, idx) => (
                    <div key={idx} className="text-[11px]">
                      <div className="flex justify-between text-slate-300 font-medium mb-0.5">
                        <span className="text-[10px]">{item.name}</span>
                        <span className="font-bold text-white text-[10px]">{item.val}%</span>
                      </div>
                      <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI LEARNING PATH & RECOMMENDATION */}
              <div className="mt-3.5 pt-3 border-t border-white/[0.08] space-y-2.5">
                
                {/* AI Learning Path 67% Complete */}
                <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-indigo-400 block">
                      AI LEARNING PATH • 67% COMPLETE
                    </span>
                    <span className="text-[11px] text-white font-medium">Next: Advanced React Concepts</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold">
                    Module 4
                  </span>
                </div>

                {/* AI Recommendation Message */}
                <div className="p-2.5 rounded-xl bg-purple-950/25 border border-purple-500/20 text-[11px] text-slate-300 flex items-start gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">AI Recommendation:</strong> &ldquo;Improve DSA and Cloud skills to increase your Software Engineer readiness.&rdquo;
                  </p>
                </div>

                {/* Bottom Row: Upcoming Interview & Coding Solved */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-white/[0.05] text-[10px]">
                    <span className="text-slate-400 block">Upcoming Interview</span>
                    <span className="text-white font-bold">Frontend Dev • In 5 Days</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-white/[0.05] text-[10px]">
                    <span className="text-slate-400 block">Coding Progress</span>
                    <span className="text-emerald-400 font-bold">124 Problems Solved</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* HERO BOTTOM ROW (3-Column Composition matching Reference) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 pt-8 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-xs"
        >
          {/* COLUMN 1: Value Proposition Copy */}
          <div className="text-slate-400 leading-relaxed font-normal">
            We turn your current skills into a personalized roadmap for the career you want.
          </div>

          {/* COLUMN 2: Large text & Explore CampusAI Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-sm sm:text-base font-extrabold text-white">
              AI Career Intelligence
            </span>
            <Link
              href="/dashboard"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 transition"
            >
              <span>Explore CampusAI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* COLUMN 3: Platform Feature Indicators with Lucide Icons */}
          <div className="flex items-center justify-start md:justify-end gap-2 text-slate-300">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/[0.06] text-[11px] font-medium">
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/[0.06] text-[11px] font-medium">
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Skills</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/[0.06] text-[11px] font-medium">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span>Career</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
