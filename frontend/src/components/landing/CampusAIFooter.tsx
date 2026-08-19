'use client';

import React from 'react';
import Link from 'next/link';
import CampusAILogo from './CampusAILogo';

export default function CampusAIFooter() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#030712] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <CampusAILogo size="md" trackingWide={true} />
          <p className="text-xs text-slate-400 max-w-sm">
            AI-powered career intelligence for students.
          </p>
        </div>

        {/* Platform Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
          <Link href="/dashboard" className="hover:text-white transition duration-200">
            Platform
          </Link>
          <Link href="/career-mentor" className="hover:text-white transition duration-200">
            AI Mentor
          </Link>
          <Link href="/learning-path" className="hover:text-white transition duration-200">
            Learning
          </Link>
          <Link href="/projects" className="hover:text-white transition duration-200">
            Projects
          </Link>
          <Link href="/interview" className="hover:text-white transition duration-200">
            Interview
          </Link>
          <Link href="/placements" className="hover:text-white transition duration-200">
            Placements
          </Link>
          <Link href="/hackathons" className="hover:text-white transition duration-200">
            Hackathons
          </Link>
        </div>

        {/* Legal & Status */}
        <div className="flex items-center gap-6 text-xs text-slate-500">
          <Link href="#" className="hover:text-slate-300 transition">
            Privacy
          </Link>
          <Link href="#" className="hover:text-slate-300 transition">
            Terms
          </Link>
          <span>&copy; {new Date().getFullYear()} CampusAI.</span>
        </div>
      </div>
    </footer>
  );
}
