'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import CampusAILogo from './CampusAILogo';
import OctagonalButton from './OctagonalButton';
import { CommandMenu } from '@/components/layout/CommandMenu';

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'AI Intelligence', href: '#ai-intelligence' },
    { label: 'Resume ATS', href: '#resume' },
    { label: 'Learning', href: '#learning' },
    { label: 'Projects', href: '#projects' },
    { label: 'Coding', href: '#coding' },
    { label: 'Interview', href: '#interview' },
    { label: 'Readiness', href: '#readiness' },
    { label: 'Placements', href: '#placements' },
    { label: 'Hackathons', href: '#hackathons' },
    { label: 'AI Mentor', href: '#ai-mentor' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-cinematic ${
        isScrolled
          ? 'bg-[#030712]/80 backdrop-blur-2xl border-b border-white/[0.08] py-3 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LEFT: CampusAI AI-inspired original logo with 0.1s entrance */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <CampusAILogo size="md" trackingWide={true} />
        </motion.div>

        {/* CENTER: Minimal desktop navigation with 0.2s entrance */}
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden xl:flex items-center gap-6 px-5 py-2 rounded-full bg-slate-950/40 border border-white/[0.06] backdrop-blur-md text-xs font-medium text-slate-300"
        >
          {navLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </motion.nav>

        {/* RIGHT: Staggered CTA buttons with 0.3s entrance */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <div className="hidden sm:block">
            <CommandMenu />
          </div>

          <Link
            href="/login"
            className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 transition-colors duration-200"
          >
            Login
          </Link>

          <OctagonalButton variant="sm" href="/register" icon={false}>
            Get Started
          </OctagonalButton>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="xl:hidden p-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden bg-[#050814]/95 border-b border-white/10 backdrop-blur-3xl px-6 py-6 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3 mb-6">
              {navLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 text-xs font-medium text-slate-300 hover:text-white hover:border-indigo-500/30 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold text-center"
              >
                Launch Student Dashboard
              </Link>
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-medium text-center text-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-xs font-bold text-center text-white"
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
