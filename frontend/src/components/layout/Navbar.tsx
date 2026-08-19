'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useStudent } from '@/context/StudentContext';
import {
  Bell, Bot, Search, Menu, X, CheckCircle2,
  Sparkles, ExternalLink, Award, LogOut, User as UserIcon
} from 'lucide-react';
import { CommandMenu } from '@/components/layout/CommandMenu';

export default function Navbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const { student, notifications, markNotificationRead } = useStudent();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Student Intelligence Dashboard';
    if (pathname === '/resume-analyzer') return 'AI Resume & ATS Analyzer';
    if (pathname === '/skill-gap') return 'AI Skill-Gap Engine';
    if (pathname === '/learning-path') return 'Personalized AI Learning Path';
    if (pathname === '/career-mentor') return 'CampusAI Career Mentor';
    if (pathname === '/academics') return 'Academic Performance & CGPA';
    if (pathname === '/attendance') return 'Attendance & Compliance';
    if (pathname === '/projects') return 'Project Hub & AI Recommender';
    if (pathname === '/hackathons') return 'Hackathon Discovery';
    if (pathname === '/coding') return 'Coding Assessment & DSA Playground';
    if (pathname === '/interview') return 'AI Interview Simulator';
    if (pathname === '/placements') return 'Placement & CTC Tracker';
    if (pathname === '/faculty') return 'Faculty Governance & Marks Portal';
    if (pathname === '/admin') return 'Admin Platform Command Center';
    if (pathname === '/settings') return 'Student Profile & Preferences';
    return 'CampusAI Intelligence';
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand / Mobile menu / Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-base bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent flex items-center gap-1.5">
                  CampusAI <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">Intelligence</span>
                </div>
              </div>
            </Link>

            <span className="hidden md:inline-block h-5 w-px bg-slate-800" />
            <h1 className="hidden md:block text-sm font-semibold text-slate-300">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right: Actions, AI Quick Access, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Command Menu */}
          <CommandMenu />

          {/* Quick AI Mentor Button */}
          <Link
            href="/career-mentor"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 hover:from-indigo-600/30 hover:to-purple-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-sm transition hover:scale-[1.02]"
          >
            <Bot className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>AI Mentor</span>
          </Link>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center shadow-lg shadow-rose-500/40">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/80 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 pb-2 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-full font-medium border border-indigo-500/30">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => notifications.forEach(n => markNotificationRead(n.id))}
                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">No notifications</div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3.5 hover:bg-slate-800/50 transition cursor-pointer flex gap-3 ${
                          !n.isRead ? 'bg-indigo-950/20' : ''
                        }`}
                      >
                        <div className="mt-0.5">
                          {n.category === 'ATTENDANCE_WARNING' && (
                            <span className="w-2 h-2 rounded-full bg-amber-400 block mt-1.5" />
                          )}
                          {n.category === 'INTERVIEW_REMINDER' && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 block mt-1.5" />
                          )}
                          {n.category === 'PLACEMENT_UPDATE' && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 block mt-1.5" />
                          )}
                          {n.category === 'HACKATHON' && (
                            <span className="w-2 h-2 rounded-full bg-purple-400 block mt-1.5" />
                          )}
                          {n.category === 'LEARNING_MILESTONE' && (
                            <span className="w-2 h-2 rounded-full bg-indigo-400 block mt-1.5" />
                          )}
                        </div>
                        <div className="flex-1 text-xs">
                          <p className="font-semibold text-slate-200">{n.title}</p>
                          <p className="text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                          <span className="text-[10px] text-slate-500 mt-1 block">{n.createdAt}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 transition"
            >
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={user?.fullName || 'User'}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-indigo-500/40"
              />
              <div className="hidden sm:block text-left text-xs">
                <div className="font-semibold text-slate-200 leading-tight flex items-center gap-1">
                  {user?.fullName?.split(' ')[0]}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {role === 'STUDENT' ? `Score: ${student.careerReadinessScore}/100` : role}
                </div>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-800">
                  <p className="font-semibold text-xs text-white">{user?.fullName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                    {role} ROLE
                  </span>
                </div>

                <div className="py-1 text-xs text-slate-300">
                  <Link
                    href="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800/60 hover:text-white"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    Profile &amp; Career Goals
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800/60 hover:text-white"
                  >
                    <Award className="w-3.5 h-3.5 text-indigo-400" />
                    Readiness Score ({student.careerReadinessScore}/100)
                  </Link>
                </div>

                <div className="pt-1 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-rose-400 hover:bg-rose-500/10 transition text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
