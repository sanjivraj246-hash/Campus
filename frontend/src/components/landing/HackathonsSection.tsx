'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, MapPin, Sparkles, Bookmark, ArrowRight, Check, Users } from 'lucide-react';
import Link from 'next/link';
import OctagonalButton from './OctagonalButton';

export default function HackathonsSection() {
  const [savedHacks, setSavedHacks] = useState<{ [key: string]: boolean }>({});

  const toggleSave = (title: string) => {
    setSavedHacks((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const hackathons = [
    {
      title: 'National AI Hackathon',
      date: '24 Aug 2026',
      location: 'Hybrid • Bengaluru / Online',
      prize: '₹2,00,000 Prize Pool',
      teams: '480+ Teams Registered',
      skills: ['Generative AI', 'Vector DB', 'Next.js 14', 'FastAPI'],
      category: 'ARTIFICIAL INTELLIGENCE',
      deadline: 'Reg Closes in 4 Days',
    },
    {
      title: 'Full Stack Challenge',
      date: '2 Sep 2026',
      location: 'Virtual • Pan-India',
      prize: '₹1,50,000 Prize Pool',
      teams: '320+ Teams Registered',
      skills: ['Spring Boot 3', 'React', 'PostgreSQL', 'Docker'],
      category: 'FULL STACK WEB',
      deadline: 'Reg Closes in 12 Days',
    },
    {
      title: 'Cloud Innovation Hack',
      date: '15 Sep 2026',
      location: 'In-Person • Hyderabad',
      prize: '₹2,50,000 Prize Pool',
      teams: '210+ Teams Registered',
      skills: ['AWS ECS', 'Kubernetes', 'Serverless', 'Redis'],
      category: 'CLOUD & DEVOPS',
      deadline: 'Reg Closes in 25 Days',
    },
  ];

  return (
    <section id="hackathons" className="py-24 px-3 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>COMPETITIVE HACKATHONS</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Turn skills into experience.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Compete in national collegiate hackathons, collaborate with top student engineers, and win sponsored hiring fast-tracks from tech leaders.
        </p>
      </div>

      {/* 3 Hackathon Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hackathons.map((h, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-7 rounded-[26px] bg-[#050814]/90 border border-white/[0.08] hover:border-amber-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
          >
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {h.category}
                </span>

                <button
                  onClick={() => toggleSave(h.title)}
                  className={`p-2 rounded-xl border transition ${
                    savedHacks[h.title]
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-950/80 border-white/10 text-slate-400 hover:text-white'
                  }`}
                  title="Save Hackathon"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Prize */}
              <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition mb-1">
                {h.title}
              </h3>

              <div className="text-xs font-extrabold text-amber-400 mb-4 flex items-center gap-1.5">
                <Trophy className="w-4 h-4" />
                <span>{h.prize}</span>
              </div>

              {/* Date & Location Meta */}
              <div className="space-y-2 mb-5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  <span>{h.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>{h.location}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {h.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-950 border border-white/[0.05] text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions: Save / View Details */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-slate-400">
                {h.deadline}
              </span>

              <Link
                href="/hackathons"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
