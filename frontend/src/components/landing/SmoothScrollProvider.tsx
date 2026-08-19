'use client';

import React, { useEffect, useState } from 'react';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let lenis: any = null;
    let rafId: number | null = null;

    try {
      if (typeof window !== 'undefined') {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
          import('lenis').then(({ default: Lenis }) => {
            lenis = new Lenis({
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              orientation: 'vertical',
              smoothWheel: true,
              touchMultiplier: 1.5,
            });

            function raf(time: number) {
              if (lenis) {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
              }
            }

            rafId = requestAnimationFrame(raf);
          }).catch((err) => {
            console.warn('Lenis smooth scroll failed to initialize:', err);
          });
        }
      }
    } catch (e) {
      console.warn('Smooth scroll initialization skipped:', e);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
