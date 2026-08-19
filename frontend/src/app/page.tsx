'use client';

import React from 'react';
import Link from 'next/link';
import SmoothScrollProvider from '@/components/landing/SmoothScrollProvider';
import LoadingScreen from '@/components/landing/LoadingScreen';
import LandingNavbar from '@/components/landing/LandingNavbar';
import CinematicHero from '@/components/landing/CinematicHero';
import InteractiveSkillAnalysis from '@/components/landing/InteractiveSkillAnalysis';
import InteractiveResumeScanner from '@/components/landing/InteractiveResumeScanner';
import AnimatedRoadmapSection from '@/components/landing/AnimatedRoadmapSection';
import ProjectRecommendationsSection from '@/components/landing/ProjectRecommendationsSection';
import CodingPracticeSection from '@/components/landing/CodingPracticeSection';
import AIInterviewSection from '@/components/landing/AIInterviewSection';
import CareerReadinessSection from '@/components/landing/CareerReadinessSection';
import PlacementPipelineSection from '@/components/landing/PlacementPipelineSection';
import HackathonsSection from '@/components/landing/HackathonsSection';
import AICareerMentorSection from '@/components/landing/AICareerMentorSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import CampusAIFooter from '@/components/landing/CampusAIFooter';
import { Sparkles, ArrowRight, ShieldCheck, Users, GraduationCap, Trophy, Code2, BookOpen, Layers, Terminal } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

export default function LandingPage() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
        {/* Loading Screen Overlay */}
        <LoadingScreen />

        {/* Dynamic Sticky Header */}
        <LandingNavbar />

        {/* 1. Cinematic Hero Section with Framed Desktop Container & Floating CampusAI Dashboard */}
        <CinematicHero />

        {/* 2. Interactive AI Skill Gap Matrix (Section 19) */}
        <InteractiveSkillAnalysis />

        {/* 3. Neural Resume Analyzer & ATS Scanner (Section 20) */}
        <InteractiveResumeScanner />

        {/* 4. Personalized 6-Milestone Roadmap (Section 21) */}
        <AnimatedRoadmapSection />

        {/* 5. Production Capstone Projects Hub (Section 22) */}
        <ProjectRecommendationsSection />

        {/* 6. Coding Practice Arena (Section 23) */}
        <CodingPracticeSection />

        {/* 7. AI Mock Interview Simulator (Section 24) */}
        <AIInterviewSection />

        {/* 8. AI Career Readiness Score Centerpiece (Section 25) */}
        <CareerReadinessSection />

        {/* 9. Accelerated Placement Pipeline (Section 26) */}
        <PlacementPipelineSection />

        {/* 10. Competitive Hackathons (Section 27) */}
        <HackathonsSection />

        {/* 11. AI Career Mentor (Section 28) */}
        <AICareerMentorSection />

        {/* 12. Quick Direct Project & Portal Launchpad */}
        <section className="py-20 px-3 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>DIRECT PLATFORM LAUNCHPAD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Launch Into Any CampusAI Module
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              All tools, compilers, simulators, and career portals are fully bound and ready for use
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            <Link
              href="/dashboard"
              className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.07] hover:border-indigo-500/50 hover:bg-indigo-950/20 transition-all duration-300 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-2.5 group-hover:scale-110 transition">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-indigo-200">Dashboard</span>
              <span className="text-[10px] text-slate-400">Hub Overview</span>
            </Link>

            <Link
              href="/resume-analyzer"
              className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.07] hover:border-cyan-500/50 hover:bg-cyan-950/20 transition-all duration-300 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2.5 group-hover:scale-110 transition">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-cyan-200">Resume ATS</span>
              <span className="text-[10px] text-slate-400">Score &amp; Audit</span>
            </Link>

            <Link
              href="/coding"
              className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.07] hover:border-purple-500/50 hover:bg-purple-950/20 transition-all duration-300 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2.5 group-hover:scale-110 transition">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-purple-200">DSA Arena</span>
              <span className="text-[10px] text-slate-400">Live Practice</span>
            </Link>

            <Link
              href="/interview"
              className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.07] hover:border-rose-500/50 hover:bg-rose-950/20 transition-all duration-300 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-2.5 group-hover:scale-110 transition">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-rose-200">Mock Interview</span>
              <span className="text-[10px] text-slate-400">AI Voice Sim</span>
            </Link>

            <Link
              href="/projects"
              className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.07] hover:border-amber-500/50 hover:bg-amber-950/20 transition-all duration-300 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2.5 group-hover:scale-110 transition">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-amber-200">Capstones</span>
              <span className="text-[10px] text-slate-400">Production Repos</span>
            </Link>

            <Link
              href="/career-mentor"
              className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.07] hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all duration-300 text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2.5 group-hover:scale-110 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-emerald-200">AI Mentor</span>
              <span className="text-[10px] text-slate-400">24/7 Guidance</span>
            </Link>
          </div>

          {/* Three Role Portals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Portal */}
            <div className="p-7 rounded-[26px] bg-[#050814]/90 border border-indigo-500/30 flex flex-col justify-between hover:border-indigo-500/60 transition duration-300 shadow-xl">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                  Student Perspective
                </span>
                <h3 className="text-base font-bold text-white mt-4 mb-2">Aarav Patel (Student)</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Career Readiness Score (78/100), AI Resume Optimizer, DSA Coding Assessment, Mock Interviews, and Hackathons.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-center shadow-lg shadow-indigo-500/25 transition"
              >
                Open Student Portal
              </Link>
            </div>

            {/* Faculty Portal */}
            <div className="p-7 rounded-[26px] bg-[#050814]/90 border border-amber-500/30 flex flex-col justify-between hover:border-amber-500/60 transition duration-300 shadow-xl">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  Faculty Portal
                </span>
                <h3 className="text-base font-bold text-white mt-4 mb-2">Prof. Priya Sharma (HOD CSE)</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Batch attendance updater, internal assessment marks entry, and AI at-risk student warnings.
                </p>
              </div>
              <Link
                href="/faculty"
                className="w-full py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs text-center transition"
              >
                Open Faculty Portal
              </Link>
            </div>

            {/* Admin Command */}
            <div className="p-7 rounded-[26px] bg-[#050814]/90 border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-500/60 transition duration-300 shadow-xl">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Dean / Admin Command
                </span>
                <h3 className="text-base font-bold text-white mt-4 mb-2">Dr. Vikram Malhotra (Dean)</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Global campus KPIs (1,450+ students), placement rate analytics, user management, and department metrics.
                </p>
              </div>
              <Link
                href="/admin"
                className="w-full py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs text-center transition"
              >
                Open Admin Command
              </Link>
            </div>
          </div>
        </section>

        {/* 13. Final Cinematic CTA (Section 29) */}
        <FinalCTASection />

        {/* 14. Minimalist Dark Footer (Section 30) */}
        <CampusAIFooter />

        <Toaster />
      </div>
    </SmoothScrollProvider>
  );
}
