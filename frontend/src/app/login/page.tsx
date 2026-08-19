'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, ArrowRight, Lock, Mail, UserCheck, ShieldCheck, GraduationCap } from 'lucide-react';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchRole } = useAuth();

  const [email, setEmail] = useState('aarav.patel@student.campusiq.edu');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const success = login(email, selectedRole);
      setIsLoading(false);
      if (success) {
        if (selectedRole === 'FACULTY') router.push('/faculty');
        else if (selectedRole === 'ADMIN') router.push('/admin');
        else router.push('/dashboard');
      } else {
        setError('Invalid credentials. Try using one of the 1-click demo accounts below.');
      }
    }, 600);
  };

  const handleQuickSelect = (presetEmail: string, role: UserRole) => {
    setEmail(presetEmail);
    setSelectedRole(role);
    switchRole(role);
    if (role === 'FACULTY') router.push('/faculty');
    else if (role === 'ADMIN') router.push('/admin');
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#080c16] flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              CampusAI
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Sign In to Your Account</h2>
          <p className="text-xs text-slate-400 mt-1">Access AI Career Readiness &amp; Campus Intelligence</p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Switcher Pills */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Select User Role</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('STUDENT');
                    setEmail('aarav.patel@student.campusiq.edu');
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                    selectedRole === 'STUDENT'
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50 shadow-sm'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Student
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('FACULTY');
                    setEmail('priya.sharma@campusiq.edu');
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                    selectedRole === 'FACULTY'
                      ? 'bg-amber-600/30 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Faculty
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('ADMIN');
                    setEmail('admin@campusiq.edu');
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                    selectedRole === 'ADMIN'
                      ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50 shadow-sm'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="student@campusiq.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs placeholder:text-slate-500 outline-none transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Demo password is: password123'); }} className="text-[11px] text-indigo-400 hover:text-indigo-300">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs placeholder:text-slate-500 outline-none transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as {selectedRole}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5 text-center">
              ⚡ 1-Click Demo Logins
            </span>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => handleQuickSelect('aarav.patel@student.campusiq.edu', 'STUDENT')}
                className="w-full p-2 rounded-xl bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 text-left transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-indigo-300">Aarav Patel (Student)</div>
                  <div className="text-[10px] text-slate-400">Full Stack · CGPA 8.85 · Score 78</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickSelect('priya.sharma@campusiq.edu', 'FACULTY')}
                className="w-full p-2 rounded-xl bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 text-left transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-amber-300">Prof. Priya Sharma (Faculty)</div>
                  <div className="text-[10px] text-slate-400">HOD CSE · Attendance &amp; Marks</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickSelect('admin@campusiq.edu', 'ADMIN')}
                className="w-full p-2 rounded-xl bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 text-left transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-emerald-300">Dr. Vikram Malhotra (Admin)</div>
                  <div className="text-[10px] text-slate-400">Dean · Platform Command Center</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold underline">
            Register as Student
          </Link>
        </p>
      </div>
    </div>
  );
}
