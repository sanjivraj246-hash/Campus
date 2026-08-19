'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import { simulateResumeAnalysis } from '@/lib/aiSimulator';
import { ResumeAnalysisResult } from '@/types';
import {
  FileText, UploadCloud, Sparkles, CheckCircle2,
  AlertTriangle, XCircle, Download, ArrowRight,
  ShieldCheck, RefreshCw, Cpu, Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResumeAnalyzerPage() {
  const { student, updateStudent } = useStudent();

  const [resumeText, setResumeText] = useState(
`Aarav Patel | Full Stack Developer | aarav.patel@student.campusiq.edu | +91 91234 56789
EDUCATION: B.Tech Computer Science (2023 - 2027) - CGPA: 8.85 / 10.0
TECHNICAL SKILLS: React, Next.js, JavaScript, TypeScript, Java, Spring Boot basics, PostgreSQL, Tailwind CSS, Git
PROJECTS:
1. DevFlow - Real-Time Developer Collaboration Hub (React, Node.js, WebSockets, MongoDB) - Real-time code editor with sub-50ms latency.
2. AI Campus Portal - Smart notes search with vector embeddings and Next.js frontend.
INTERNSHIPS: Web Developer Intern at TechNova Solutions (3 months) - Built responsive client dashboard, reducing page load latency by 35%.`
  );
  const [targetRole, setTargetRole] = useState(student.targetCareer || 'Full Stack Developer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(() =>
    simulateResumeAnalysis(resumeText, targetRole, student.cgpa)
  );

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = simulateResumeAnalysis(resumeText, targetRole, student.cgpa);
      setAnalysis(result);
      setIsAnalyzing(false);

      // Dynamically boost student's resume score
      updateStudent({ resumeScore: result.overallScore });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 900);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate file reading
      const fakeUploadedText = `Resume of ${student.fullName} for ${targetRole}
Education: B.Tech Computer Science, CGPA: ${student.cgpa}
Skills: React, TypeScript, Java, Spring Boot, PostgreSQL, Docker, Git, Algorithms
Projects:
- AI Resume & ATS Platform (FastAPI, React, spaCy)
- Campus Emergency System (Next.js, WebSockets, PostgreSQL)
Experience: Software Intern - Engineered REST APIs and improved database performance.`;
      setResumeText(fakeUploadedText);
    }
  };

  const handleDownloadOptimized = () => {
    if (!analysis) return;
    const blob = new Blob([analysis.optimizedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${student.fullName.replace(/\s+/g, '_')}_Optimized_Resume.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">AI Resume &amp; ATS Analyzer</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Deep NLP keyword matching, ATS score auditing, and automated resume structural optimization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-semibold outline-none focus:border-indigo-500"
            >
              <option value="Full Stack Developer">Role: Full Stack Dev</option>
              <option value="Software Engineer">Role: Software Engineer</option>
              <option value="Cloud Engineer">Role: Cloud Engineer</option>
              <option value="AI Engineer">Role: AI Engineer</option>
              <option value="Data Analyst">Role: Data Analyst</option>
              <option value="DevOps Engineer">Role: DevOps Engineer</option>
            </select>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing with AI...' : 'Re-Analyze Resume'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Input / Upload vs AI Report */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 5 Cols: Resume Input or File Upload */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-indigo-400" />
                  Upload Resume or Paste Text
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Supports PDF, DOCX, TXT formats or directly editable text
                </p>

                {/* File Upload Box */}
                <label className="block p-4 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/60 bg-slate-950/40 text-center cursor-pointer transition mb-4">
                  <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} className="hidden" />
                  <UploadCloud className="w-6 h-6 text-indigo-400 mx-auto mb-1.5" />
                  <span className="text-xs font-semibold text-white block">Click to upload resume file</span>
                  <span className="text-[10px] text-slate-400">PDF, DOCX up to 10MB</span>
                </label>

                {/* Paste Area */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Parsed Resume Content
                  </label>
                  <textarea
                    rows={12}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-white font-mono text-xs outline-none leading-relaxed resize-none"
                    placeholder="Paste resume markdown or plain text..."
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>{resumeText.split(/\s+/).filter(Boolean).length} words</span>
                <button
                  onClick={handleAnalyze}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>Run Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Analysis Report */}
          <div className="lg:col-span-7 space-y-6">
            {analysis && (
              <>
                {/* Score Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Overall Score */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900/80 border border-indigo-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                        Resume Quality Score
                      </div>
                      <div className="text-3xl font-extrabold text-white mt-1">
                        {analysis.overallScore}<span className="text-lg text-slate-500 font-normal">/100</span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-1">
                        Benchmark against {targetRole} standards
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                      <Award className="w-7 h-7" />
                    </div>
                  </div>

                  {/* ATS Score */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-900/80 border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        ATS Compatibility
                      </div>
                      <div className="text-3xl font-extrabold text-white mt-1">
                        {analysis.atsCompatibilityScore}<span className="text-lg text-slate-500 font-normal">/100</span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-1">
                        Parser Readability Index
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                  </div>
                </div>

                {/* Extracted Skills Badges */}
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span>Identified Technical Skills</span>
                    <span className="text-indigo-400 font-semibold">{analysis.extractedSkills.length} Detected</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.extractedSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 text-xs font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4 Report Sections: Strengths, Weaknesses, Missing Skills, ATS Suggestions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Key Strengths
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {analysis.strengths.map((st, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      Weaknesses to Fix
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {analysis.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Skills */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      Missing High-Impact Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.missingSkills.map((ms, i) => (
                        <span key={i} className="px-2 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/25 text-xs font-medium">
                          + {ms}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ATS Suggestions */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      ATS Parsing Tips
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {analysis.atsSuggestions.slice(0, 2).map((ats, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                          <span>{ats}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Download Optimized Template Banner */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-purple-950/60 to-slate-900/80 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Download className="w-4 h-4 text-indigo-400" />
                      Download Improved ATS Resume Template
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Pre-formatted Markdown structure calibrated for {targetRole} recruiters
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadOptimized}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download (.md)</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
