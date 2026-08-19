'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useStudent } from '@/context/StudentContext';
import { Project } from '@/types';
import {
  FolderGit2, Plus, Sparkles, Github, ExternalLink,
  Users, Trophy, ArrowUpRight, CheckCircle2, Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProjectsPage() {
  const { projects, addProject, student } = useStudent();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Project['category']>('WEB_DEV');
  const [techStackInput, setTechStackInput] = useState('React, Next.js, Node.js, PostgreSQL');
  const [difficulty, setDifficulty] = useState<Project['difficulty']>('INTERMEDIATE');
  const [teamSize, setTeamSize] = useState(4);
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');

  const categories = [
    { id: 'ALL', label: 'All Categories' },
    { id: 'AI_ML', label: 'AI & Machine Learning' },
    { id: 'WEB_DEV', label: 'Web Development' },
    { id: 'CLOUD_DEVOPS', label: 'Cloud & DevOps' },
    { id: 'BLOCKCHAIN', label: 'Blockchain' },
  ];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addProject({
      title,
      description,
      category,
      techStack: techStackInput.split(',').map(s => s.trim()).filter(Boolean),
      difficulty,
      teamSize,
      githubUrl: githubUrl || undefined,
      demoUrl: demoUrl || undefined,
      status: 'IN_PROGRESS'
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setTitle('');
    setDescription('');
    setShowCreateModal(false);
  };

  const aiRecommended = [
    {
      title: 'AI Resume & ATS Intelligence Engine',
      category: 'AI / Machine Learning',
      techStack: ['FastAPI', 'Python', 'React', 'PostgreSQL'],
      difficulty: 'Intermediate',
      duration: '3-4 Weeks',
      why: 'Directly addresses enterprise hiring automation needs and proves full-stack Python + React connectivity.',
      skills: ['FastAPI Endpoints', 'NLP Tokenization', 'PostgreSQL Tuning'],
      careerImpact: '+35% placement recruiter shortlisting for Full Stack & AI roles'
    },
    {
      title: 'Real-Time Campus Emergency & Dispatch Grid',
      category: 'Real-Time Web',
      techStack: ['Next.js', 'Socket.io', 'Redis', 'Leaflet'],
      difficulty: 'Advanced',
      duration: '4 Weeks',
      why: 'Demonstrates sub-50ms WebSocket telemetry, geolocation clustering, and concurrent state handling.',
      skills: ['WebSocket Rooms', 'Geospatial Indexing', 'Optimistic UI'],
      careerImpact: 'Exceptional project for Tier-1 Product MNC interviews'
    },
    {
      title: 'Distributed Microservices Cloud Commerce',
      category: 'Cloud Architecture',
      techStack: ['Spring Boot 3', 'Apache Kafka', 'Docker', 'Kubernetes'],
      difficulty: 'Advanced',
      duration: '5 Weeks',
      why: 'Replicates enterprise architecture patterns with circuit breakers, message queues, and container orchestration.',
      skills: ['Spring Data JPA', 'Kafka Consumers', 'Docker Compose'],
      careerImpact: 'Proves senior-level backend readiness for Amazon, Microsoft, and Google'
    }
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Project Hub &amp; AI Recommender</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Discover peer projects, form teams, and build AI-recommended capstone systems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          </div>
        </div>

        {/* AI Recommendations Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-purple-950/40 border border-indigo-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              AI Recommended Projects for Your Career Goal ({student.targetCareer})
            </h3>
            <span className="text-xs text-indigo-300 font-semibold">Matched to Your Skill Gaps</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiRecommended.map((rec, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {rec.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{rec.duration}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1.5">{rec.title}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                    <strong>Why this project?</strong> {rec.why}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {rec.techStack.map((t, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center justify-between">
                  <span>{rec.careerImpact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Directory Section */}
        <div>
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
            <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                  selectedCategory === c.id
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950 text-indigo-300 border border-slate-800 uppercase">
                      {p.category.replace('_', ' ')}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      p.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {p.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Team of {p.teamSize}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {p.demoUrl && (
                      <a href={p.demoUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1 font-semibold">
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Project Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-white mb-1">Create New Project</h3>
              <p className="text-xs text-slate-400 mb-6">Publish project for collaboration and portfolio credit</p>

              <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Distributed Notification Engine"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe problem solved, architecture, and features..."
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                    >
                      <option value="AI_ML">AI &amp; Machine Learning</option>
                      <option value="WEB_DEV">Web Development</option>
                      <option value="CLOUD_DEVOPS">Cloud &amp; DevOps</option>
                      <option value="BLOCKCHAIN">Blockchain</option>
                      <option value="MOBILE_DEV">Mobile App</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                    >
                      <option value="BEGINNER">Beginner</option>
                      <option value="INTERMEDIATE">Intermediate</option>
                      <option value="ADVANCED">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    placeholder="React, Spring Boot, PostgreSQL, Docker"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">GitHub Repository URL</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Live Demo URL</label>
                    <input
                      type="url"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      placeholder="https://app.dev..."
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/25"
                  >
                    Create &amp; Boost Score
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
