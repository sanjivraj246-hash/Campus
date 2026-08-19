-- ====================================================================
-- CampusAI – Production Demo Seed Data
-- ====================================================================

-- 1. Users (BCrypt hashed password for 'password123' is $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi)
INSERT INTO users (id, email, password_hash, role, full_name, avatar_url) VALUES
(1, 'admin@campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', 'Dr. Vikram Malhotra', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'),
(2, 'priya.sharma@campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'FACULTY', 'Prof. Priya Sharma', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'),
(3, 'rajesh.verma@campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'FACULTY', 'Dr. Rajesh Verma', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'),
(4, 'ananya.iyer@campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'FACULTY', 'Dr. Ananya Iyer', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150'),
-- 10 Students
(5, 'aarav.patel@student.campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Aarav Patel', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
(6, 'diya.nair@student.campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Diya Nair', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
(7, 'rohan.gupta@student.campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Rohan Gupta', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
(8, 'sneha.reddy@student.campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Sneha Reddy', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
(9, 'vikram.singh@student.campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Vikram Singh', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'),
(10, 'meera.joshi@student.campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Meera Joshi', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'),
(11, 'karthik.s@student.campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Karthik Subramanian', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150'),
(12, 'ananya.deshmukh@student.campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Ananya Deshmukh', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150'),
(13, 'aditya.sharma@student.campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Aditya Sharma', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150'),
(14, 'pooja.verma@student.campusiq.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', 'Pooja Verma', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150')
ON CONFLICT (id) DO NOTHING;

-- Reset user sequence
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

-- 2. Faculty Profiles
INSERT INTO faculty_profiles (id, user_id, department, designation, cabin_location, specialization, phone) VALUES
(1, 2, 'Computer Science & Engineering', 'Professor & Head of Dept', 'CS-Block Room 301', 'Artificial Intelligence & Distributed Systems', '+91 98765 43210'),
(2, 3, 'Computer Science & Engineering', 'Associate Professor', 'CS-Block Room 204', 'Machine Learning, Data Structures & Algorithms', '+91 98765 43211'),
(3, 4, 'Information Technology', 'Assistant Professor', 'IT-Block Room 102', 'Cloud Computing, DevOps & Cyber Security', '+91 98765 43212')
ON CONFLICT (id) DO NOTHING;

SELECT setval('faculty_profiles_id_seq', (SELECT MAX(id) FROM faculty_profiles));

-- 3. Student Profiles
INSERT INTO student_profiles (id, user_id, college, department, year, cgpa, phone, target_career, bio, github_url, linkedin_url, portfolio_url, career_readiness_score, technical_skill_score, dsa_score, projects_score, academic_score, resume_score, interview_score, certifications_score, attendance_percentage) VALUES
(1, 5, 'MIT Institute of Technology', 'Computer Science & Engineering', 3, 8.85, '+91 91234 56789', 'Full Stack Developer', 'Aspiring full-stack engineer passionate about React, Spring Boot, and cloud architecture.', 'https://github.com/aaravpatel', 'https://linkedin.com/in/aaravpatel', 'https://aaravpatel.dev', 78, 82, 68, 75, 88, 82, 65, 70, 89.50),
(2, 6, 'MIT Institute of Technology', 'Computer Science & Engineering', 4, 9.20, '+91 91234 56780', 'AI Engineer', 'Deep learning & NLP enthusiast, building generative AI agents and autonomous research assistants.', 'https://github.com/diyanair', 'https://linkedin.com/in/diyanair', 'https://diya.ai', 89, 92, 85, 90, 92, 90, 84, 85, 94.00),
(3, 7, 'MIT Institute of Technology', 'Information Technology', 3, 7.45, '+91 91234 56781', 'Cloud Engineer', 'Cloud infrastructure engineer focused on AWS, Kubernetes, Terraform and CI/CD pipelines.', 'https://github.com/rohangupta', 'https://linkedin.com/in/rohangupta', 'https://rohan.cloud', 68, 70, 58, 65, 74, 75, 60, 80, 72.00),
(4, 8, 'MIT Institute of Technology', 'Computer Science & Engineering', 4, 8.60, '+91 91234 56782', 'Software Engineer', 'Competitive programmer and backend specialist. 4-star on CodeChef, 400+ LeetCode solved.', 'https://github.com/snehareddy', 'https://linkedin.com/in/snehareddy', 'https://sneha.tech', 84, 86, 92, 78, 86, 85, 80, 75, 91.00),
(5, 9, 'MIT Institute of Technology', 'Data Science & AI', 2, 7.10, '+91 91234 56783', 'Data Analyst', 'Exploring SQL, Python, PowerBI, and predictive statistical modeling.', 'https://github.com/vikramsingh', 'https://linkedin.com/in/vikramsingh', 'https://vikram-data.me', 58, 62, 50, 55, 71, 60, 52, 60, 68.50),
(6, 10, 'MIT Institute of Technology', 'Computer Science & Engineering', 3, 8.95, '+91 91234 56784', 'Full Stack Developer', 'Frontend perfectionist & UI/UX explorer. Loves Next.js, WebGL, and micro-frontends.', 'https://github.com/meerajoshi', 'https://linkedin.com/in/meerajoshi', 'https://meera.design', 81, 85, 72, 88, 89, 86, 74, 80, 93.00),
(7, 11, 'MIT Institute of Technology', 'Information Technology', 3, 6.80, '+91 91234 56785', 'DevOps Engineer', 'Linux nerd and Docker enthusiast. Automating deployments and monitoring system telemetry.', 'https://github.com/karthiks', 'https://linkedin.com/in/karthiks', 'https://karthik.ops', 62, 68, 48, 62, 68, 65, 55, 70, 71.50),
(8, 12, 'MIT Institute of Technology', 'Computer Science & Engineering', 4, 9.40, '+91 91234 56786', 'Software Engineer', 'Incoming SDE Intern. Strong foundations in distributed systems and systems programming in Go/C++.', 'https://github.com/ananyad', 'https://linkedin.com/in/ananyad', 'https://ananya.codes', 93, 95, 94, 92, 94, 92, 90, 90, 96.00),
(9, 13, 'MIT Institute of Technology', 'Electronics & Computer Eng', 2, 7.80, '+91 91234 56787', 'Cybersecurity Analyst', 'Security researcher, CTF player, and reverse engineering enthusiast.', 'https://github.com/adityasharma', 'https://linkedin.com/in/adityasharma', 'https://aditya-sec.io', 65, 70, 55, 60, 78, 68, 58, 65, 82.00),
(10, 14, 'MIT Institute of Technology', 'Computer Science & Engineering', 3, 8.30, '+91 91234 56788', 'Mobile App Developer', 'Flutter and React Native developer building smooth cross-platform experiences.', 'https://github.com/poojaverma', 'https://linkedin.com/in/poojaverma', 'https://pooja.app', 75, 78, 64, 80, 83, 80, 70, 70, 88.00)
ON CONFLICT (id) DO NOTHING;

SELECT setval('student_profiles_id_seq', (SELECT MAX(id) FROM student_profiles));

-- 4. Skills Master Catalog
INSERT INTO skills (id, name, category, description) VALUES
(1, 'Java', 'PROGRAMMING', 'Core Java, OOP, JVM internals, multithreading, and collections framework'),
(2, 'Python', 'PROGRAMMING', 'Python 3, async programming, data structures, scientific stack'),
(3, 'JavaScript / TypeScript', 'PROGRAMMING', 'Modern ESNext, TypeScript strict typing, asynchronous event loop'),
(4, 'C++', 'PROGRAMMING', 'Modern C++17/20, STL, memory management, pointers, and algorithms'),
(5, 'React / Next.js', 'FRAMEWORK', 'React 18/19, Next.js App Router, SSR, Server Components, State Management'),
(6, 'Spring Boot', 'FRAMEWORK', 'Spring Boot 3, Spring Data JPA, Spring Security, Microservices'),
(7, 'Node.js / Express', 'FRAMEWORK', 'RESTful API development, middleware, event emitters, stream processing'),
(8, 'FastAPI', 'FRAMEWORK', 'High performance async Python framework for AI & ML services'),
(9, 'PostgreSQL', 'DATABASE', 'Relational database modeling, indexing, query optimization, triggers'),
(10, 'MongoDB', 'DATABASE', 'NoSQL document database, aggregation pipelines, replica sets'),
(11, 'Redis', 'DATABASE', 'In-memory data structure store, caching, pub/sub, rate limiting'),
(12, 'Docker & Kubernetes', 'CLOUD_DEVOPS', 'Containerization, multi-stage builds, orchestration, Helm charts, ingress'),
(13, 'AWS Cloud', 'CLOUD_DEVOPS', 'EC2, S3, RDS, Lambda, ECS, CloudFront, IAM security policies'),
(14, 'Data Structures & Algorithms', 'CORE_CS', 'Arrays, Trees, Graphs, Dynamic Programming, Greedy, Graph Algorithms'),
(15, 'System Design', 'CORE_CS', 'High-level & low-level architecture, scalability, load balancing, caching, CAP theorem'),
(16, 'Machine Learning & Deep Learning', 'AI_ML', 'Supervised/Unsupervised ML, PyTorch, Transformers, LLM prompt engineering, RAG'),
(17, 'Communication & Soft Skills', 'SOFT_SKILLS', 'Technical articulation, behavioral interviews, storytelling, leadership')
ON CONFLICT (id) DO NOTHING;

SELECT setval('skills_id_seq', (SELECT MAX(id) FROM skills));

-- 5. Student Skills for Aarav Patel (Student 1)
INSERT INTO student_skills (student_id, skill_id, proficiency_level, verified, score) VALUES
(1, 3, 'ADVANCED', true, 85),
(1, 5, 'INTERMEDIATE', true, 78),
(1, 1, 'INTERMEDIATE', true, 72),
(1, 6, 'BEGINNER', false, 55),
(1, 9, 'INTERMEDIATE', true, 80),
(1, 14, 'INTERMEDIATE', true, 68),
(1, 15, 'BEGINNER', false, 45),
(1, 17, 'INTERMEDIATE', true, 65)
ON CONFLICT DO NOTHING;

-- 6. Resumes & Resume Analysis for Student 1
INSERT INTO resumes (id, student_id, file_name, file_url, file_type, parsed_text, is_primary) VALUES
(1, 1, 'Aarav_Patel_FullStack_Resume.pdf', '/resumes/aarav_patel.pdf', 'application/pdf', 
'Aarav Patel | Full Stack Developer | aarav.patel@student.campusiq.edu | +91 91234 56789 | Bangalore, India
EDUCATION: B.Tech Computer Science (2023 - 2027) - CGPA: 8.85 / 10.0
TECHNICAL SKILLS: React, Next.js, JavaScript, TypeScript, Java, Spring Boot basics, PostgreSQL, Tailwind CSS, Git
PROJECTS:
1. DevFlow - Developer Collaboration Platform (React, Node.js, Socket.io, MongoDB) - Real-time coding rooms, WebSockets.
2. AI Campus Portal - Smart notes search with vector embeddings and Next.js frontend.
INTERNSHIPS: Web Developer Intern at TechNova (3 months) - Built customer portal in Next.js.', true)
ON CONFLICT (id) DO NOTHING;

SELECT setval('resumes_id_seq', (SELECT MAX(id) FROM resumes));

INSERT INTO resume_analysis (id, resume_id, overall_score, ats_compatibility_score, strengths, weaknesses, missing_skills, recommended_improvements, ats_suggestions, career_suggestions, optimized_markdown) VALUES
(1, 1, 82, 85, 
'["Strong academic credentials (8.85 CGPA)", "Clear full-stack project portfolio with live tech stacks", "Clean single-column layout suitable for ATS parsers", "Quantified internship achievements"]',
'["Missing containerization (Docker) and Cloud deployment mentions", "Lack of unit test coverage and CI/CD pipeline experience", "DSA problem solving achievements not explicitly highlighted"]',
'["Docker & Kubernetes", "AWS / GCP Deployment", "Redis Caching", "Microservices Architecture", "JUnit / Jest Testing"]',
'["Include metrics like \"improved query response time by 40%\" on DevFlow project", "Add links to live demo deployments alongside GitHub URLs", "List Docker & AWS under DevOps tools"]',
'["Use standard ATS section headings: WORK EXPERIENCE, TECHNICAL SKILLS, EDUCATION", "Avoid multi-column tables and complex graphic icons for parser readability"]',
'["Target Tier-1 MNC Software Engineering roles (Product Base)", "Contribute to open source full-stack projects to boost recruiter visibility"]',
'# Aarav Patel
**Full Stack Software Engineer**
Email: aarav.patel@student.campusiq.edu | Phone: +91 91234 56789 | LinkedIn: linkedin.com/in/aaravpatel | GitHub: github.com/aaravpatel

---
## Summary
Results-driven Computer Science undergraduate (CGPA: 8.85) with hands-on experience building scalable React, TypeScript, and Java Spring Boot applications. Proven track record building real-time collaboration tools and AI integrations.

## Technical Skills
- **Languages:** JavaScript (ES6+), TypeScript, Java, Python, SQL
- **Frontend:** React.js, Next.js 14, Tailwind CSS, Redux Toolkit, HTML5/CSS3
- **Backend & DB:** Spring Boot, Node.js, Express, PostgreSQL, MongoDB, Redis
- **DevOps & Tools:** Docker, Git/GitHub, Postman, Vercel, AWS S3/EC2 Basics

## Experience
**Web Development Intern** — TechNova Solutions *(Jun 2025 – Aug 2025)*
- Engineered responsive client dashboard using Next.js and TypeScript, reducing page load latency by 35%.
- Integrated RESTful APIs and implemented secure JWT-based session management for 10,000+ active users.

## Key Projects
**DevFlow — Real-Time Developer Collaboration Hub** *(React, Node.js, WebSockets, PostgreSQL)*
- Architected collaborative code editor with sub-50ms latency using WebSocket rooms.
- Built role-based access control and database migrations using Prisma and PostgreSQL.

**CampusAI — Intelligence & Placement Platform** *(Next.js, Spring Boot, FastAPI, PostgreSQL)*
- Integrated machine learning recommendation pipelines for student skill-gap analysis.')
ON CONFLICT (id) DO NOTHING;

SELECT setval('resume_analysis_id_seq', (SELECT MAX(id) FROM resume_analysis));

-- 7. Skill Gaps for Aarav Patel
INSERT INTO skill_gaps (student_id, target_role, current_level, required_level, skill_name, priority, gap_score) VALUES
(1, 'Full Stack Developer', 'Intermediate', 'Advanced', 'React & Next.js Ecosystem', 'MEDIUM', 25),
(1, 'Full Stack Developer', 'Beginner', 'Advanced', 'Spring Boot & Microservices', 'CRITICAL', 65),
(1, 'Full Stack Developer', 'Beginner', 'Intermediate', 'Docker & Containerization', 'HIGH', 55),
(1, 'Full Stack Developer', 'Beginner', 'Advanced', 'System Design & High Availability', 'CRITICAL', 70),
(1, 'Full Stack Developer', 'Intermediate', 'Advanced', 'DSA & Problem Solving', 'HIGH', 40),
(1, 'Full Stack Developer', 'Beginner', 'Intermediate', 'Cloud (AWS/GCP)', 'HIGH', 60)
ON CONFLICT DO NOTHING;

-- 8. Learning Paths & Modules for Aarav Patel
INSERT INTO learning_paths (id, student_id, title, description, target_role, estimated_months, total_modules, completed_modules) VALUES
(1, 1, 'Full Stack Product Engineer Mastery', 'Comprehensive 6-month roadmap designed to master Spring Boot, Next.js, Cloud deployment, and enterprise System Design.', 'Full Stack Developer', 6, 6, 2)
ON CONFLICT (id) DO NOTHING;

SELECT setval('learning_paths_id_seq', (SELECT MAX(id) FROM learning_paths));

INSERT INTO learning_progress (learning_path_id, month_number, topic, description, difficulty, estimated_hours, resources, practice_tasks, is_completed, completion_percentage, completed_at) VALUES
(1, 1, 'Month 1: Advanced TypeScript & Modern React Architecture', 'Master React 19 hooks, concurrency, server actions, caching, and state machines.', 'MEDIUM', 24, 
'[{"title": "React Deep Dive Documentation", "url": "https://react.dev"}, {"title": "TypeScript Handbook", "url": "https://www.typescriptlang.org/docs/"}]', 
'["Build a custom Kanban board with optimistic UI updates", "Implement custom debounce and throttle hooks in TypeScript"]', true, 100, CURRENT_TIMESTAMP - INTERVAL '60 days'),

(1, 2, 'Month 2: Data Structures & Algorithms Sprint', 'Solve 75 curated LeetCode problems focusing on Graphs, Trees, and Dynamic Programming.', 'HARD', 35, 
'[{"title": "NeetCode 150 Guide", "url": "https://neetcode.io"}, {"title": "MIT 6.006 Algorithms", "url": "https://ocw.mit.edu"}]', 
'["Solve 20 Tree problems on LeetCode", "Implement Dijkstra and Topological Sort from scratch"]', true, 100, CURRENT_TIMESTAMP - INTERVAL '30 days'),

(1, 3, 'Month 3: Spring Boot 3 & Enterprise Architecture', 'Deep dive into Spring Data JPA, Hibernate optimization, Spring Security with JWT, and OpenAPI specs.', 'HARD', 30, 
'[{"title": "Spring Boot Reference Guide", "url": "https://spring.io/projects/spring-boot"}, {"title": "Baeldung Spring Boot Masterclass", "url": "https://www.baeldung.com"}]', 
'["Build a multi-tenant SaaS REST API with Spring Security and PostgreSQL", "Implement pagination, sorting, and custom query specifications"]', false, 45, NULL),

(1, 4, 'Month 4: Relational Database Tuning & Redis Caching', 'PostgreSQL indexing strategies, EXPLAIN ANALYZE, connection pooling, and Redis distributed caching.', 'MEDIUM', 20, 
'[{"title": "Use The Index, Luke!", "url": "https://use-the-index-luke.com"}, {"title": "Redis University", "url": "https://university.redis.com"}]', 
'["Set up Redis caching for hot product listings", "Benchmark database query execution times before and after B-Tree indexes"]', false, 0, NULL),

(1, 5, 'Month 5: Docker, CI/CD & Cloud Deployment', 'Containerize full-stack apps with multi-stage Dockerfiles, GitHub Actions CI/CD, and AWS ECS/S3 deployment.', 'MEDIUM', 25, 
'[{"title": "Docker Official Documentation", "url": "https://docs.docker.com"}, {"title": "AWS Cloud Practitioner Essentials", "url": "https://aws.amazon.com/training/"}]', 
'["Write GitHub Actions workflow to run lint, test, and push Docker image", "Deploy Spring Boot + Next.js app to AWS with SSL certificates"]', false, 0, NULL),

(1, 6, 'Month 6: System Design & Mock MNC Interviews', 'High-level architectures: Rate limiters, URL shorteners, distributed notification queues, and mock interviews.', 'HARD', 30, 
'[{"title": "System Design Primer by Donne Martin", "url": "https://github.com/donnemartin/system-design-primer"}, {"title": "ByteByteGo Architecture Guide", "url": "https://bytebytego.com"}]', 
'["Design a scalable video streaming platform architecture diagram", "Complete 5 mock AI technical & behavioral interview rounds"]', false, 0, NULL)
ON CONFLICT DO NOTHING;

-- 9. Subjects Master
INSERT INTO subjects (id, code, name, department, semester, credits, faculty_id) VALUES
(1, 'CS301', 'Data Structures & Algorithms', 'Computer Science & Engineering', 5, 4, 2),
(2, 'CS302', 'Database Management Systems', 'Computer Science & Engineering', 5, 4, 1),
(3, 'CS303', 'Operating Systems & Concurrency', 'Computer Science & Engineering', 5, 3, 3),
(4, 'CS304', 'Web Technologies & Cloud Arch', 'Computer Science & Engineering', 5, 4, 1),
(5, 'CS305', 'Computer Networks & Security', 'Computer Science & Engineering', 5, 3, 3),
(6, 'CS306', 'Artificial Intelligence & Machine Learning', 'Computer Science & Engineering', 5, 4, 2)
ON CONFLICT (id) DO NOTHING;

SELECT setval('subjects_id_seq', (SELECT MAX(id) FROM subjects));

-- 10. Academic Records for Student 1
INSERT INTO academic_records (student_id, subject_id, semester, internal_marks, assignment_marks, exam_marks, total_marks, grade, ai_feedback) VALUES
(1, 1, 5, 26.50, 18.00, 42.50, 87.00, 'A+', 'Strong grasp of graph traversals and sorting; recommend revising dynamic programming memoization patterns.'),
(1, 2, 5, 28.00, 19.50, 45.00, 92.50, 'O', 'Exceptional performance in relational normalization and query execution planning.'),
(1, 3, 5, 24.00, 16.00, 38.00, 78.00, 'A', 'Good understanding of process synchronization; review virtual memory paging concepts.'),
(1, 4, 5, 29.00, 20.00, 46.00, 95.00, 'O', 'Top in class for full-stack API integration and client-side state handling.'),
(1, 5, 5, 22.00, 15.00, 35.00, 72.00, 'B+', 'Alert: Performance in Network Protocol layers dropped by 12% in Midterm 2. Recommended revision: TCP 3-way handshake and subnetting.')
ON CONFLICT DO NOTHING;

-- 11. Attendance Records for Student 1
INSERT INTO attendance (student_id, subject_id, total_classes, attended_classes, last_updated_by) VALUES
(1, 1, 42, 38, 2),
(1, 2, 40, 38, 1),
(1, 3, 38, 33, 3),
(1, 4, 44, 42, 1),
(1, 5, 36, 31, 3),
(1, 6, 40, 36, 2)
ON CONFLICT DO NOTHING;

-- 12. Projects
INSERT INTO projects (id, title, description, category, tech_stack, difficulty, team_size, github_url, demo_url, status, created_by) VALUES
(1, 'AI Resume & ATS Intelligence Engine', 'Next-generation resume parser with NLP scoring, keyword extraction, and ATS compliance recommendations.', 'AI_ML', '["FastAPI", "Python", "spaCy", "React", "Tailwind CSS"]', 'INTERMEDIATE', 3, 'https://github.com/campusiq/resume-ai', 'https://resume.campusiq.edu', 'COMPLETED', 5),
(2, 'Campus Emergency & Safety Grid', 'Real-time incident reporting and campus alert broadcasting with geolocation telemetry and WebSockets.', 'WEB_DEV', '["Next.js", "Node.js", "Socket.io", "PostgreSQL", "Leaflet"]', 'ADVANCED', 4, 'https://github.com/campusiq/campus-safety', 'https://safety.campusiq.edu', 'IN_PROGRESS', 5),
(3, 'Cloud-Native Automated Attendance System', 'Facial recognition attendance system with edge computing cameras and automated SMS alerts to parents.', 'AI_ML', '["Python", "OpenCV", "AWS Lambda", "DynamoDB", "FastAPI"]', 'ADVANCED', 4, 'https://github.com/campusiq/facial-attendance', 'https://attend.campusiq.edu', 'IN_PROGRESS', 6),
(4, 'Distributed Micro-Services E-Commerce Platform', 'High-throughput e-commerce core with Kafka event streaming, Redis caching, and resilient circuit breakers.', 'CLOUD_DEVOPS', '["Spring Boot 3", "Apache Kafka", "PostgreSQL", "Docker", "Kubernetes"]', 'ADVANCED', 3, 'https://github.com/campusiq/micro-shop', 'https://shop.campusiq.dev', 'PLANNING', 7),
(5, 'Blockchain Academic Credential Verifier', 'Tamper-proof smart contract registry on Polygon to verify university transcripts and degrees instantly.', 'BLOCKCHAIN', '["Solidity", "Hardhat", "Polygon", "Next.js", "Ethers.js"]', 'INTERMEDIATE', 2, 'https://github.com/campusiq/vericred', 'https://vericred.campusiq.edu', 'COMPLETED', 8)
ON CONFLICT (id) DO NOTHING;

SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));

-- 13. Hackathons
INSERT INTO hackathons (id, name, organizer, description, date_start, date_end, location, mode, prize_pool, required_skills, registration_deadline, max_team_size, registration_url, banner_url) VALUES
(1, 'Smart India Hackathon 2026', 'Ministry of Education & AICTE', 'Nationwide digital initiative solving real-world challenges across education, health, smart cities, and AI.', CURRENT_TIMESTAMP + INTERVAL '14 days', CURRENT_TIMESTAMP + INTERVAL '16 days', 'New Delhi & Virtual Nodal Centers', 'HYBRID', '₹1,00,000 per problem', '["React", "Python", "Cloud", "AI/ML", "IoT"]', CURRENT_TIMESTAMP + INTERVAL '5 days', 6, 'https://sih.gov.in', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600'),
(2, 'Google Cloud AI Global Hackathon', 'Google Cloud Platform', 'Build generative AI applications using Gemini 1.5 Pro, Vertex AI, and Google Cloud Run for social good.', CURRENT_TIMESTAMP + INTERVAL '21 days', CURRENT_TIMESTAMP + INTERVAL '23 days', 'Online (Global)', 'ONLINE', '$50,000 USD', '["Gemini API", "FastAPI", "Next.js", "Docker"]', CURRENT_TIMESTAMP + INTERVAL '12 days', 4, 'https://cloud.google.com/hackathons', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600'),
(3, 'Microsoft Imagine Cup 2026', 'Microsoft Corporation', 'Empowering student developers worldwide to bring tech solutions solving sustainability and accessibility.', CURRENT_TIMESTAMP + INTERVAL '35 days', CURRENT_TIMESTAMP + INTERVAL '38 days', 'Redmond, WA / Virtual', 'HYBRID', '$100,000 USD + Mentorship', '["Azure", "C#", "Python", "React", "AI"]', CURRENT_TIMESTAMP + INTERVAL '20 days', 4, 'https://imaginecup.microsoft.com', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600'),
(4, 'ETHIndia 2026 Hackathon', 'Devfolio & ETHGlobal', 'Asia’s largest Ethereum hackathon bringing together 2,000+ builders to create decentralized futures.', CURRENT_TIMESTAMP + INTERVAL '45 days', CURRENT_TIMESTAMP + INTERVAL '47 days', 'KTPO Bangalore, India', 'OFFLINE', '$120,000 in bounties', '["Solidity", "Web3.js", "React", "Zero Knowledge"]', CURRENT_TIMESTAMP + INTERVAL '25 days', 4, 'https://ethindia.co', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600')
ON CONFLICT (id) DO NOTHING;

SELECT setval('hackathons_id_seq', (SELECT MAX(id) FROM hackathons));

-- 14. Coding Problems
INSERT INTO coding_problems (id, title, slug, topic, difficulty, description, input_format, output_format, constraints, sample_test_cases, hidden_test_cases, default_starter_code, acceptance_rate) VALUES
(1, 'Two Sum Target Index', 'two-sum', 'ARRAYS', 'EASY', 
'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
'nums = [2,7,11,15], target = 9',
'[0,1]',
'2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9',
'[{"input": "[2,7,11,15], target = 9", "output": "[0,1]"}, {"input": "[3,2,4], target = 6", "output": "[1,2]"}]',
'[]',
'{"javascript": "function twoSum(nums, target) {\n    // Write your code here\n    const map = new Map();\n    for(let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if(map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}", "python": "def two_sum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []", "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) return new int[] { map.get(comp), i };\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}"}', 88.50),

(2, 'Valid Parentheses Matching', 'valid-parentheses', 'STACK_QUEUE', 'EASY', 
'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order.',
's = "()[]{}"',
'true',
'1 <= s.length <= 10^4\ns consists of parentheses only',
'[{"input": "\"()[]{}\"", "output": "true"}, {"input": "\"(]\"", "output": "false"}]',
'[]',
'{"javascript": "function isValid(s) {\n    const stack = [];\n    const map = {\")\": \"(\", \"}\": \"{\", \"]\": \"[\"};\n    for (let char of s) {\n        if (!map[char]) stack.push(char);\n        else if (stack.pop() !== map[char]) return false;\n    }\n    return stack.length === 0;\n}", "python": "def is_valid(s: str) -> bool:\n    stack = []\n    mapping = {\")\": \"(\", \"}\": \"{\", \"]\": \"[\"}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else \"#\"\n            if mapping[char] != top:\n                return False\n        else:\n            stack.append(char)\n    return not stack"}', 82.10),

(3, 'Longest Substring Without Repeating Characters', 'longest-substring-without-repeats', 'STRINGS', 'MEDIUM', 
'Given a string `s`, find the length of the longest substring without repeating characters.',
's = "abcabcbb"',
'3',
'0 <= s.length <= 5 * 10^4',
'[{"input": "\"abcabcbb\"", "output": "3"}, {"input": "\"bbbbb\"", "output": "1"}]',
'[]',
'{"javascript": "function lengthOfLongestSubstring(s) {\n    let set = new Set();\n    let left = 0, maxLen = 0;\n    for(let right = 0; right < s.length; right++) {\n        while(set.has(s[right])) {\n            set.delete(s[left]);\n            left++;\n        }\n        set.add(s[right]);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}", "python": "def length_of_longest_substring(s: str) -> int:\n    char_set = set()\n    left = 0\n    res = 0\n    for right in range(len(s)):\n        while s[right] in char_set:\n            char_set.remove(s[left])\n            left += 1\n        char_set.add(s[right])\n        res = max(res, right - left + 1)\n    return res"}', 74.30),

(4, 'Coin Change Dynamic Programming', 'coin-change', 'DYNAMIC_PROGRAMMING', 'MEDIUM', 
'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount.',
'coins = [1,2,5], amount = 11',
'3',
'1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4',
'[{"input": "coins = [1,2,5], amount = 11", "output": "3"}, {"input": "coins = [2], amount = 3", "output": "-1"}]',
'[]',
'{"javascript": "function coinChange(coins, amount) {\n    const dp = new Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (let i = 1; i <= amount; i++) {\n        for (let coin of coins) {\n            if (i - coin >= 0) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n        }\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];\n}", "python": "def coin_change(coins: list[int], amount: int) -> int:\n    dp = [float(\"inf\")] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for c in coins:\n            if i - c >= 0:\n                dp[i] = min(dp[i], dp[i - c] + 1)\n    return dp[amount] if dp[amount] != float(\"inf\") else -1"}', 65.80)
ON CONFLICT (id) DO NOTHING;

SELECT setval('coding_problems_id_seq', (SELECT MAX(id) FROM coding_problems));

-- 15. Placement Applications for Student 1
INSERT INTO placement_applications (id, student_id, company_name, role_title, ctc_lpa, location, applied_date, status, notes, interview_date) VALUES
(1, 1, 'Google India', 'Associate Software Engineer', 28.50, 'Bangalore / Hyderabad', CURRENT_DATE - INTERVAL '25 days', 'TECHNICAL_INTERVIEW', 'Passed initial OA (100% test cases). Round 2 Technical scheduled for System Design & Coding.', CURRENT_TIMESTAMP + INTERVAL '3 days'),
(2, 1, 'Microsoft', 'Software Engineer I', 26.00, 'Bangalore', CURRENT_DATE - INTERVAL '40 days', 'HR_INTERVIEW', 'Cleared Coding Round 1 & 2. Final AA / Director round upcoming.', CURRENT_TIMESTAMP + INTERVAL '6 days'),
(3, 1, 'Amazon AWS', 'Cloud Support Engineer / SDE', 22.00, 'Hyderabad', CURRENT_DATE - INTERVAL '15 days', 'ONLINE_ASSESSMENT', 'OA link received, window active for 48 hours.', CURRENT_TIMESTAMP + INTERVAL '1 days'),
(4, 1, 'Atlassian', 'Graduate Software Engineer', 32.00, 'Bengaluru (Remote)', CURRENT_DATE - INTERVAL '50 days', 'SELECTED', 'Offer Letter Released! CTC: 32 LPA (Base 18L + 12L Stocks + Joining Bonus).', NULL),
(5, 1, 'Goldman Sachs', 'Summer Technology Analyst', 24.00, 'Bangalore', CURRENT_DATE - INTERVAL '60 days', 'REJECTED', 'Fell short in Round 2 Advanced Probability / DP question.', NULL)
ON CONFLICT (id) DO NOTHING;

SELECT setval('placement_applications_id_seq', (SELECT MAX(id) FROM placement_applications));

-- 16. Notifications for Student 1
INSERT INTO notifications (user_id, title, message, category, is_read, action_url) VALUES
(5, 'Technical Interview Alert: Google India', 'Your Technical Round 2 with Google ASE hiring team is scheduled in 3 days. Review Graphs and System Design.', 'INTERVIEW_REMINDER', false, '/placements'),
(5, 'Smart India Hackathon Registration', 'Registration for SIH 2026 closes in 5 days. 2 team spots remaining in your team.', 'HACKATHON', false, '/hackathons'),
(5, 'Attendance Warning: Computer Networks', 'Your attendance in Computer Networks (CS305) is 86.1%. Maintain above 75% to avoid exam eligibility hold.', 'ATTENDANCE_WARNING', true, '/attendance'),
(5, 'AI Learning Roadmap Milestone Unlocked', 'Congratulations! You completed Month 2: DSA Sprint. Career readiness increased +4%.', 'LEARNING_MILESTONE', true, '/learning-path'),
(5, 'Placement Offer Released: Atlassian', 'Congratulations Aarav! Atlassian has released your formal offer letter for 32 LPA.', 'PLACEMENT_UPDATE', false, '/placements')
ON CONFLICT DO NOTHING;
