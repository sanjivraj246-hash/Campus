'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import OctagonalButton from './OctagonalButton';

export default function FinalCTASection() {
  return (
    <section className="py-24 px-3 sm:px-5 md:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Outer Glow & Cinematic Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[32px] sm:rounded-[44px] bg-gradient-to-tr from-indigo-950/70 via-[#050814] to-purple-950/60 border border-white/[0.12] p-10 sm:p-16 lg:p-20 text-center shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden backdrop-blur-3xl"
      >
        {/* Background Radial Light Flares */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>START YOUR CAREER TRANSFORMATION</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-3xl mx-auto leading-[1.1]">
          Your career has a direction. <br />
          <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Let AI help you build it.
          </span>
        </h2>

        {/* Supporting Text */}
        <p className="text-sm sm:text-lg text-slate-300 max-w-xl mx-auto mt-6 mb-10 font-normal tracking-wide">
          Analyze. Learn. Build. Practice. Get Ready.
        </p>

        {/* Cut-Corner Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <OctagonalButton variant="primary" href="/register">
            Start Your Journey
          </OctagonalButton>

          <OctagonalButton variant="border" href="/dashboard">
            Explore CampusAI
          </OctagonalButton>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Zero Setup Required
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" />
            Instant Career Readiness Calibrator
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Tier-1 MNC Benchmark Standard
          </span>
        </div>
      </motion.div>
    </section>
  );
}
