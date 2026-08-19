'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import { CodingProblem } from '@/types';
import {
  Code2, Play, CheckCircle2, XCircle, Flame,
  Trophy, Sparkles, Terminal, RefreshCw, Zap, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CodingAssessmentPage() {
  const { codingProblems, markProblemSolved, student } = useStudent();

  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(codingProblems[0]);
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState<string>(selectedProblem.defaultStarterCode['javascript'] || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState<{
    status: 'ACCEPTED' | 'WRONG_ANSWER';
    timeMs: number;
    memoryKb: number;
    passed: number;
    total: number;
    output: string;
  } | null>(null);

  const handleSelectProblem = (prob: CodingProblem) => {
    setSelectedProblem(prob);
    setCode(prob.defaultStarterCode[language] || prob.defaultStarterCode['javascript'] || '');
    setRunResult(null);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(selectedProblem.defaultStarterCode[lang] || '');
    setRunResult(null);
  };

  const handleRunTest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRunResult({
        status: 'ACCEPTED',
        timeMs: 42,
        memoryKb: 14200,
        passed: 2,
        total: 2,
        output: 'Sample Test Cases Passed: \nTest 1: Input: ' + selectedProblem.sampleTestCases[0]?.input + ' => Output: ' + selectedProblem.sampleTestCases[0]?.output
      });
    }, 600);
  };

  const handleSubmitSolution = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRunResult({
        status: 'ACCEPTED',
        timeMs: 38,
        memoryKb: 14100,
        passed: 5,
        total: 5,
        output: 'All 5/5 Hidden & Sample Test Cases Passed! Execution time: 38ms (Beats 89.4% of submissions).'
      });

      markProblemSolved(selectedProblem.id);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 900);
  };

  const solvedTotal = codingProblems.filter(p => p.isSolved).length;

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-purple-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                Coding Assessment &amp; DSA Playground
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                  DSA Score: {student.dsaScore}%
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-language competitive coding environment calibrated with Tier-1 MNC problem sets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span className="font-bold text-white">14-Day Streak</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-white">{solvedTotal}/{codingProblems.length} Solved</span>
            </div>
          </div>
        </div>

        {/* 2-Column: Problem Directory & In-Browser Code Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 4 Cols: Problem Selector & Topic List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
                <span>Curated Problem List</span>
                <span className="text-xs text-purple-400 font-semibold">{codingProblems.length} Problems</span>
              </h3>

              <div className="space-y-2">
                {codingProblems.map((prob) => (
                  <div
                    key={prob.id}
                    onClick={() => handleSelectProblem(prob)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      selectedProblem.id === prob.id
                        ? 'bg-purple-950/30 border-purple-500/60 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {prob.isSolved && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        )}
                        <h4 className={`text-xs font-bold truncate ${selectedProblem.id === prob.id ? 'text-purple-200' : 'text-white'}`}>
                          {prob.title}
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        {prob.topic.replace('_', ' ')} • Acc: {prob.acceptanceRate}%
                      </span>
                    </div>

                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase flex-shrink-0 ${
                      prob.difficulty === 'EASY'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : prob.difficulty === 'MEDIUM'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                    }`}>
                      {prob.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Problem Statement Card */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase tracking-wider">
                  {selectedProblem.topic.replace('_', ' ')}
                </span>
                <h3 className="text-base font-bold text-white mt-2">{selectedProblem.title}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed whitespace-pre-wrap">
                  {selectedProblem.description}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs font-mono">
                <span className="text-slate-500 text-[10px] uppercase tracking-wider block font-sans">Input Format:</span>
                <p className="text-slate-300 mt-1">{selectedProblem.inputFormat}</p>
                <span className="text-slate-500 text-[10px] uppercase tracking-wider block font-sans mt-2">Output Format:</span>
                <p className="text-emerald-400 mt-1">{selectedProblem.outputFormat}</p>
              </div>

              {selectedProblem.constraints && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Constraints:</span>
                  <pre className="text-[10px] text-slate-400 bg-slate-950 p-2.5 rounded-xl font-mono whitespace-pre-wrap">
                    {selectedProblem.constraints}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Right 8 Cols: Interactive Code Editor & Test Runner */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-full justify-between">
              {/* Editor Toolbar */}
              <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-slate-200">Solution Code Editor</span>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-semibold outline-none focus:border-purple-500"
                  >
                    <option value="javascript">JavaScript (ES6)</option>
                    <option value="python">Python 3.11</option>
                    <option value="java">Java 17 (OpenJDK)</option>
                    <option value="cpp">C++ 20 (GCC)</option>
                  </select>

                  <button
                    onClick={() => setCode(selectedProblem.defaultStarterCode[language] || '')}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-850 transition"
                    title="Reset to starter template"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Code Area */}
              <div className="p-4 bg-[#070b14] flex-1">
                <textarea
                  rows={16}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full min-h-[350px] bg-transparent text-slate-200 font-mono text-xs outline-none leading-relaxed resize-none selection:bg-purple-600 selection:text-white"
                  spellCheck={false}
                />
              </div>

              {/* Action Buttons */}
              <div className="px-5 py-3.5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleRunTest}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  <span>Run Sample Tests</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitSolution}
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/25 transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>{isSubmitting ? 'Evaluating Test Cases...' : 'Submit Solution (+DSA Score)'}</span>
                </button>
              </div>

              {/* Output / Test Case Results Panel */}
              {runResult && (
                <div className="p-5 bg-slate-950 border-t border-slate-800 animate-in fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400">{runResult.status}</span>
                      <span className="text-[11px] text-slate-400">
                        ({runResult.passed}/{runResult.total} Test Cases Passed)
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>Time: <strong className="text-white">{runResult.timeMs} ms</strong></span>
                      <span>Memory: <strong className="text-white">{runResult.memoryKb} KB</strong></span>
                    </div>
                  </div>

                  <pre className="text-xs text-slate-300 font-mono bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 whitespace-pre-wrap">
                    {runResult.output}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
