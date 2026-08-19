'use client';

import React, { useState, useRef, useEffect } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import { simulateCareerMentorChat } from '@/lib/aiSimulator';
import {
  Bot, Send, Sparkles, User, ArrowRight,
  RefreshCw, MessageSquare, Lightbulb, Zap
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function CareerMentorPage() {
  const { student } = useStudent();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello ${student.fullName}! I am your **CampusAI Career Mentor**. 

I have analyzed your profile:
- 🎯 **Target Career:** ${student.targetCareer}
- 📈 **Career Readiness Score:** ${student.careerReadinessScore}/100
- 🎓 **CGPA:** ${student.cgpa.toFixed(2)} (${student.department})

How can I help accelerate your placement preparation today? Ask me about skill gaps, project roadmaps, ATS resume tuning, or MNC interview strategies!`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [followups, setFollowups] = useState<string[]>([
    'What skills should I learn for an MNC?',
    'How can I improve my resume ATS score?',
    'What projects will make me stand out?',
    'Am I ready for campus placements?'
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = simulateCareerMentorChat(
        text,
        student.fullName,
        student.targetCareer,
        student.cgpa,
        student.careerReadinessScore
      );

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setFollowups(response.followups);
      setIsTyping(false);
    }, 700);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-slate-900/90 via-purple-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                CampusAI Career Mentor
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  Online
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Personalized career guidance grounded in your CGPA, skill matrix, and target role
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'reset',
                    role: 'assistant',
                    content: `Session restarted. How can I help you with your ${student.targetCareer} preparation?`,
                    timestamp: 'Just now'
                  }
                ]);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Chat</span>
            </button>
          </div>
        </div>

        {/* Chat Window */}
        <div className="rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl flex flex-col h-[600px] overflow-hidden">
          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-md shadow-indigo-500/20">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-500/25'
                      : 'bg-slate-950/80 text-slate-200 border border-slate-800 rounded-tl-none prose prose-invert prose-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                  <span className={`text-[9px] mt-2 block font-medium ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <img
                    src={student.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'}
                    alt={student.fullName}
                    className="w-8 h-8 rounded-xl object-cover ring-1 ring-indigo-500/50 flex-shrink-0 mt-1"
                  />
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/30 flex items-center justify-center text-indigo-400">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-200" />
                  </span>
                  <span>CampusAI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="p-3 bg-slate-950/60 border-t border-slate-800/80">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
                <Zap className="w-3 h-3 text-amber-400" />
                Quick Prompts:
              </span>
              {followups.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-indigo-500/40 text-[11px] whitespace-nowrap transition"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything (e.g. 'What skills should I learn next?', 'How to prepare for Amazon?')..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white text-xs outline-none transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5 disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
