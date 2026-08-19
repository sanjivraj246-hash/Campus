'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Sparkles, CheckCircle2, XCircle,
  AlertTriangle, RefreshCw, ShieldCheck, ArrowRight, UploadCloud,
  Check, Layers
} from 'lucide-react';
import OctagonalButton from './OctagonalButton';

export default function InteractiveResumeScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [atsScore, setAtsScore] = useState(82);
  const [activeStep, setActiveStep] = useState<number>(3); // 0: Upload, 1: Scanning, 2: Analysis, 3: ATS Score

  const handleTriggerScan = () => {
    setIsScanning(true);
    setActiveStep(1);
    setTimeout(() => {
      setActiveStep(2);
    }, 700);
    setTimeout(() => {
      setIsScanning(false);
      setActiveStep(3);
      setAtsScore(86);
    }, 1400);
  };

  const scanWorkflow = [
    { label: 'Upload Resume', num: 1 },
    { label: 'AI Scanning', num: 2 },
    { label: 'Resume Analysis', num: 3 },
    { label: 'ATS Score', num: 4 },
  ];

  return (
    <section id="resume" className="py-24 px-3 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>NEURAL RESUME ATS ENGINE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Your resume. <br className="hidden sm:inline" />
          Understood by AI.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Upload your resume and let our NLP parsing engine extract key competencies, identify keyword deficiencies, and optimize for Tier-1 applicant tracking systems.
        </p>
      </div>

      {/* 4-Step Sequence Indicator */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
        {scanWorkflow.map((step, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl border text-center transition-all duration-300 ${
              idx <= activeStep
                ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/5'
                : 'bg-slate-950/40 border-white/[0.05] text-slate-500'
            }`}
          >
            <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold mb-1 ${
              idx <= activeStep ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-500'
            }`}>
              {idx < activeStep ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.num}
            </div>
            <span className="text-xs font-bold block">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Main Grid: Left Simulated Resume / Right AI ATS Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left 6 Cols: Interactive Resume Doc with Scanning Line */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 rounded-[28px] bg-[#050814]/90 border border-white/[0.08] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-2xl"
        >
          {/* Animated Scanning Laser Beam */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] z-20 pointer-events-none opacity-85 animate-scanline" />

          {/* Doc Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="text-xs font-bold text-white block">Aarav_Patel_SoftwareEngineer.pdf</span>
                <span className="text-[10px] text-slate-400">Parsed: 1,240 Tokens • PDF/DOCX</span>
              </div>
            </div>

            <button
              onClick={handleTriggerScan}
              disabled={isScanning}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Re-Scan'}</span>
            </button>
          </div>

          {/* Detected Resume Sections */}
          <div className="space-y-3.5 pt-5 text-xs text-slate-300">
            {/* Skills Detected */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/[0.05]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                Skills Detected
              </span>
              <p className="text-[11px] text-slate-300 font-mono">
                React, Next.js, TypeScript, Java, Spring Boot 3, SQL, Docker, Git, REST APIs
              </p>
            </div>

            {/* Projects Detected */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/[0.05]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                Projects Detected
              </span>
              <p className="text-[11px] text-slate-300">
                • CampusAI Career Platform: Next.js + Spring Boot + Fast embeddings
              </p>
              <p className="text-[11px] text-slate-300">
                • Real-time Concurrency Engine: WebSocket telemetry &lt; 50ms
              </p>
            </div>

            {/* Experience Detected */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/[0.05]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                Experience Detected
              </span>
              <p className="text-[11px] text-slate-300">
                Software Engineering Intern @ TechNova (6 Months) — Optimized query latency by 35%
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right 6 Cols: ATS Score & AI Audit Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-4"
        >
          {/* ATS Score Centerpiece Card */}
          <div className="p-6 rounded-[28px] bg-gradient-to-br from-cyan-950/50 via-[#050814]/90 to-slate-950/80 border border-cyan-500/30 flex items-center justify-between shadow-xl">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-cyan-400 block">
                ATS SCORE
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                {atsScore} <span className="text-xl text-slate-500 font-normal">/ 100</span>
              </div>
              <p className="text-xs text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>High ATS Match for Software Engineer Roles</span>
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>

          {/* Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06]">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                Strengths
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Quantified business metrics (35% query speedup), strong project architecture, and clean formatting.
              </p>
            </div>

            {/* Weaknesses / Missing Keywords */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06]">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4" />
                Missing Keywords
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add: <strong className="text-amber-300">Redis caching</strong>, <strong className="text-amber-300">CI/CD pipelines</strong>, <strong className="text-amber-300">System Design</strong>.
              </p>
            </div>
          </div>

          {/* AI Recommendation Box */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-slate-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">AI Recommendations:</strong> Incorporate distributed caching metrics and container orchestration tokens to reach an ATS Score of 95+.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <OctagonalButton variant="primary" href="/resume-analyzer" className="w-full">
              Upload &amp; Optimize in Resume Analyzer
            </OctagonalButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
