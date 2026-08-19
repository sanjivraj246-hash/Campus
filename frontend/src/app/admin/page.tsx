'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import { INITIAL_USERS } from '@/lib/mockData';
import { User, UserRole } from '@/types';
import {
  ShieldCheck, Users, TrendingUp, Sparkles,
  Building2, Trophy, FolderGit2, CheckCircle2,
  XCircle, Search, Plus, Filter, UserCheck, GraduationCap
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { allStudents, projects, hackathons } = useStudent();
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleUserStatus = (id: number) => {
    alert(`User ID #${id} status toggled!`);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-emerald-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">Admin Platform Command Center</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Dean / Admin Mode
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Global platform oversight: Users, departmental metrics, placement rates, and system intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Platform Health: All Spring Boot API clusters and FastAPI AI microservices running with 99.98% uptime.')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>System Health 100%</span>
            </button>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Total Registered Students</span>
            <div className="text-3xl font-extrabold text-white mt-1">1,450+</div>
            <span className="text-[11px] text-indigo-400 font-medium">Active this academic term</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Average Placement Readiness</span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1">78.4 / 100</div>
            <span className="text-[11px] text-emerald-400 font-medium">+14.2% YoY growth</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Active Capstone Projects</span>
            <div className="text-3xl font-extrabold text-cyan-400 mt-1">{projects.length * 32}</div>
            <span className="text-[11px] text-cyan-400 font-medium">Cross-department collabs</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Tier-1 Placement Rate</span>
            <div className="text-3xl font-extrabold text-purple-400 mt-1">94.2%</div>
            <span className="text-[11px] text-purple-300 font-medium">Average package: 18.4 LPA</span>
          </div>
        </div>

        {/* User Management Section */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Platform User Management &amp; Role Access
            </h3>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search user email or name..."
                  className="pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none"
              >
                <option value="ALL">All Roles</option>
                <option value="STUDENT">Students</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admins</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3 text-center">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 pr-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                          alt={u.fullName}
                          className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700"
                        />
                        <div>
                          <span className="font-bold text-white block">{u.fullName}</span>
                          <span className="text-[10px] text-slate-400">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                        u.role === 'ADMIN'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : u.role === 'FACULTY'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3.5 text-center">
                      <span className="text-emerald-400 font-semibold flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Active
                      </span>
                    </td>

                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold border border-slate-700 transition"
                      >
                        Manage Access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
