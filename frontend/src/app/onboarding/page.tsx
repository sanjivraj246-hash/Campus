'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/context/StudentContext';
import { Sparkles, ArrowRight, Check, Target, Code, Github, Linkedin, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OnboardingPage() {
  const router = useRouter();
  const { student, updateStudent } = useStudent();

  const [step, setStep] = useState(1);
  const [targetCareer, setTargetCareer] = useState(student.targetCareer || 'Full Stack Developer');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'React / Next.js', 'JavaScript / TypeScript', 'Java', 'PostgreSQL', 'Data Structures & Algorithms'
  ]);
  const [githubUrl, setGithubUrl] = useState(student.githubUrl || 'https://github.com/aaravpatel');
  const [linkedinUrl, setLinkedinUrl] = useState(student.linkedinUrl || 'https://linkedin.com/in/aaravpatel');
  const [portfolioUrl, setPortfolioUrl] = useState(student.portfolioUrl || 'https://aaravpatel.dev');

  const availableSkills = [
    'React / Next.js', 'JavaScript / TypeScript', 'Java', 'Spring Boot', 'Python',
    'FastAPI', 'C++', 'Node.js / Express', 'PostgreSQL', 'MongoDB', 'Redis',
    'Docker & Kubernetes', 'AWS Cloud', 'Data Structures & Algorithms', 'System Design'
  ];

  const targetRoles = [
    { title: 'Full Stack Developer', desc: 'React, Node.js, Spring Boot, PostgreSQL, Cloud' },
    { title: 'Software Engineer', desc: 'DSA, System Design, Java/C++, Concurrency' },
    { title: 'Cloud Engineer', desc: 'AWS, Kubernetes, Terraform, CI/CD, Linux' },
    { title: 'AI Engineer', desc: 'PyTorch, Transformers, LLMs, NLP, FastAPI' },
    { title: 'Data Analyst', desc: 'SQL, Python, PowerBI, Statistical Modeling' },
    { title: 'DevOps Engineer', desc: 'Docker, Kubernetes, AWS, Prometheus, Shell' },
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleFinish = () => {
    updateStudent({
      targetCareer,
      githubUrl,
      linkedinUrl,
      portfolioUrl,
      technicalSkillScore: Math.min(95, selectedSkills.length * 10 + 35)
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#080c16] flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white relative overflow-hidden py-12">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header with Step Progress */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Calibration &amp; Profile Setup</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Let&apos;s Build Your Career Roadmap</h2>
          <p className="text-xs text-slate-400 mt-1">Calibrating your personal AI Career Readiness Engine</p>

          {/* Steps Indicator */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    step === s
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50 ring-2 ring-indigo-400/50'
                      : step > s
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                </div>
                <span className={`text-xs font-semibold hidden sm:inline ${step === s ? 'text-white' : 'text-slate-500'}`}>
                  {s === 1 ? 'Career Goal' : s === 2 ? 'Skills Matrix' : 'Online Presence'}
                </span>
                {s < 3 && <span className="w-6 h-0.5 bg-slate-800 hidden sm:inline-block" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* STEP 1: TARGET CAREER */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-400" />
                  Select Your Primary Career Goal
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  AI will benchmark your preparation against MNC requirements for this role
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {targetRoles.map((role, idx) => (
                  <div
                    key={idx}
                    onClick={() => setTargetCareer(role.title)}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      targetCareer === role.title
                        ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{role.title}</h4>
                      {targetCareer === role.title && (
                        <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{role.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5"
                >
                  <span>Next: Technical Skills</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SKILLS SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  Select Your Current Proficiencies
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click to toggle technologies and frameworks you have worked with
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {availableSkills.map((skill, idx) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/60 shadow-sm'
                          : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-indigo-400" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5"
                >
                  <span>Next: Online Profiles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ONLINE PRESENCE */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Github className="w-4 h-4 text-cyan-400" />
                  Portfolio &amp; Social Links
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Link your profiles for automated recruiter evaluation and repository audits
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Profile URL</label>
                  <div className="relative">
                    <Github className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile URL</label>
                  <div className="relative">
                    <Linkedin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Portfolio or Project Website</label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://yourportfolio.dev"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Calibrate &amp; Launch Dashboard</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
