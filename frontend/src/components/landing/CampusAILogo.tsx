'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CampusAILogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  trackingWide?: boolean;
}

export default function CampusAILogo({
  className = '',
  size = 'md',
  showText = true,
  trackingWide = true,
}: CampusAILogoProps) {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }[size];

  const textSizes = {
    sm: 'text-sm font-bold',
    md: 'text-base font-extrabold',
    lg: 'text-xl font-black',
  }[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Abstract AI Neural Node + Career Upward Vector Emblem */}
      <div className={`relative ${iconDimensions} rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300`}>
        <div className="w-full h-full rounded-[10px] bg-[#070b18] flex items-center justify-center relative overflow-hidden">
          {/* Subtle background glow within emblem */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
          
          <svg
            className="w-[62%] h-[62%] text-white relative z-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Neural upward trajectory nodes */}
            <circle cx="12" cy="4" r="2" className="fill-cyan-400 stroke-cyan-400" />
            <circle cx="4" cy="18" r="2" className="fill-indigo-400 stroke-indigo-400" />
            <circle cx="20" cy="18" r="2" className="fill-purple-400 stroke-purple-400" />
            <circle cx="12" cy="12" r="2.5" className="fill-white stroke-white shadow-sm" />
            
            {/* Dynamic neural pathways */}
            <path d="M4 18 L12 12" className="stroke-indigo-400/80" />
            <path d="M20 18 L12 12" className="stroke-purple-400/80" />
            <path d="M12 12 L12 4" className="stroke-cyan-400/90" strokeDasharray="1 0" />
            <path d="M8 7 L12 4 L16 7" className="stroke-cyan-300" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`${textSizes} text-white ${
              trackingWide ? 'tracking-[0.18em] uppercase' : 'tracking-tight'
            } transition-colors group-hover:text-indigo-200`}
          >
            {trackingWide ? 'CampusAI' : 'CampusAI'}
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold -mt-0.5">
            Career Intelligence
          </span>
        </div>
      )}
    </Link>
  );
}
