'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Sparkles, Trophy, ArrowRight, Layers, Cpu, Radio, Calendar, Activity } from 'lucide-react';
import Link from 'next/link';
import OctagonalButton from './OctagonalButton';

export default function ProjectRecommendationsSection() {
  const projects = [
    {
      title: 'AI Resume Analyzer',
      category: 'Natural Language Processing',
      difficulty: 'INTERMEDIATE',
      duration: '3 Weeks',
      techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Vector Embeddings'],
      impact: '+35% Recruiter Shortlisting Rate',
      description: 'Addresses automated HR screening at scale with real-time vector embeddings, PDF token parsing, and ATS score benchmarking.',
      icon: Layers,
    },
    {
      title: 'Campus Emergency Platform',
      category: 'Distributed Real-Time Systems',
      difficulty: 'ADVANCED',
      duration: '4 Weeks',
      techStack: ['Next.js', 'Socket.io', 'Redis Pub/Sub', 'PostGIS', 'Docker'],
      impact: 'Tier-1 System Design Showcase',
      description: 'Proves concurrency mastery with sub-50ms WebSocket telemetry, real-time geolocation dispatching, and distributed pub/sub channels.',
      icon: Radio,
    },
    {
      title: 'AI Interview Simulator',
      category: 'Conversational AI & Audio',
      difficulty: 'ADVANCED',
      duration: '4 Weeks',
      techStack: ['Next.js', 'Web Speech API', 'Python', 'FastAPI', 'NLP Grading'],
      impact: 'Full-Stack Technical Interview Portfolio',
      description: 'Showcases end-to-end full-stack AI evaluation with live voice transcription, dynamic response scoring, and model grading.',
      icon: Cpu,
    },
    {
      title: 'Cloud Attendance Platform',
      category: 'Enterprise Cloud Architecture',
      difficulty: 'INTERMEDIATE',
      duration: '3 Weeks',
      techStack: ['Spring Boot 3', 'Docker', 'PostgreSQL', 'AWS ECS', 'JWT Auth'],
      impact: 'Core Backend Scalability Portfolio',
      description: 'Demonstrates robust JPA relational modeling, JWT stateless auth, geofencing validation, and automated attendance forecasting.',
      icon: Calendar,
    },
    {
      title: 'Student Skill Intelligence System',
      category: 'Career Intelligence & ML',
      difficulty: 'ADVANCED',
      duration: '4 Weeks',
      techStack: ['Next.js', 'Spring Boot', 'PostgreSQL', 'Recharts', 'Docker'],
      impact: 'Product Analytics & Data Engineering',
      description: 'Computes multi-dimensional student competency scores against Tier-1 MNC hiring standards with automated gap diagnostics.',
      icon: Activity,
    },
  ];

  return (
    <section id="projects" className="py-24 px-3 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300">
          <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
          <span>PRODUCTION-GRADE CAPSTONES</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Build projects that <br className="hidden sm:inline" />
          move your career forward.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Skip generic to-do apps. Build high-leverage production systems that impress senior engineering managers and recruiters at top technology companies.
        </p>
      </div>

      {/* 5-Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, idx) => {
          const IconComponent = p.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-7 rounded-[26px] bg-[#050814]/90 border border-white/[0.08] hover:border-indigo-500/40 hover:-translate-y-2 transition-all duration-400 shadow-2xl flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle hover background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 group-hover:bg-indigo-500/15 rounded-full blur-2xl transition-all pointer-events-none" />

              <div>
                {/* Meta Top */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      p.difficulty === 'ADVANCED'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {p.difficulty} • {p.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition duration-200 mb-2">
                  {p.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {p.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-950/80 text-slate-300 border border-white/[0.06] group-hover:border-indigo-500/20 transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Impact & Action */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{p.impact}</span>
                </span>

                <Link
                  href="/projects"
                  className="text-xs font-bold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1 transition"
                >
                  <span>View Spec</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition duration-300" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <OctagonalButton variant="primary" href="/projects">
          Browse All Capstone Projects
        </OctagonalButton>
      </div>
    </section>
  );
}
