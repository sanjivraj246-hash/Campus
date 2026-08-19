'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, UserCheck, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RoleBanner() {
  const { role, switchRole, user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-900/90 border-b border-indigo-500/20 px-4 py-2 text-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-indigo-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Recruiter &amp; Judge Demo Switcher:
          </span>
          <span className="text-slate-400 hidden sm:inline">Active as:</span>
          <span className="bg-indigo-500/20 text-indigo-300 font-medium px-2 py-0.5 rounded-full border border-indigo-500/30 flex items-center gap-1">
            {role === 'STUDENT' && <GraduationCap className="w-3 h-3 text-cyan-400" />}
            {role === 'FACULTY' && <UserCheck className="w-3 h-3 text-amber-400" />}
            {role === 'ADMIN' && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
            {user?.fullName} ({role})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 hidden md:inline mr-1">Switch Perspective:</span>
          <button
            onClick={() => switchRole('STUDENT')}
            className={`px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1 ${
              role === 'STUDENT'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/50'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
            }`}
          >
            <GraduationCap className="w-3 h-3" />
            Student View
          </button>

          <button
            onClick={() => switchRole('FACULTY')}
            className={`px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1 ${
              role === 'FACULTY'
                ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/50'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            Faculty View
          </button>

          <button
            onClick={() => switchRole('ADMIN')}
            className={`px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1 ${
              role === 'ADMIN'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/50'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            Admin View
          </button>

          <Link
            href={role === 'FACULTY' ? '/faculty' : role === 'ADMIN' ? '/admin' : '/dashboard'}
            className="ml-2 text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-0.5 hover:underline"
          >
            Go to {role.toLowerCase()} dashboard <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
