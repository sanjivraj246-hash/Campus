'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import { simulateSkillGap, ROLE_REQUIREMENTS } from '@/lib/aiSimulator';
import {
  Cpu, Target, Sparkles, CheckCircle2, AlertCircle,
  TrendingUp, Plus, ArrowRight, ShieldAlert, Award
} from 'lucide-react';
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar
} from 'recharts';

export default function SkillGapPage() {
  const { student, skills, addSkill } = useStudent();

  const [targetRole, setTargetRole] = useState(student.targetCareer || 'Full Stack Developer');
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'PROGRAMMING' | 'FRAMEWORK' | 'DATABASE' | 'CLOUD_DEVOPS' | 'AI_ML' | 'CORE_CS' | 'SOFT_SKILLS'>('FRAMEWORK');
  const [newSkillLevel, setNewSkillLevel] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'>('INTERMEDIATE');

  const currentSkillNames = skills.map(s => s.name);
  const gapReport = simulateSkillGap(currentSkillNames, targetRole);

  const radarData = gapReport.skillGaps.map(g => ({
    skill: g.skillName.split('/')[0].trim(),
    match: g.currentLevel.includes('Advanced') ? 95 : g.currentLevel.includes('Good') || g.currentLevel.includes('Intermediate') ? 75 : 30,
    required: 90
  }));

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill(newSkillName.trim(), newSkillCategory, newSkillLevel);
    setNewSkillName('');
    setShowAddSkillModal(false);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">AI Skill-Gap Analyzer</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Benchmark your technical stack against top tech hiring matrices &amp; close missing gaps
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddSkillModal(true)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>

            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="px-4 py-2 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-bold outline-none focus:border-indigo-400"
            >
              {Object.keys(ROLE_REQUIREMENTS).map((role, idx) => (
                <option key={idx} value={role} className="bg-slate-900 text-white">
                  Target: {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400">Role Match Score</span>
              <div className="text-4xl font-extrabold text-white mt-1">
                {gapReport.overallMatchPercentage}%
              </div>
              <p className="text-xs text-emerald-400 mt-1">
                {gapReport.strongSkills.length} of {gapReport.skillGaps.length} skills mastered
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Award className="w-7 h-7" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400">Critical Priority Gaps</span>
              <div className="text-4xl font-extrabold text-rose-400 mt-1">
                {gapReport.skillGaps.filter(g => g.priority === 'CRITICAL').length}
              </div>
              <p className="text-xs text-slate-400 mt-1">Immediate focus needed</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-7 h-7" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400">Verified Proficiencies</span>
              <div className="text-4xl font-extrabold text-cyan-400 mt-1">
                {skills.filter(s => s.verified).length}
              </div>
              <p className="text-xs text-slate-400 mt-1">Portfolio verified</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* 2-Column: Radar Comparison Chart + Skill Gaps Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 4 Cols: Radar Competency */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Industry Skill Match Matrix
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Current skills vs required {targetRole} standard
              </p>

              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fontSize: 9 }} />
                    <PolarRadiusAxis domain={[0, 100]} stroke="#475569" />
                    <Radar
                      name="Required Level"
                      dataKey="required"
                      stroke="#818cf8"
                      fill="#818cf8"
                      fillOpacity={0.15}
                    />
                    <Radar
                      name="Your Level"
                      dataKey="match"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.45}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
              <p>{gapReport.readinessSummary}</p>
            </div>
          </div>

          {/* Right 8 Cols: Detailed Skill Gap Comparison */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                <span>Detailed Skill-by-Skill Gap Analysis</span>
                <span className="text-xs text-indigo-400 font-semibold">{targetRole}</span>
              </h3>

              <div className="space-y-3">
                {gapReport.skillGaps.map((gap, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{gap.skillName}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            gap.priority === 'CRITICAL'
                              ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                              : gap.priority === 'HIGH'
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {gap.priority} Priority
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-400">
                          Current: <strong className="text-slate-200">{gap.currentLevel}</strong>
                        </span>
                        <span className="text-slate-500">→</span>
                        <span className="text-indigo-400 font-semibold">
                          Required: {gap.requiredLevel}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      💡 {gap.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Skill Modal */}
        {showAddSkillModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95">
              <h3 className="text-base font-bold text-white mb-1">Add Technical Skill</h3>
              <p className="text-xs text-slate-400 mb-4">Add a new skill to calibrate your profile</p>

              <form onSubmit={handleCreateSkill} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name</label>
                  <input
                    type="text"
                    required
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g. Redis, Docker, System Design"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none"
                  >
                    <option value="PROGRAMMING">Programming Language</option>
                    <option value="FRAMEWORK">Framework / Library</option>
                    <option value="DATABASE">Database / Caching</option>
                    <option value="CLOUD_DEVOPS">Cloud &amp; DevOps</option>
                    <option value="CORE_CS">Core Computer Science</option>
                    <option value="AI_ML">AI &amp; Machine Learning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Proficiency Level</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none"
                  >
                    <option value="BEGINNER">Beginner (Foundational)</option>
                    <option value="INTERMEDIATE">Intermediate (Built Projects)</option>
                    <option value="ADVANCED">Advanced (Production Experience)</option>
                    <option value="EXPERT">Expert (Deep Internals &amp; Tuning)</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddSkillModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25"
                  >
                    Save &amp; Recalibrate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
