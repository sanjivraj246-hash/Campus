'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Clock, CheckCircle2, Sparkles, BookOpen, ArrowRight, Zap, Layers } from 'lucide-react';
import OctagonalButton from './OctagonalButton';

export default function AnimatedRoadmapSection() {
  const milestones = [
    {
      step: '01',
      title: 'Programming Fundamentals',
      category: 'Core Java & Python',
      difficulty: 'FOUNDATION',
      duration: '4 Weeks (28 Hrs)',
      progress: 100,
      skills: ['OOPs Architecture', 'Memory Model', 'Exception Handling', 'Collections'],
      completed: true,
    },
    {
      step: '02',
      title: 'Data Structures & Algorithms',
      category: 'Algorithmic Problem Solving',
      difficulty: 'INTERMEDIATE',
      duration: '6 Weeks (42 Hrs)',
      progress: 100,
      skills: ['Trees & BST', 'Graph Traversals', 'Dynamic Programming', 'Recursion'],
      completed: true,
    },
    {
      step: '03',
      title: 'SQL + DBMS',
      category: 'Relational Database Engines',
      difficulty: 'INTERMEDIATE',
      duration: '3 Weeks (22 Hrs)',
      progress: 100,
      skills: ['Indexing & B-Trees', 'ACID Transactions', 'Query Tuning', 'Normalization'],
      completed: true,
    },
    {
      step: '04',
      title: 'React',
      category: 'Modern Interactive UI',
      difficulty: 'INTERMEDIATE',
      duration: '4 Weeks (30 Hrs)',
      progress: 67,
      skills: ['Server Components', 'Hooks & State', 'Tailwind CSS', 'Performance Optimization'],
      completed: false,
      current: true,
    },
    {
      step: '05',
      title: 'Backend Development',
      category: 'Spring Boot & Microservices',
      difficulty: 'ADVANCED',
      duration: '5 Weeks (38 Hrs)',
      progress: 0,
      skills: ['RESTful Architecture', 'JWT Authentication', 'Redis Caching', 'JPA / Hibernate'],
      completed: false,
    },
    {
      step: '06',
      title: 'Cloud Engineering',
      category: 'DevOps & Scalable Systems',
      difficulty: 'ADVANCED',
      duration: '4 Weeks (32 Hrs)',
      progress: 0,
      skills: ['Docker Orchestration', 'AWS Deployment', 'CI/CD Pipelines', 'System Design'],
      completed: false,
    },
  ];

  return (
    <section id="learning" className="py-24 px-3 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>DYNAMIC LEARNING TIMELINE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Your roadmap. <br className="hidden sm:inline" />
          Built by AI.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          An adaptive career roadmap calibrated to your technical strengths and target role, guiding you milestone by milestone from foundations to placement-ready mastery.
        </p>
      </div>

      {/* 6-Milestone Grid with Interactive Progress & Connecting Line Styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {milestones.map((m, idx) => (
          <motion.div
            key={m.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`p-6 sm:p-7 rounded-[26px] border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
              m.completed
                ? 'bg-gradient-to-br from-emerald-950/20 via-[#050814]/90 to-slate-950/80 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                : m.current
                ? 'bg-gradient-to-br from-indigo-950/30 via-[#050814]/95 to-purple-950/20 border-indigo-500/50 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                : 'bg-[#050814]/80 border-white/[0.07] hover:border-white/20'
            }`}
          >
            {/* Top Indicator */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black tracking-wider ${
                      m.completed
                        ? 'bg-emerald-500 text-slate-950'
                        : m.current
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                        : 'bg-slate-900 border border-white/10 text-slate-400'
                    }`}
                  >
                    {m.completed ? <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> : m.step}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Milestone {m.step}
                    </span>
                    <span className="text-[11px] text-indigo-300 font-semibold">{m.category}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    m.difficulty === 'ADVANCED'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : m.difficulty === 'INTERMEDIATE'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {m.difficulty}
                </span>
              </div>

              {/* Title & Progress Bar */}
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-200 transition">
                {m.title}
              </h3>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-[11px] text-slate-400 font-medium mb-1">
                  <span>Progress</span>
                  <span className={m.completed ? 'text-emerald-400 font-bold' : m.current ? 'text-indigo-300 font-bold' : 'text-slate-500'}>
                    {m.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      m.completed
                        ? 'bg-emerald-500'
                        : m.current
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        : 'bg-slate-800'
                    }`}
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {m.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-950 border border-white/[0.05] text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{m.duration}</span>
              </div>

              <span
                className={`text-[11px] font-bold ${
                  m.completed
                    ? 'text-emerald-400'
                    : m.current
                    ? 'text-indigo-400 flex items-center gap-1'
                    : 'text-slate-500'
                }`}
              >
                {m.completed ? '✓ Completed' : m.current ? 'In Progress ⚡' : 'Upcoming'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA to Open Full Interactive Roadmap */}
      <div className="mt-12 text-center">
        <OctagonalButton variant="border" href="/learning-path">
          Explore Complete Interactive Roadmap
        </OctagonalButton>
      </div>
    </section>
  );
}
