'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessagesSquare, Bot, Mic, Sparkles, CheckCircle2, Award, ArrowRight, Volume2 } from 'lucide-react';
import Link from 'next/link';
import OctagonalButton from './OctagonalButton';

export default function AIInterviewSection() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  return (
    <section id="interview" className="py-24 px-3 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-semibold text-rose-300">
          <MessagesSquare className="w-3.5 h-3.5 text-rose-400" />
          <span>AI MOCK INTERVIEW SIMULATOR</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Practice before the <br className="hidden sm:inline" />
          real interview.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Simulate high-stakes Technical, System Design, and HR interview rounds with real-time AI speech transcription, depth evaluation, and communication feedback.
        </p>
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[28px] bg-[#050814]/90 border border-white/[0.08] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left 7 Cols: Question & Answer Interaction */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* AI Interviewer Box */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-rose-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                    AI Interviewer • Technical Round
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  &ldquo;Explain the difference between REST API and GraphQL.&rdquo;
                </p>
              </div>
            </div>

            {/* Candidate Voice / Text Response Box */}
            <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/80 border border-indigo-400/30 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-indigo-500/20">
                <Mic className="w-5 h-5 animate-pulse text-indigo-200" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                    Student Answer (Audio Transcribed)
                  </span>
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="text-[10px] text-indigo-300 font-semibold flex items-center gap-1 hover:text-white transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isPlayingAudio ? 'Playing Sample' : 'Preview Audio'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  &ldquo;REST is an architectural style based on discrete resource URIs and fixed HTTP verbs, which can lead to over-fetching or multiple roundtrips. In contrast, GraphQL provides a strongly-typed single endpoint where the client queries precisely the schema fields required, reducing payload bloat and roundtrips.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: AI Evaluation Scorecard */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/30 via-slate-950/90 to-slate-950/70 border border-rose-500/30 space-y-4 shadow-xl">
              
              {/* Overall Score Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-rose-400 tracking-wider">
                    Overall Evaluation
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-0.5">
                    81%
                  </div>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Tier-1 Passed
                </span>
              </div>

              {/* Evaluation Breakdown Pillars */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Technical Architecture</span>
                    <span className="text-emerald-400 font-bold">82%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[82%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Communication Clarity</span>
                    <span className="text-purple-400 font-bold">74%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[74%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Problem Solving &amp; Trade-offs</span>
                    <span className="text-indigo-400 font-bold">88%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-[88%]" />
                  </div>
                </div>
              </div>
            </div>

            <OctagonalButton variant="primary" href="/interview" className="w-full">
              Start Full AI Mock Interview
            </OctagonalButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
