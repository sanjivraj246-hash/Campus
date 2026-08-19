'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import {
  Trophy, Bookmark, BookmarkCheck, ExternalLink,
  Calendar, MapPin, Users, Sparkles, Filter, Clock
} from 'lucide-react';

export default function HackathonsPage() {
  const { hackathons, toggleSaveHackathon } = useStudent();
  const [filterMode, setFilterMode] = useState<string>('ALL');

  const filtered = filterMode === 'ALL'
    ? hackathons
    : filterMode === 'SAVED'
    ? hackathons.filter(h => h.isSaved)
    : hackathons.filter(h => h.mode === filterMode);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-amber-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Hackathon Discovery &amp; Arena</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Explore national and global hackathons, form student squads, and win prize bounties
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
            {['ALL', 'SAVED', 'ONLINE', 'HYBRID', 'OFFLINE'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterMode(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  filterMode === f
                    ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Hackathons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((h) => (
            <div
              key={h.id}
              className="rounded-3xl bg-slate-900/70 border border-slate-800 overflow-hidden hover:border-slate-700 transition flex flex-col justify-between group"
            >
              {/* Banner Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={h.bannerUrl}
                  alt={h.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30 uppercase">
                    {h.mode}
                  </span>
                </div>

                <button
                  onClick={() => toggleSaveHackathon(h.id)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white border border-slate-800 transition"
                  title="Bookmark Hackathon"
                >
                  {h.isSaved ? (
                    <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-semibold text-amber-300 block">{h.organizer}</span>
                  <h3 className="text-lg font-bold text-white leading-snug">{h.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {h.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-800/80 text-xs mb-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>{h.prizePool}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span className="truncate">{h.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span>Starts: {h.dateStart}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Users className="w-4 h-4 text-indigo-400" />
                      <span>Max {h.maxTeamSize} Members</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {h.requiredSkills.map((skill, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-rose-400 flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Reg Deadline: {h.registrationDeadline}</span>
                  </div>

                  <a
                    href={h.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition flex items-center gap-1.5"
                  >
                    <span>Register Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
