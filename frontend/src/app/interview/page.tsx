'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import { simulateEvaluateAnswer } from '@/lib/aiSimulator';
import { InterviewQuestion, InterviewEvaluation } from '@/types';
import {
  MessagesSquare, Mic, Play, Sparkles, CheckCircle2,
  AlertTriangle, RefreshCw, Award, ArrowRight, ShieldCheck,
  Zap, Volume2, MicOff
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InterviewSimulatorPage() {
  const { student, updateStudent } = useStudent();

  const [mode, setMode] = useState<'TECHNICAL' | 'HR' | 'BEHAVIORAL' | 'RESUME_BASED'>('TECHNICAL');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);
  const [history, setHistory] = useState<{ question: string; answer: string; eval: InterviewEvaluation }[]>([]);

  const questions: Record<string, InterviewQuestion[]> = {
    TECHNICAL: [
      {
        id: 1,
        question: `Explain how you would architect a high-throughput REST API for ${student.targetCareer} with 50,000 requests/sec. How do you handle database connections and caching?`,
        category: 'System Design & Distributed Scalability',
        expectedConcepts: ['Horizontal scaling', 'Redis caching', 'HikariCP connection pooling', 'Load balancing'],
        hint: 'Mention Cache-Aside pattern, connection pooling, and message brokers.'
      },
      {
        id: 2,
        question: 'What is the fundamental difference between optimistic and pessimistic concurrency control in database transactions? When would you choose one over the other?',
        category: 'Database Management & ACID',
        expectedConcepts: ['Version column', 'Lock contention', 'Deadlocks', 'Throughput trade-offs'],
        hint: 'Contrast high-contention airline booking with read-heavy feed platforms.'
      },
      {
        id: 3,
        question: 'How does the JavaScript event loop handle microtasks vs macrotasks, and how does React 18 automatic batching leverage this?',
        category: 'Frontend & Runtime Architecture',
        expectedConcepts: ['Call Stack', 'Microtask Queue (Promises)', 'Macrotask Queue (setTimeout)', 'State Batching'],
        hint: 'Trace Promise.then vs setTimeout execution order.'
      }
    ],
    HR: [
      {
        id: 1,
        question: 'Tell me about a time you faced a difficult conflict or technical disagreement with a teammate. How did you resolve it?',
        category: 'Conflict Resolution & Teamwork',
        expectedConcepts: ['STAR format', 'Objective data evaluation', 'Empathy & listening', 'Unified delivery'],
        hint: 'Describe the technical disagreement, pros/cons evaluated, and final outcome.'
      },
      {
        id: 2,
        question: 'Where do you see yourself in 3 to 5 years as an engineer, and why are you interested in joining our company?',
        category: 'Career Vision & Drive',
        expectedConcepts: ['Technical depth', 'System ownership', 'Mentorship', 'Company alignment'],
        hint: 'Balance individual contributor depth with collaborative impact.'
      }
    ],
    BEHAVIORAL: [
      {
        id: 1,
        question: 'Describe your biggest technical failure or project setback in college. What root cause analysis did you perform, and what did you learn?',
        category: 'Resilience & Growth Mindset',
        expectedConcepts: ['Honest ownership', 'Root cause analysis', 'Preventative safeguards'],
        hint: 'Highlight what test automation or monitoring you implemented afterward.'
      }
    ],
    RESUME_BASED: [
      {
        id: 1,
        question: `Looking at your project portfolio (${student.targetCareer}), what was the single hardest architectural bottleneck you personally engineered?`,
        category: 'Portfolio Deep Dive',
        expectedConcepts: ['Latency optimization', 'Concurrency', 'Security & Authentication', 'Database query tuning'],
        hint: 'Walk through your benchmarks and how you verified improvements.'
      }
    ]
  };

  const activeQuestionList = questions[mode] || questions.TECHNICAL;
  const currentQ = activeQuestionList[currentQuestionIdx] || activeQuestionList[0];

  const handleEvaluate = () => {
    if (!studentAnswer.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      const result = simulateEvaluateAnswer(currentQ.question, studentAnswer, student.targetCareer);
      setEvaluation(result);
      setHistory(prev => [{ question: currentQ.question, answer: studentAnswer, eval: result }, ...prev]);
      setIsEvaluating(false);

      // Dynamically boost interview score
      const newInterviewScore = Math.min(100, Math.max(student.interviewScore, result.score));
      updateStudent({ interviewScore: newInterviewScore });

      if (result.score >= 80) {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }, 800);
  };

  const handleNextQuestion = () => {
    setStudentAnswer('');
    setEvaluation(null);
    setCurrentQuestionIdx((prev) => (prev + 1) % activeQuestionList.length);
  };

  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your answer.');
      return;
    }
    setIsRecording(!isRecording);
    if (!isRecording) {
      setStudentAnswer((prev) => prev + (prev ? ' ' : '') + 'In a high throughput architecture, I would decouple the application into microservices using Spring Boot and configure Redis caching for sub-5ms lookups...');
    }
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-rose-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <MessagesSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                AI Interview Simulator
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  Readiness: {student.interviewScore}%
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Practice Technical, HR, Behavioral, and Resume-specific questions with real-time AI scoring
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
            {(['TECHNICAL', 'HR', 'BEHAVIORAL', 'RESUME_BASED'] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setCurrentQuestionIdx(0);
                  setStudentAnswer('');
                  setEvaluation(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  mode === m
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Grid: Question & Answer Playground vs Real-Time AI Grading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 6 Cols: Question & Answer Input */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                  <span className="text-rose-400 uppercase tracking-wider">{currentQ.category}</span>
                  <span>Question {currentQuestionIdx + 1} of {activeQuestionList.length}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  &ldquo;{currentQ.question}&rdquo;
                </h3>

                {currentQ.hint && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Interviewer Hint:</strong> {currentQ.hint}</span>
                  </div>
                )}

                {/* Answer Area */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-300">Your Verbal / Text Response</label>
                    <button
                      type="button"
                      onClick={toggleSpeechRecognition}
                      className={`text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                        isRecording
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>{isRecording ? 'Listening...' : 'Voice Answer'}</span>
                    </button>
                  </div>

                  <textarea
                    rows={8}
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    placeholder="Type or dictate your technical response using the STAR method..."
                    className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-rose-500 text-white text-xs outline-none leading-relaxed resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
                >
                  Skip Question
                </button>

                <button
                  type="button"
                  onClick={handleEvaluate}
                  disabled={!studentAnswer.trim() || isEvaluating}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-rose-500/25 transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Zap className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                  <span>{isEvaluating ? 'AI Evaluating...' : 'Submit & Grade Answer'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: AI Real-Time Feedback & Model Answer */}
          <div className="lg:col-span-6 space-y-6">
            {evaluation ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6 animate-in fade-in">
                {/* Score & Confidence */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-950/80 to-amber-950/40 border border-rose-500/30">
                  <div>
                    <div className="text-xs font-semibold text-rose-300 uppercase tracking-wider">Answer Score</div>
                    <div className="text-3xl font-extrabold text-white mt-0.5">
                      {evaluation.score}<span className="text-base text-slate-500 font-normal">/100</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Confidence Rating</span>
                    <span className="text-xs font-bold text-emerald-400 mt-0.5 inline-block">
                      {evaluation.confidenceRating}
                    </span>
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Recruiter Evaluation Feedback
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                    {evaluation.feedback}
                  </p>
                </div>

                {/* Missing Points */}
                <div>
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Points to Include Next Time
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {evaluation.missingPoints.map((mp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                        <span>{mp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Model Ideal Answer */}
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Model Placement-Grade Answer
                  </h4>
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20 text-xs text-slate-300 font-mono leading-relaxed">
                    {evaluation.improvedModelAnswer}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800/80 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                  <MessagesSquare className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white">Ready for Simulation</h4>
                <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                  Type or dictate your response to the question on the left. The AI Interviewer will grade your technical accuracy, terminology, and communication clarity in real time.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
