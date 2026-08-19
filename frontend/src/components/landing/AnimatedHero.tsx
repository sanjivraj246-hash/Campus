'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, Bot, Target, FileText,
  Cpu, Compass, Trophy, Code2, MessagesSquare,
  Briefcase, CheckCircle2, Zap, Play, ShieldCheck,
  TrendingUp, Award, Users, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

export default function AnimatedHero() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<'student' | 'faculty' | 'admin'>('student');

  // Animated counters
  const [readinessCounter, setReadinessCounter] = useState(0);
  const [placementRate, setPlacementRate] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReadinessCounter(78);
      setPlacementRate(94);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const floatingBadges = [
    { icon: FileText, text: 'ATS Score: 85/100', color: 'from-blue-500/20 to-indigo-500/20 border-indigo-500/30 text-indigo-300', x: -220, y: -90, delay: 0.2 },
    { icon: Bot, text: 'AI Career Mentor Active', color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300', x: 220, y: -80, delay: 0.4 },
    { icon: MessagesSquare, text: 'Mock Interview Graded: 90%', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300', x: 240, y: 100, delay: 0.6 },
    { icon: Trophy, text: 'Google ASE Drive: Round 2', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300', x: -240, y: 90, delay: 0.8 },
  ];

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Animated Mesh / Glowing Background Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 rounded-full blur-[140px]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="w-full max-w-5xl mx-auto text-center relative z-10 space-y-6">
        {/* Top Floating Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md shadow-lg shadow-indigo-500/10 text-xs font-semibold text-indigo-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
          <span>Next-Generation Autonomous Campus Intelligence Engine</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Hero Title Required */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]"
        >
          Your AI-Powered Path to{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Career Success
          </span>
        </motion.h1>

        {/* Hero Subtitle Required */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Analyze your skills, build the right projects, learn smarter, prepare for interviews, and become placement-ready with AI.
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link href="/dashboard">
            <Button size="lg" variant="gradient" className="gap-2 shadow-xl shadow-indigo-500/30 text-sm font-bold h-12 px-8">
              <span>Explore Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href="/resume-analyzer">
            <Button size="lg" variant="outline" className="gap-2 text-sm font-semibold h-12 px-6">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Test AI Resume Scanner</span>
            </Button>
          </Link>

          <Link href="/interview">
            <Button size="lg" variant="secondary" className="gap-2 text-sm font-semibold h-12 px-6 hidden sm:inline-flex">
              <MessagesSquare className="w-4 h-4 text-rose-400" />
              <span>Mock Interview Prep</span>
            </Button>
          </Link>
        </motion.div>

        {/* Quick 1-Click Role Switcher Demo Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 max-w-3xl mx-auto"
        >
          <div className="p-2 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 px-3 font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Recruiter / Evaluator 1-Click Live Perspectives:
            </span>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  login('aarav.patel@student.campusiq.edu', 'STUDENT');
                  window.location.href = '/dashboard';
                }}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 font-bold transition flex items-center gap-1.5"
              >
                <span>Student View</span>
                <ChevronRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => {
                  login('priya.sharma@campusiq.edu', 'FACULTY');
                  window.location.href = '/faculty';
                }}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-bold transition flex items-center gap-1.5"
              >
                <span>Faculty View</span>
                <ChevronRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => {
                  login('admin@campusiq.edu', 'ADMIN');
                  window.location.href = '/admin';
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold transition flex items-center gap-1.5"
              >
                <span>Admin View</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Live Hero Showcase Container with Floating Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="pt-10 relative"
        >
          {/* Floating Technology Orbs */}
          {floatingBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4 + idx,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: badge.delay
                }}
                className={`hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r ${badge.color} border backdrop-blur-xl shadow-2xl text-xs font-bold absolute z-20 pointer-events-none`}
                style={{
                  top: `calc(50% + ${badge.y}px)`,
                  left: `calc(50% + ${badge.x}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{badge.text}</span>
              </motion.div>
            );
          })}

          {/* Interactive Hero Showcase Card */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    CampusAI Placement Intelligence Center
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live telemetry from Student Profile: Aarav Patel (Year 3 CSE)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Engine Online
                </span>
              </div>
            </div>

            {/* 3 Metric Pillars in Hero Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {/* Pillar 1 */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>AI Readiness Score</span>
                  <Award className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {readinessCounter}<span className="text-base text-slate-500 font-normal">/100</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                    style={{ width: `${readinessCounter}%` }}
                  />
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Tier-1 Placement Rate</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400">
                  {placementRate}%
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Avg Package: 18.4 LPA</span>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Skill Coverage</span>
                  <Cpu className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-extrabold text-purple-300">
                  88%
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Full Stack &amp; Cloud Matrix</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
