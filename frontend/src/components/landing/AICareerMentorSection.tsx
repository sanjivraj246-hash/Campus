'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Sparkles, Send, ArrowRight, MessageSquareCode, Lightbulb, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import OctagonalButton from './OctagonalButton';

export default function AICareerMentorSection() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);

  const conversationPresets = [
    {
      query: 'What should I learn next?',
      reply:
        'Based on your current skills and your goal of becoming a Software Engineer, focus next on DSA, backend development and system design.',
      action: 'View Suggested Roadmap Modules',
      href: '/learning-path',
    },
    {
      query: 'How can I improve my ATS score from 82 to 95+?',
      reply:
        'Add quantitative performance metrics to your DevFlow project (e.g., sub-50ms WebSocket latency) and integrate keywords for Redis caching and Docker container orchestration.',
      action: 'Open Resume Optimizer',
      href: '/resume-analyzer',
    },
    {
      query: 'Which capstone project will stand out for MNCs?',
      reply:
        'Building the Campus Emergency Platform with Socket.io, Redis Pub/Sub, and PostGIS demonstrates high-concurrency distributed systems expertise that senior engineering leads prioritize.',
      action: 'View Project Blueprint',
      href: '/projects',
    },
  ];

  return (
    <section id="ai-mentor" className="py-24 px-3 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300">
          <Bot className="w-3.5 h-3.5 text-purple-400" />
          <span>24/7 AI CAREER MENTOR</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Your AI mentor. <br className="hidden sm:inline" />
          Whenever you need it.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Ask questions about your career trajectory, skill gaps, resume bullet points, and interview preparation. Get personalized guidance trained on real hiring data.
        </p>
      </div>

      {/* Interactive Chat Mockup Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto rounded-[28px] sm:rounded-[36px] bg-[#050814]/90 border border-white/[0.08] shadow-2xl backdrop-blur-3xl p-6 sm:p-10 relative overflow-hidden"
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                CampusAI Career Mentor
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-xs text-slate-400">Trained on 500+ Tier-1 hiring rubrics &amp; student roadmaps</p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
            Online
          </span>
        </div>

        {/* Quick Question Chips */}
        <div className="py-5 border-b border-white/[0.06] flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400 font-medium">Try asking:</span>
          {conversationPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPrompt(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition duration-200 text-left ${
                selectedPrompt === idx
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 border border-purple-400'
                  : 'bg-slate-950/80 border border-white/[0.06] text-slate-300 hover:text-white hover:border-white/20'
              }`}
            >
              &ldquo;{preset.query}&rdquo;
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="py-6 space-y-4 min-h-[220px]">
          {/* Student Bubble */}
          <div className="flex items-start gap-3 justify-end">
            <div className="max-w-lg p-4 rounded-2xl rounded-tr-sm bg-indigo-600 text-white text-xs sm:text-sm font-medium shadow-md">
              <p>{conversationPresets[selectedPrompt].query}</p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 text-xs font-bold flex-shrink-0">
              <User className="w-4 h-4 text-slate-300" />
            </div>
          </div>

          {/* AI Mentor Bubble with Staggered Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPrompt}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex items-start gap-3 justify-start"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="max-w-xl p-4 sm:p-5 rounded-2xl rounded-tl-sm bg-slate-950/90 border border-white/[0.08] text-xs sm:text-sm text-slate-200 space-y-3 shadow-md">
                <p className="leading-relaxed">
                  {conversationPresets[selectedPrompt].reply}
                </p>

                <div className="pt-2 border-t border-white/[0.06]">
                  <Link
                    href={conversationPresets[selectedPrompt].href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
                  >
                    <span>{conversationPresets[selectedPrompt].action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Bottom */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Available 24/7 inside your student dashboard
          </p>

          <OctagonalButton variant="sm" href="/career-mentor">
            Launch AI Career Mentor
          </OctagonalButton>
        </div>
      </motion.div>
    </section>
  );
}
