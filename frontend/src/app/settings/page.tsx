'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import {
  Settings, User, Mail, Phone, Building2,
  GraduationCap, Target, Github, Linkedin, Globe,
  CheckCircle2, Sparkles, Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SettingsPage() {
  const { student, updateStudent } = useStudent();

  const [fullName, setFullName] = useState(student.fullName);
  const [phone, setPhone] = useState(student.phone || '+91 91234 56789');
  const [college, setCollege] = useState(student.college);
  const [department, setDepartment] = useState(student.department);
  const [year, setYear] = useState(student.year);
  const [cgpa, setCgpa] = useState(student.cgpa);
  const [targetCareer, setTargetCareer] = useState(student.targetCareer);
  const [bio, setBio] = useState(student.bio || 'Passionate developer building modern web apps with React, Next.js, and Java Spring Boot.');
  const [githubUrl, setGithubUrl] = useState(student.githubUrl || 'https://github.com/aaravpatel');
  const [linkedinUrl, setLinkedinUrl] = useState(student.linkedinUrl || 'https://linkedin.com/in/aaravpatel');
  const [portfolioUrl, setPortfolioUrl] = useState(student.portfolioUrl || 'https://aaravpatel.dev');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent({
      fullName,
      phone,
      college,
      department,
      year,
      cgpa,
      targetCareer,
      bio,
      githubUrl,
      linkedinUrl,
      portfolioUrl
    });

    setSavedSuccess(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Student Profile &amp; Preferences</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Update academic credentials, target career goals, and portfolio links
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Readiness</span>
            <span className="text-xl font-extrabold text-indigo-300">{student.careerReadinessScore}/100</span>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile and AI Career Readiness recalculated successfully!</span>
          </div>
        )}

        {/* Edit Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl">
          <form onSubmit={handleSave} className="space-y-6 text-xs">
            {/* Personal Details */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-400" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-slate-300 font-semibold mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>
            </div>

            {/* Academic Credentials */}
            <div className="pt-4 border-t border-slate-800/80">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                College &amp; Academic Credentials
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">College / University</label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Current Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  >
                    <option value={1}>1st Year</option>
                    <option value={2}>2nd Year</option>
                    <option value={3}>3rd Year</option>
                    <option value={4}>4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">CGPA (out of 10.0)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={cgpa}
                    onChange={(e) => setCgpa(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Placement Role</label>
                  <select
                    value={targetCareer}
                    onChange={(e) => setTargetCareer(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  >
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Cloud Engineer">Cloud Engineer</option>
                    <option value="AI Engineer">AI Engineer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Social & Portfolio URLs */}
            <div className="pt-4 border-t border-slate-800/80">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Portfolio &amp; Social Links
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">GitHub Profile</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Portfolio Website</label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
