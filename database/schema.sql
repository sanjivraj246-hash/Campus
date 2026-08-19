-- ====================================================================
-- CampusAI – AI-Powered Campus Intelligence & Career Platform
-- PostgreSQL Relational Database DDL Schema
-- ====================================================================

-- Drop existing tables in reverse dependency order if needed
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS placement_applications CASCADE;
DROP TABLE IF EXISTS interview_answers CASCADE;
DROP TABLE IF EXISTS interview_questions CASCADE;
DROP TABLE IF EXISTS interviews CASCADE;
DROP TABLE IF EXISTS coding_submissions CASCADE;
DROP TABLE IF EXISTS coding_problems CASCADE;
DROP TABLE IF EXISTS saved_hackathons CASCADE;
DROP TABLE IF EXISTS hackathons CASCADE;
DROP TABLE IF EXISTS project_members CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS academic_records CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS learning_progress CASCADE;
DROP TABLE IF EXISTS learning_paths CASCADE;
DROP TABLE IF EXISTS skill_gaps CASCADE;
DROP TABLE IF EXISTS career_goals CASCADE;
DROP TABLE IF EXISTS resume_analysis CASCADE;
DROP TABLE IF EXISTS resumes CASCADE;
DROP TABLE IF EXISTS student_skills CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS faculty_profiles CASCADE;
DROP TABLE IF EXISTS student_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('STUDENT', 'FACULTY', 'ADMIN')),
    full_name VARCHAR(150) NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Student Profiles Table
CREATE TABLE student_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    college VARCHAR(255) NOT NULL DEFAULT 'Institute of Engineering & Technology',
    department VARCHAR(100) NOT NULL,
    year INT NOT NULL CHECK (year BETWEEN 1 AND 4),
    cgpa NUMERIC(4, 2) NOT NULL DEFAULT 0.00 CHECK (cgpa >= 0.00 AND cgpa <= 10.00),
    phone VARCHAR(20),
    target_career VARCHAR(100) DEFAULT 'Software Engineer',
    bio TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    career_readiness_score INT DEFAULT 50 CHECK (career_readiness_score >= 0 AND career_readiness_score <= 100),
    technical_skill_score INT DEFAULT 50 CHECK (technical_skill_score >= 0 AND technical_skill_score <= 100),
    dsa_score INT DEFAULT 50 CHECK (dsa_score >= 0 AND dsa_score <= 100),
    projects_score INT DEFAULT 50 CHECK (projects_score >= 0 AND projects_score <= 100),
    academic_score INT DEFAULT 50 CHECK (academic_score >= 0 AND academic_score <= 100),
    resume_score INT DEFAULT 50 CHECK (resume_score >= 0 AND resume_score <= 100),
    interview_score INT DEFAULT 50 CHECK (interview_score >= 0 AND interview_score <= 100),
    certifications_score INT DEFAULT 50 CHECK (certifications_score >= 0 AND certifications_score <= 100),
    attendance_percentage NUMERIC(5, 2) DEFAULT 85.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Faculty Profiles Table
CREATE TABLE faculty_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    cabin_location VARCHAR(100),
    specialization TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Skills Master Table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('PROGRAMMING', 'FRAMEWORK', 'DATABASE', 'CLOUD_DEVOPS', 'AI_ML', 'CORE_CS', 'SOFT_SKILLS')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Student Skills Association Table
CREATE TABLE student_skills (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    skill_id INT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level VARCHAR(50) NOT NULL CHECK (proficiency_level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT')),
    verified BOOLEAN DEFAULT FALSE,
    score INT DEFAULT 70 CHECK (score >= 0 AND score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, skill_id)
);

-- 6. Resumes Table
CREATE TABLE resumes (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT,
    file_type VARCHAR(50) NOT NULL,
    parsed_text TEXT,
    is_primary BOOLEAN DEFAULT TRUE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Resume Analysis Table
CREATE TABLE resume_analysis (
    id SERIAL PRIMARY KEY,
    resume_id INT NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    overall_score INT NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
    ats_compatibility_score INT NOT NULL CHECK (ats_compatibility_score >= 0 AND ats_compatibility_score <= 100),
    strengths JSONB NOT NULL DEFAULT '[]',
    weaknesses JSONB NOT NULL DEFAULT '[]',
    missing_skills JSONB NOT NULL DEFAULT '[]',
    recommended_improvements JSONB NOT NULL DEFAULT '[]',
    ats_suggestions JSONB NOT NULL DEFAULT '[]',
    career_suggestions JSONB NOT NULL DEFAULT '[]',
    optimized_markdown TEXT,
    analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Career Goals Table
CREATE TABLE career_goals (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    target_role VARCHAR(100) NOT NULL,
    target_companies JSONB DEFAULT '[]',
    target_date DATE,
    status VARCHAR(50) DEFAULT 'IN_PROGRESS' CHECK (status IN ('NOT_STARTED', 'IN_PROGRESS', 'ACHIEVED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Skill Gaps Table
CREATE TABLE skill_gaps (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    target_role VARCHAR(100) NOT NULL,
    current_level VARCHAR(50),
    required_level VARCHAR(50),
    skill_name VARCHAR(100) NOT NULL,
    priority VARCHAR(20) DEFAULT 'HIGH' CHECK (priority IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
    gap_score INT DEFAULT 40 CHECK (gap_score >= 0 AND gap_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Learning Paths Table
CREATE TABLE learning_paths (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_role VARCHAR(100) NOT NULL,
    estimated_months INT DEFAULT 6,
    total_modules INT DEFAULT 6,
    completed_modules INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Learning Progress / Milestones Table
CREATE TABLE learning_progress (
    id SERIAL PRIMARY KEY,
    learning_path_id INT NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    month_number INT NOT NULL,
    topic VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty VARCHAR(50) CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
    estimated_hours INT DEFAULT 20,
    resources JSONB DEFAULT '[]',
    practice_tasks JSONB DEFAULT '[]',
    is_completed BOOLEAN DEFAULT FALSE,
    completion_percentage INT DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 12. Subjects Master Table
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 8),
    credits INT DEFAULT 4,
    faculty_id INT REFERENCES faculty_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Academic Records Table
CREATE TABLE academic_records (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    subject_id INT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    semester INT NOT NULL,
    internal_marks NUMERIC(5, 2) DEFAULT 0.00,
    assignment_marks NUMERIC(5, 2) DEFAULT 0.00,
    exam_marks NUMERIC(5, 2) DEFAULT 0.00,
    total_marks NUMERIC(5, 2) DEFAULT 0.00,
    grade VARCHAR(5) DEFAULT 'A',
    ai_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, subject_id, semester)
);

-- 14. Attendance Table
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    subject_id INT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    total_classes INT DEFAULT 40,
    attended_classes INT DEFAULT 35,
    attendance_percentage NUMERIC(5, 2) GENERATED ALWAYS AS (ROUND((attended_classes::numeric / NULLIF(total_classes, 0)::numeric) * 100, 2)) STORED,
    last_updated_by INT REFERENCES faculty_profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, subject_id)
);

-- 15. Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN ('AI_ML', 'WEB_DEV', 'MOBILE_DEV', 'CLOUD_DEVOPS', 'CYBERSECURITY', 'IOT', 'BLOCKCHAIN')),
    tech_stack JSONB DEFAULT '[]',
    difficulty VARCHAR(50) CHECK (difficulty IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')),
    team_size INT DEFAULT 4,
    github_url TEXT,
    demo_url TEXT,
    status VARCHAR(50) DEFAULT 'IN_PROGRESS' CHECK (status IN ('PLANNING', 'IN_PROGRESS', 'COMPLETED')),
    created_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. Project Members Table
CREATE TABLE project_members (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(100) DEFAULT 'Collaborator',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, user_id)
);

-- 17. Hackathons Table
CREATE TABLE hackathons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    organizer VARCHAR(200) NOT NULL,
    description TEXT,
    date_start TIMESTAMP WITH TIME ZONE NOT NULL,
    date_end TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(200) NOT NULL DEFAULT 'Online',
    mode VARCHAR(50) DEFAULT 'ONLINE' CHECK (mode IN ('ONLINE', 'OFFLINE', 'HYBRID')),
    prize_pool VARCHAR(100),
    required_skills JSONB DEFAULT '[]',
    registration_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    max_team_size INT DEFAULT 4,
    registration_url TEXT,
    banner_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. Saved Hackathons Table
CREATE TABLE saved_hackathons (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    hackathon_id INT NOT NULL REFERENCES hackathons(id) ON DELETE CASCADE,
    is_registered BOOLEAN DEFAULT FALSE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, hackathon_id)
);

-- 19. Coding Problems Table
CREATE TABLE coding_problems (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    topic VARCHAR(100) NOT NULL CHECK (topic IN ('ARRAYS', 'STRINGS', 'LINKED_LISTS', 'STACK_QUEUE', 'TREES_GRAPHS', 'SORTING_SEARCHING', 'DYNAMIC_PROGRAMMING', 'SYSTEM_DESIGN')),
    difficulty VARCHAR(50) CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
    description TEXT NOT NULL,
    input_format TEXT,
    output_format TEXT,
    constraints TEXT,
    sample_test_cases JSONB DEFAULT '[]',
    hidden_test_cases JSONB DEFAULT '[]',
    default_starter_code JSONB DEFAULT '{}',
    acceptance_rate NUMERIC(5, 2) DEFAULT 75.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 20. Coding Submissions Table
CREATE TABLE coding_submissions (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    problem_id INT NOT NULL REFERENCES coding_problems(id) ON DELETE CASCADE,
    language VARCHAR(50) NOT NULL CHECK (language IN ('python', 'java', 'cpp', 'javascript')),
    submitted_code TEXT NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('ACCEPTED', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'COMPILE_ERROR')),
    execution_time_ms INT DEFAULT 45,
    memory_kb INT DEFAULT 14200,
    test_cases_passed INT DEFAULT 5,
    total_test_cases INT DEFAULT 5,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 21. Interviews Table
CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    mode VARCHAR(50) NOT NULL CHECK (mode IN ('TECHNICAL', 'HR', 'BEHAVIORAL', 'RESUME_BASED')),
    target_role VARCHAR(100) NOT NULL,
    overall_readiness_score INT DEFAULT 0 CHECK (overall_readiness_score >= 0 AND overall_readiness_score <= 100),
    communication_score INT DEFAULT 0 CHECK (communication_score >= 0 AND communication_score <= 100),
    technical_depth_score INT DEFAULT 0 CHECK (technical_depth_score >= 0 AND technical_depth_score <= 100),
    confidence_score INT DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
    summary_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 22. Interview Questions & Answers
CREATE TABLE interview_questions (
    id SERIAL PRIMARY KEY,
    interview_id INT NOT NULL REFERENCES interviews(id) ON DELETE CASCADE,
    question_order INT NOT NULL,
    question_text TEXT NOT NULL,
    category VARCHAR(100),
    expected_concepts JSONB DEFAULT '[]'
);

CREATE TABLE interview_answers (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL REFERENCES interview_questions(id) ON DELETE CASCADE,
    student_answer TEXT NOT NULL,
    score INT CHECK (score >= 0 AND score <= 100),
    feedback TEXT,
    missing_points JSONB DEFAULT '[]',
    improved_model_answer TEXT,
    communication_feedback TEXT,
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 23. Placement Applications Table
CREATE TABLE placement_applications (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    company_name VARCHAR(200) NOT NULL,
    role_title VARCHAR(150) NOT NULL,
    ctc_lpa NUMERIC(5, 2),
    location VARCHAR(150),
    applied_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'APPLIED' CHECK (status IN ('APPLIED', 'ONLINE_ASSESSMENT', 'TECHNICAL_INTERVIEW', 'HR_INTERVIEW', 'SELECTED', 'REJECTED')),
    notes TEXT,
    interview_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 24. Notifications Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(50) CHECK (category IN ('ATTENDANCE_WARNING', 'HACKATHON', 'ASSIGNMENT', 'LEARNING_MILESTONE', 'INTERVIEW_REMINDER', 'PLACEMENT_UPDATE', 'SYSTEM')),
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_student_profiles_user ON student_profiles(user_id);
CREATE INDEX idx_academic_student ON academic_records(student_id);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_coding_sub_student ON coding_submissions(student_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
