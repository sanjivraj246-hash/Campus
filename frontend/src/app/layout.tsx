import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { StudentProvider } from '@/context/StudentContext';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
  title: 'CampusAI — AI-Powered Career Intelligence Platform',
  description: 'AI-driven platform for college students to master DSA, optimize resumes with ATS analysis, practice mock interviews, and land Tier-1 MNC placements.',
  keywords: 'CampusAI, Placement Readiness, AI Career Mentor, Resume ATS, Skill Gap, Mock Interview, Coding DSA, Hackathons',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#030712] text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
        <AuthProvider>
          <StudentProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </StudentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
