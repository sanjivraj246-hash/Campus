'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] bg-[#030712] flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/50 mb-3 animate-pulse">
            <Sparkles className="w-7 h-7" />
          </div>

          <div className="text-center">
            <h2 className="text-lg font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              CampusAI
            </h2>
            <p className="text-xs text-indigo-400 font-medium mt-0.5">
              Calibrating Intelligence Engine...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
