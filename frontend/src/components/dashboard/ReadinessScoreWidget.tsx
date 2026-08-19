'use client';

import React from 'react';
import Link from 'next/link';
import { useStudent } from '@/context/StudentContext';
import {
  Sparkles, TrendingUp, ArrowUpRight, CheckCircle2,
  AlertCircle, ShieldCheck, Zap, Compass, Code2, MessagesSquare
} from 'lucide-react';
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar
} from 'recharts';

export default function ReadinessScoreWidget() {
  const { student } = useStudent();

  const score = student.careerReadinessScore;

  const getTier = (s: number) => {
    if (s >= 85) return { label: 'Elite Tier - MNC Ready', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
    if (s >= 70) return { label: 'Tier-1 Placement Ready', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
    if (s >= 55) return { label: 'Intermediate Progress', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
    return { label: 'Foundational Stage', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' };
  };

  const tier = getTier(score);

  const radarData = [
    { subject: 'Tech Skills (25%)', value: student.technicalSkillScore, fullMark: 100 },
    { subject: 'DSA & Coding (20%)', value: student.dsaScore, fullMark: 100 },
    { subject: 'Projects (15%)', value: student.projectsScore, fullMark: 100 },
    { subject: 'Academics (10%)', value: student.academicScore, fullMark: 100 },
    { subject: 'Resume ATS (10%)', value: student.resumeScore, fullMark: 100 },
    { subject: 'Interview (10%)', value: student.interviewScore, fullMark: 100 },
    { subject: 'Certs (10%)', value: student.certificationsScore, fullMark: 100 },
  ];

  const breakdown = [
    { name: 'Technical Skills', weight: '25%', score: student.technicalSkillScore, href: '/skill-gap', color: 'bg-indigo-500' },
    { name: 'DSA & Coding Practice', weight: '20%', score: student.dsaScore, href: '/coding', color: 'bg-purple-500' },
    { name: 'Project Portfolio', weight: '15%', score: student.projectsScore, href: '/projects', color: 'bg-cyan-500' },
    { name: 'Academic & CGPA', weight: '10%', score: student.academicScore, href: '/academics', color: 'bg-emerald-500' },
    { name: 'Resume ATS Score', weight: '10%', score: student.resumeScore, href: '/resume-analyzer', color: 'bg-amber-500' },
    { name: 'Interview Simulator', weight: '10%', score: student.interviewScore, href: '/interview', color: 'bg-rose-500' },
    { name: 'Certifications', weight: '10%', score: student.certificationsScore, href: '/learning-path', color: 'bg-blue-500' },
  ];

  // Dynamic next 3 improvements
  const improvements = [
    {
      title: 'Accelerate DSA Problem Solving',
      score: student.dsaScore,
      action: 'Solve 15 Tree & Graph problems on Coding Playground',
      href: '/coding',
      icon: Code2,
      priority: 'High Priority'
    },
    {
      title: 'Practice AI Mock Interviews',
      score: student.interviewScore,
      action: 'Complete 2 Technical & Behavioral mock simulation rounds',
      href: '/interview',
      icon: MessagesSquare,
      priority: 'Recommended'
    },
    {
      title: 'Advance Learning Path Roadmap',
      score: student.technicalSkillScore,
      action: 'Complete Month 3: Spring Boot & Enterprise Architecture',
      href: '/learning-path',
      icon: Compass,
      priority: 'Next Milestone'
    }
  ];

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/40 border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                AI Career Readiness Engine
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${tier.bg} ${tier.color} ${tier.border}`}>
                  {tier.label}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-factor composite intelligence calculated across 7 placement pillars
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-400">Target Role</div>
            <div className="text-sm font-bold text-white">{student.targetCareer}</div>
          </div>
          <Link
            href="/learning-path"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5"
          >
            <span>View Roadmap</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Center Grid: Circular Gauge + Radar Chart + Breakdown Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 relative z-10 items-center">
        {/* Left: Huge Score Circle */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Progress Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-indigo-500 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * score) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white tracking-tight">{score}</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">out of 100</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-slate-300 font-medium">
              You are in the <strong className="text-indigo-300 font-bold">Top 8%</strong> of 3rd year engineering candidates!
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+6% readiness boost this month</span>
            </div>
          </div>
        </div>

        {/* Center: Radar Chart Breakdown */}
        <div className="lg:col-span-4 h-64 flex flex-col items-center justify-center p-2 rounded-2xl bg-slate-950/40 border border-slate-800/60">
          <div className="text-xs font-semibold text-slate-400 mb-1">Pillar Competency Radar</div>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar
                  name="Student Score"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Weighted Score Breakdown Bars */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            7-Factor Score Distribution
          </div>
          {breakdown.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group block p-2 rounded-xl bg-slate-950/40 hover:bg-slate-900/90 border border-slate-800/60 hover:border-indigo-500/40 transition"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium group-hover:text-indigo-300 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  {item.name} <span className="text-[10px] text-slate-400">({item.weight})</span>
                </span>
                <span className="font-bold text-white">{item.score}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section: Top 3 Things to Improve Next */}
      <div className="mt-8 pt-6 border-t border-slate-800/80 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Top 3 Recommended Actions to Hit 90+ Score
          </h3>
          <span className="text-xs text-slate-400">AI Priority Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {improvements.map((imp, idx) => {
            const Icon = imp.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {imp.priority}
                    </span>
                    <span className="text-xs font-bold text-slate-400">Current: {imp.score}%</span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition">
                    {imp.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {imp.action}
                  </p>
                </div>

                <Link
                  href={imp.href}
                  className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  <span>Take Action Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
