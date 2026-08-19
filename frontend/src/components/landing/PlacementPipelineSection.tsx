'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Trophy, ArrowRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import OctagonalButton from './OctagonalButton';

export default function PlacementPipelineSection() {
  const stages = [
    { title: 'Student Profile', desc: 'AI skill calibrated & verified', status: 'COMPLETED' },
    { title: 'Application', desc: 'ATS resume dispatched to MNCs', status: 'COMPLETED' },
    { title: 'Online Assessment', desc: 'DSA & coding rounds cleared', status: 'COMPLETED' },
    { title: 'Technical Interview', desc: 'System design & architecture', status: 'COMPLETED' },
    { title: 'HR Interview', desc: 'Culture & leadership fit', status: 'COMPLETED' },
    { title: 'Selected 🎉', desc: 'Tier-1 Offer Letter Released', status: 'OFFER' },
  ];

  return (
    <section id="placements" className="py-24 px-3 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
          <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
          <span>RECRUITMENT PIPELINE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Accelerated Placement Journey
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From first-year profile calibration to Tier-1 offer release, monitor your end-to-end recruitment milestones in real time.
        </p>
      </div>

      {/* 6-Stage Glowing Pipeline Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {stages.map((stage, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`p-4 sm:p-5 rounded-[22px] border text-center flex flex-col justify-between relative overflow-hidden group transition-all duration-300 ${
              stage.status === 'OFFER'
                ? 'bg-gradient-to-b from-emerald-950/40 via-[#050814]/95 to-slate-950/90 border-emerald-500/50 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                : 'bg-[#050814]/90 border-white/[0.08] hover:border-indigo-500/30'
            }`}
          >
            <div>
              <div
                className={`w-9 h-9 rounded-xl mx-auto flex items-center justify-center font-bold text-xs mb-3 shadow-md ${
                  stage.status === 'OFFER'
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-indigo-600/30 border border-indigo-500/40 text-indigo-300'
                }`}
              >
                {stage.status === 'OFFER' ? '🎉' : idx + 1}
              </div>
              <h4 className="text-xs font-bold text-white mb-1">{stage.title}</h4>
              <p className="text-[10px] text-slate-400 leading-tight">{stage.desc}</p>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-white/[0.06]">
              <span
                className={`text-[9px] font-bold uppercase tracking-wider ${
                  stage.status === 'OFFER' ? 'text-emerald-400' : 'text-indigo-400'
                }`}
              >
                {stage.status === 'OFFER' ? 'Offer Unlocked' : 'Stage Cleared'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <OctagonalButton variant="border" href="/placements">
          View Live Placement Drives &amp; CTC Analytics
        </OctagonalButton>
      </div>
    </section>
  );
}
