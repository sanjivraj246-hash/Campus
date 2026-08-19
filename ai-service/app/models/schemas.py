from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ResumeAnalysisRequest(BaseModel):
    resume_text: Optional[str] = None
    target_role: Optional[str] = "Full Stack Developer"
    current_cgpa: Optional[float] = 8.5
    current_year: Optional[int] = 3

class ResumeAnalysisResponse(BaseModel):
    overall_score: int
    ats_compatibility_score: int
    strengths: List[str]
    weaknesses: List[str]
    missing_skills: List[str]
    recommended_improvements: List[str]
    ats_suggestions: List[str]
    career_suggestions: List[str]
    extracted_skills: List[str]
    optimized_markdown: str

class SkillGapRequest(BaseModel):
    current_skills: List[str]
    target_role: str
    experience_level: Optional[str] = "Student / Entry Level"

class SkillGapItem(BaseModel):
    skill_name: str
    current_level: str
    required_level: str
    priority: str # CRITICAL, HIGH, MEDIUM, LOW
    gap_score: int
    recommendation: str

class SkillGapResponse(BaseModel):
    target_role: str
    overall_match_percentage: int
    skill_gaps: List[SkillGapItem]
    missing_skills: List[str]
    strong_skills: List[str]
    readiness_summary: str

class LearningPathRequest(BaseModel):
    target_role: str
    current_skills: List[str]
    timeframe_months: Optional[int] = 6
    hours_per_week: Optional[int] = 15

class RoadmapModule(BaseModel):
    month_number: int
    topic: str
    description: str
    difficulty: str
    estimated_hours: int
    resources: List[Dict[str, str]]
    practice_tasks: List[str]
    project_milestone: str

class LearningPathResponse(BaseModel):
    title: str
    target_role: str
    estimated_months: int
    total_modules: int
    modules: List[RoadmapModule]

class InterviewGenerateRequest(BaseModel):
    mode: str # TECHNICAL, HR, BEHAVIORAL, RESUME_BASED
    target_role: str
    student_skills: Optional[List[str]] = []
    projects: Optional[List[str]] = []
    question_count: Optional[int] = 5

class InterviewQuestion(BaseModel):
    id: int
    question: str
    category: str
    expected_concepts: List[str]
    hint: Optional[str] = None

class InterviewEvaluateRequest(BaseModel):
    question: str
    category: str
    student_answer: str
    target_role: str

class InterviewEvaluateResponse(BaseModel):
    score: int
    feedback: str
    missing_points: List[str]
    improved_model_answer: str
    communication_feedback: str
    confidence_rating: str

class CareerMentorMessage(BaseModel):
    role: str # user or assistant
    content: str

class CareerMentorRequest(BaseModel):
    message: str
    history: Optional[List[CareerMentorMessage]] = []
    student_profile: Optional[Dict[str, Any]] = None

class CareerMentorResponse(BaseModel):
    reply: str
    suggested_followups: List[str]

class ReadinessScoreRequest(BaseModel):
    technical_skill_score: int = 50
    dsa_score: int = 50
    projects_score: int = 50
    academic_score: int = 50
    resume_score: int = 50
    interview_score: int = 50
    certifications_score: int = 50

class ReadinessScoreResponse(BaseModel):
    overall_score: int
    breakdown: Dict[str, int]
    top_3_improvements: List[Dict[str, str]]
    readiness_tier: str
    tier_description: str

class ProjectRecommendRequest(BaseModel):
    target_role: str
    current_skills: List[str]
    missing_skills: Optional[List[str]] = []

class RecommendedProject(BaseModel):
    title: str
    description: str
    category: str
    tech_stack: List[str]
    difficulty: str
    estimated_duration: str
    why_this_project: str
    skills_learned: List[str]
    career_impact: str
