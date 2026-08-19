'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useStudent } from '@/context/StudentContext';
import {
  LayoutDashboard, FileText, Cpu, Compass, Bot,
  GraduationCap, CalendarCheck, FolderGit2, Trophy,
  Code2, MessagesSquare, Briefcase, Users, ShieldCheck,
  Settings, Sparkles, ChevronRight, X, LucideIcon
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  highlight?: string;
  roleLock?: string;
  isAi?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { role } = useAuth();
  const { student } = useStudent();

  const navGroups: NavGroup[] = [
    {
      title: 'AI CAREER SUITE',
      items: [
        { name: 'Student Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: `${student.careerReadinessScore}%` },
        { name: 'AI Resume Analyzer', href: '/resume-analyzer', icon: FileText, highlight: 'ATS' },
        { name: 'AI Skill-Gap Engine', href: '/skill-gap', icon: Cpu },
        { name: 'Personalized Roadmap', href: '/learning-path', icon: Compass, badge: '6 Mo' },
        { name: 'AI Career Mentor', href: '/career-mentor', icon: Bot, isAi: true },
        { name: 'AI Interview Simulator', href: '/interview', icon: MessagesSquare, highlight: 'Mock' },
      ]
    },
    {
      title: 'CAMPUS & ACADEMICS',
      items: [
        { name: 'Academic & CGPA', href: '/academics', icon: GraduationCap, badge: `${student.cgpa}` },
        { name: 'Attendance Tracker', href: '/attendance', icon: CalendarCheck, badge: `${student.attendancePercentage}%` },
      ]
    },
    {
      title: 'PRACTICE & PLACEMENT',
      items: [
        { name: 'Coding Assessment', href: '/coding', icon: Code2, highlight: 'DSA' },
        { name: 'Project Hub', href: '/projects', icon: FolderGit2 },
        { name: 'Hackathon Discovery', href: '/hackathons', icon: Trophy },
        { name: 'Placement Tracker', href: '/placements', icon: Briefcase, highlight: 'Kanban' },
      ]
    },
    {
      title: 'GOVERNANCE & ADMIN',
      items: [
        { name: 'Faculty Portal', href: '/faculty', icon: Users, roleLock: 'FACULTY' },
        { name: 'Admin Command', href: '/admin', icon: ShieldCheck, roleLock: 'ADMIN' },
        { name: 'Profile Settings', href: '/settings', icon: Settings },
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-950/95 border-r border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                CampusAI
              </span>
              <span className="text-[10px] block text-indigo-400 font-semibold uppercase tracking-wider">
                Intelligence Core
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item, iIdx) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={iIdx}
                      href={item.href}
                      onClick={onClose}
                      className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/10 text-white font-semibold border border-indigo-500/40 shadow-sm shadow-indigo-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0 ${
                            isActive
                              ? 'text-indigo-400'
                              : item.isAi
                              ? 'text-purple-400 animate-pulse'
                              : 'text-slate-400 group-hover:text-slate-300'
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        {item.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                              isActive
                                ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {item.highlight && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/30 uppercase tracking-wide">
                            {item.highlight}
                          </span>
                        )}
                        {item.roleLock && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            role === item.roleLock ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {item.roleLock}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer: Readiness Quick Pill */}
        <div className="p-3 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-500/30">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Career Readiness</span>
              <span className="font-bold text-indigo-300">{student.careerReadinessScore}/100</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${student.careerReadinessScore}%` }}
              />
            </div>
            <Link
              href="/learning-path"
              className="mt-2 text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center justify-between"
            >
              <span>Boost Readiness</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
