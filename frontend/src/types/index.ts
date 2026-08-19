export type UserRole = 'STUDENT' | 'FACULTY' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface StudentProfile {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  avatarUrl?: string;
  college: string;
  department: string;
  year: number;
  cgpa: number;
  phone?: string;
  targetCareer: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  careerReadinessScore: number;
  technicalSkillScore: number;
  dsaScore: number;
  projectsScore: number;
  academicScore: number;
  resumeScore: number;
  interviewScore: number;
  certificationsScore: number;
  attendancePercentage: number;
}

export interface FacultyProfile {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  department: string;
  designation: string;
  cabinLocation?: string;
  specialization?: string;
  phone?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'PROGRAMMING' | 'FRAMEWORK' | 'DATABASE' | 'CLOUD_DEVOPS' | 'AI_ML' | 'CORE_CS' | 'SOFT_SKILLS';
  proficiencyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  verified: boolean;
  score: number;
}

export interface ResumeAnalysisResult {
  overallScore: number;
  atsCompatibilityScore: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  recommendedImprovements: string[];
  atsSuggestions: string[];
  careerSuggestions: string[];
  extractedSkills: string[];
  optimizedMarkdown: string;
}

export interface SkillGapItem {
  skillName: string;
  currentLevel: string;
  requiredLevel: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  gapScore: number;
  recommendation: string;
}

export interface SkillGapResult {
  targetRole: string;
  overallMatchPercentage: number;
  skillGaps: SkillGapItem[];
  missingSkills: string[];
  strongSkills: string[];
  readinessSummary: string;
}

export interface RoadmapResource {
  title: string;
  url: string;
}

export interface RoadmapModule {
  monthNumber: number;
  topic: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  estimatedHours: number;
  resources: RoadmapResource[];
  practiceTasks: string[];
  projectMilestone: string;
  isCompleted?: boolean;
}

export interface LearningPath {
  id: number;
  title: string;
  targetRole: string;
  estimatedMonths: number;
  totalModules: number;
  completedModules: number;
  modules: RoadmapModule[];
}

export interface Subject {
  id: number;
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
}

export interface AcademicRecord {
  id: number;
  subjectCode: string;
  subjectName: string;
  semester: number;
  internalMarks: number;
  assignmentMarks: number;
  examMarks: number;
  totalMarks: number;
  grade: string;
  aiFeedback: string;
}

export interface AttendanceRecord {
  id: number;
  subjectCode: string;
  subjectName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'AI_ML' | 'WEB_DEV' | 'MOBILE_DEV' | 'CLOUD_DEVOPS' | 'CYBERSECURITY' | 'IOT' | 'BLOCKCHAIN';
  techStack: string[];
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  teamSize: number;
  githubUrl?: string;
  demoUrl?: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED';
  createdByUserId: number;
  createdByName: string;
  createdAt: string;
}

export interface RecommendedProject {
  title: string;
  description: string;
  category: string;
  techStack: string[];
  difficulty: string;
  estimatedDuration: string;
  whyThisProject: string;
  skillsLearned: string[];
  careerImpact: string;
}

export interface Hackathon {
  id: number;
  name: string;
  organizer: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  prizePool: string;
  requiredSkills: string[];
  registrationDeadline: string;
  maxTeamSize: number;
  registrationUrl: string;
  bannerUrl: string;
  isSaved?: boolean;
}

export interface TestCase {
  input: string;
  output: string;
}

export interface CodingProblem {
  id: number;
  title: string;
  slug: string;
  topic: 'ARRAYS' | 'STRINGS' | 'LINKED_LISTS' | 'STACK_QUEUE' | 'TREES_GRAPHS' | 'SORTING_SEARCHING' | 'DYNAMIC_PROGRAMMING';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleTestCases: TestCase[];
  defaultStarterCode: Record<string, string>;
  acceptanceRate: number;
  isSolved?: boolean;
}

export interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
  expectedConcepts: string[];
  hint?: string;
}

export interface InterviewEvaluation {
  score: number;
  feedback: string;
  missingPoints: string[];
  improvedModelAnswer: string;
  communicationFeedback: string;
  confidenceRating: string;
}

export interface PlacementApplication {
  id: number;
  companyName: string;
  roleTitle: string;
  ctcLpa: number;
  location: string;
  appliedDate: string;
  status: 'APPLIED' | 'ONLINE_ASSESSMENT' | 'TECHNICAL_INTERVIEW' | 'HR_INTERVIEW' | 'SELECTED' | 'REJECTED';
  notes: string;
  interviewDate?: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  category: 'ATTENDANCE_WARNING' | 'HACKATHON' | 'ASSIGNMENT' | 'LEARNING_MILESTONE' | 'INTERVIEW_REMINDER' | 'PLACEMENT_UPDATE';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}
