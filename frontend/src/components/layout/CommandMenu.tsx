'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command'
import { useAuth } from '@/context/AuthContext'
import {
  LayoutDashboard, FileText, Cpu, Compass, Bot,
  GraduationCap, CalendarCheck, FolderGit2, Trophy,
  Code2, MessagesSquare, Briefcase, Users, ShieldCheck,
  Settings, Sparkles, Zap, ArrowRight, UserCheck
} from 'lucide-react'

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { switchRole } = useAuth()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs border border-slate-800 transition"
      >
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span className="font-medium">Quick Jump / Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-400 border border-slate-700 ml-1">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search feature..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="AI Intelligence Suite">
            <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
              <LayoutDashboard className="mr-2 h-4 w-4 text-indigo-400" />
              <span>Student Intelligence Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/resume-analyzer'))}>
              <FileText className="mr-2 h-4 w-4 text-indigo-400" />
              <span>AI Resume &amp; ATS Scanner</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/skill-gap'))}>
              <Cpu className="mr-2 h-4 w-4 text-purple-400" />
              <span>AI Skill-Gap Analyzer</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/learning-path'))}>
              <Compass className="mr-2 h-4 w-4 text-emerald-400" />
              <span>Personalized 6-Month Roadmap</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/career-mentor'))}>
              <Bot className="mr-2 h-4 w-4 text-purple-400" />
              <span>CampusAI Career Mentor Chatbot</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/interview'))}>
              <MessagesSquare className="mr-2 h-4 w-4 text-rose-400" />
              <span>AI Mock Interview Simulator</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Campus &amp; Placement Tools">
            <CommandItem onSelect={() => runCommand(() => router.push('/coding'))}>
              <Code2 className="mr-2 h-4 w-4 text-purple-400" />
              <span>Coding Assessment &amp; DSA Arena</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/placements'))}>
              <Briefcase className="mr-2 h-4 w-4 text-cyan-400" />
              <span>Placement Kanban &amp; CTC Tracker</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/projects'))}>
              <FolderGit2 className="mr-2 h-4 w-4 text-indigo-400" />
              <span>Project Hub &amp; AI Recommender</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/hackathons'))}>
              <Trophy className="mr-2 h-4 w-4 text-amber-400" />
              <span>Hackathon Discovery Arena</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/academics'))}>
              <GraduationCap className="mr-2 h-4 w-4 text-indigo-400" />
              <span>Academic Records &amp; CGPA</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/attendance'))}>
              <CalendarCheck className="mr-2 h-4 w-4 text-emerald-400" />
              <span>Attendance Tracker &amp; Calculator</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Switch Perspective (Evaluator Quick Switch)">
            <CommandItem onSelect={() => runCommand(() => { switchRole('STUDENT'); router.push('/dashboard'); })}>
              <UserCheck className="mr-2 h-4 w-4 text-indigo-400" />
              <span>Switch to Student Perspective</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => { switchRole('FACULTY'); router.push('/faculty'); })}>
              <Users className="mr-2 h-4 w-4 text-amber-400" />
              <span>Switch to Faculty Governance Portal</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => { switchRole('ADMIN'); router.push('/admin'); })}>
              <ShieldCheck className="mr-2 h-4 w-4 text-emerald-400" />
              <span>Switch to Admin Command Center</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
