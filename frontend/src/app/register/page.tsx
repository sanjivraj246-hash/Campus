'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useStudent } from '@/context/StudentContext';
import { Sparkles, ArrowRight, Lock, Mail, User, BookOpen, GraduationCap, Building2 } from 'lucide-react';
import { UserRole } from '@/types';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { updateStudent } = useStudent();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [college, setCollege] = useState('MIT Institute of Technology');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [year, setYear] = useState(3);
  const [cgpa, setCgpa] = useState(8.5);
  const [targetCareer, setTargetCareer] = useState('Full Stack Developer');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(email, role);
      updateStudent({
        fullName,
        email,
        college,
        department,
        year,
        cgpa,
        targetCareer
      });
      setIsLoading(false);
      router.push('/onboarding');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#080c16] flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white relative overflow-hidden py-12">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              CampusAI
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-white">Create Your Student Account</h2>
          <p className="text-xs text-slate-400 mt-1">Accelerate your career with AI placement intelligence</p>
        </div>

        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aarav Patel"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs placeholder:text-slate-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs placeholder:text-slate-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs placeholder:text-slate-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">College / University</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs outline-none"
                >
                  <option value="Computer Science & Engineering">Computer Science &amp; Eng</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Data Science & AI">Data Science &amp; AI</option>
                  <option value="Electronics & Comm Eng">Electronics &amp; Comm Eng</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Academic Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs outline-none"
                >
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Current CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={cgpa}
                  onChange={(e) => setCgpa(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Career</label>
                <select
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-indigo-500 text-white text-xs outline-none"
                >
                  <option value="Full Stack Developer">Full Stack Dev</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Cloud Engineer">Cloud Engineer</option>
                  <option value="AI Engineer">AI Engineer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Continue to Onboarding & AI Calibration'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
