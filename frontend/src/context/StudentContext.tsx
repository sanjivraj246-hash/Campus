'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile, LearningPath, Skill, Project,
  Hackathon, CodingProblem, PlacementApplication,
  NotificationItem, AcademicRecord, AttendanceRecord
} from '../types';
import {
  INITIAL_STUDENTS, INITIAL_LEARNING_PATH, INITIAL_SKILLS,
  INITIAL_PROJECTS, INITIAL_HACKATHONS, INITIAL_CODING_PROBLEMS,
  INITIAL_PLACEMENTS, INITIAL_NOTIFICATIONS, INITIAL_ACADEMIC_RECORDS,
  INITIAL_ATTENDANCE_RECORDS
} from '../lib/mockData';
import { calculateReadinessScore } from '../lib/aiSimulator';

interface StudentContextType {
  student: StudentProfile;
  updateStudent: (updates: Partial<StudentProfile>) => void;
  learningPath: LearningPath;
  toggleRoadmapModule: (monthNumber: number) => void;
  skills: Skill[];
  addSkill: (name: string, category: Skill['category'], level: Skill['proficiencyLevel']) => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'createdByUserId' | 'createdByName'>) => void;
  hackathons: Hackathon[];
  toggleSaveHackathon: (id: number) => void;
  codingProblems: CodingProblem[];
  markProblemSolved: (id: number) => void;
  placements: PlacementApplication[];
  addPlacementApplication: (app: Omit<PlacementApplication, 'id'>) => void;
  updatePlacementStatus: (id: number, status: PlacementApplication['status']) => void;
  academicRecords: AcademicRecord[];
  attendanceRecords: AttendanceRecord[];
  updateAttendance: (id: number, attended: number, total: number) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: number) => void;
  allStudents: StudentProfile[];
  recalculateScore: () => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [allStudents, setAllStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENTS[0]);
  const [learningPath, setLearningPath] = useState<LearningPath>(INITIAL_LEARNING_PATH);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [hackathons, setHackathons] = useState<Hackathon[]>(INITIAL_HACKATHONS);
  const [codingProblems, setCodingProblems] = useState<CodingProblem[]>(INITIAL_CODING_PROBLEMS);
  const [placements, setPlacements] = useState<PlacementApplication[]>(INITIAL_PLACEMENTS);
  const [academicRecords, setAcademicRecords] = useState<AcademicRecord[]>(INITIAL_ACADEMIC_RECORDS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_RECORDS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Recalculate composite career readiness score
  const recalculateScore = () => {
    const { overall } = calculateReadinessScore(
      student.technicalSkillScore,
      student.dsaScore,
      student.projectsScore,
      student.academicScore,
      student.resumeScore,
      student.interviewScore,
      student.certificationsScore
    );
    setStudent(prev => ({ ...prev, careerReadinessScore: overall }));
  };

  const updateStudent = (updates: Partial<StudentProfile>) => {
    setStudent(prev => {
      const next = { ...prev, ...updates };
      const { overall } = calculateReadinessScore(
        next.technicalSkillScore,
        next.dsaScore,
        next.projectsScore,
        next.academicScore,
        next.resumeScore,
        next.interviewScore,
        next.certificationsScore
      );
      next.careerReadinessScore = overall;
      return next;
    });
  };

  const toggleRoadmapModule = (monthNumber: number) => {
    setLearningPath(prev => {
      const updatedModules = prev.modules.map(m => {
        if (m.monthNumber === monthNumber) {
          const nextState = !m.isCompleted;
          return { ...m, isCompleted: nextState };
        }
        return m;
      });
      const completedCount = updatedModules.filter(m => m.isCompleted).length;
      return {
        ...prev,
        modules: updatedModules,
        completedModules: completedCount
      };
    });

    // Reward with +3 technical and +2 projects score
    setStudent(prev => {
      const newTech = Math.min(100, prev.technicalSkillScore + 3);
      const newProj = Math.min(100, prev.projectsScore + 2);
      const { overall } = calculateReadinessScore(
        newTech,
        prev.dsaScore,
        newProj,
        prev.academicScore,
        prev.resumeScore,
        prev.interviewScore,
        prev.certificationsScore
      );
      return {
        ...prev,
        technicalSkillScore: newTech,
        projectsScore: newProj,
        careerReadinessScore: overall
      };
    });
  };

  const addSkill = (name: string, category: Skill['category'], level: Skill['proficiencyLevel']) => {
    const newSkill: Skill = {
      id: Date.now(),
      name,
      category,
      proficiencyLevel: level,
      verified: true,
      score: level === 'EXPERT' ? 95 : level === 'ADVANCED' ? 85 : level === 'INTERMEDIATE' ? 70 : 50
    };
    setSkills(prev => [...prev, newSkill]);
    setStudent(prev => {
      const newTech = Math.min(100, prev.technicalSkillScore + 2);
      const { overall } = calculateReadinessScore(
        newTech,
        prev.dsaScore,
        prev.projectsScore,
        prev.academicScore,
        prev.resumeScore,
        prev.interviewScore,
        prev.certificationsScore
      );
      return { ...prev, technicalSkillScore: newTech, careerReadinessScore: overall };
    });
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'createdByUserId' | 'createdByName'>) => {
    const newProj: Project = {
      ...projectData,
      id: Date.now(),
      createdByUserId: student.userId,
      createdByName: student.fullName,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProjects(prev => [newProj, ...prev]);
    setStudent(prev => {
      const newProjScore = Math.min(100, prev.projectsScore + 5);
      const { overall } = calculateReadinessScore(
        prev.technicalSkillScore,
        prev.dsaScore,
        newProjScore,
        prev.academicScore,
        prev.resumeScore,
        prev.interviewScore,
        prev.certificationsScore
      );
      return { ...prev, projectsScore: newProjScore, careerReadinessScore: overall };
    });
  };

  const toggleSaveHackathon = (id: number) => {
    setHackathons(prev => prev.map(h => h.id === id ? { ...h, isSaved: !h.isSaved } : h));
  };

  const markProblemSolved = (id: number) => {
    setCodingProblems(prev => prev.map(p => p.id === id ? { ...p, isSolved: true } : p));
    setStudent(prev => {
      const newDsa = Math.min(100, prev.dsaScore + 4);
      const { overall } = calculateReadinessScore(
        prev.technicalSkillScore,
        newDsa,
        prev.projectsScore,
        prev.academicScore,
        prev.resumeScore,
        prev.interviewScore,
        prev.certificationsScore
      );
      return { ...prev, dsaScore: newDsa, careerReadinessScore: overall };
    });
  };

  const addPlacementApplication = (appData: Omit<PlacementApplication, 'id'>) => {
    const newApp: PlacementApplication = {
      ...appData,
      id: Date.now()
    };
    setPlacements(prev => [newApp, ...prev]);
  };

  const updatePlacementStatus = (id: number, status: PlacementApplication['status']) => {
    setPlacements(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const updateAttendance = (id: number, attended: number, total: number) => {
    setAttendanceRecords(prev => {
      const updated = prev.map(a => {
        if (a.id === id) {
          const pct = Math.round((attended / Math.max(total, 1)) * 100);
          return {
            ...a,
            attendedClasses: attended,
            totalClasses: total,
            percentage: pct,
            status: pct < 75 ? ('WARNING' as const) : ('SAFE' as const)
          };
        }
        return a;
      });
      const avg = updated.reduce((acc, curr) => acc + curr.percentage, 0) / updated.length;
      setStudent(s => ({ ...s, attendancePercentage: Math.round(avg * 10) / 10 }));
      return updated;
    });
  };

  const markNotificationRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        updateStudent,
        learningPath,
        toggleRoadmapModule,
        skills,
        addSkill,
        projects,
        addProject,
        hackathons,
        toggleSaveHackathon,
        codingProblems,
        markProblemSolved,
        placements,
        addPlacementApplication,
        updatePlacementStatus,
        academicRecords,
        attendanceRecords,
        updateAttendance,
        notifications,
        markNotificationRead,
        allStudents,
        recalculateScore
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
