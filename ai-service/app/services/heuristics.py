import re
from typing import List, Dict, Any
from app.models.schemas import (
    ResumeAnalysisResponse, SkillGapResponse, SkillGapItem,
    LearningPathResponse, RoadmapModule, InterviewQuestion,
    InterviewEvaluateResponse, CareerMentorResponse, ReadinessScoreResponse,
    RecommendedProject
)

ROLE_SKILL_REQUIREMENTS = {
    "Full Stack Developer": {
        "required": ["JavaScript / TypeScript", "React / Next.js", "Node.js / Express", "Spring Boot", "PostgreSQL", "Data Structures & Algorithms", "Docker & Kubernetes", "System Design"],
        "levels": {"JavaScript / TypeScript": "Advanced", "React / Next.js": "Advanced", "Node.js / Express": "Intermediate", "Spring Boot": "Intermediate", "PostgreSQL": "Intermediate", "Data Structures & Algorithms": "Advanced", "Docker & Kubernetes": "Intermediate", "System Design": "Intermediate"}
    },
    "Software Engineer": {
        "required": ["Java", "C++", "Python", "Data Structures & Algorithms", "System Design", "PostgreSQL", "Operating Systems & Concurrency", "Computer Networks & Security"],
        "levels": {"Java": "Advanced", "Data Structures & Algorithms": "Advanced", "System Design": "Advanced", "PostgreSQL": "Intermediate", "Operating Systems & Concurrency": "Intermediate"}
    },
    "Cloud Engineer": {
        "required": ["Docker & Kubernetes", "AWS Cloud", "Linux & Shell Scripting", "Terraform / IaC", "Python", "Computer Networks & Security", "CI/CD Pipelines"],
        "levels": {"Docker & Kubernetes": "Advanced", "AWS Cloud": "Advanced", "Linux & Shell Scripting": "Advanced", "Python": "Intermediate"}
    },
    "AI Engineer": {
        "required": ["Python", "Machine Learning & Deep Learning", "PyTorch / TensorFlow", "FastAPI", "PostgreSQL", "Data Structures & Algorithms", "Transformers & LLMs"],
        "levels": {"Python": "Advanced", "Machine Learning & Deep Learning": "Advanced", "FastAPI": "Intermediate", "Transformers & LLMs": "Intermediate"}
    },
    "Data Analyst": {
        "required": ["SQL & PostgreSQL", "Python", "Pandas & NumPy", "PowerBI / Tableau", "Statistical Analysis", "Data Warehousing"],
        "levels": {"SQL & PostgreSQL": "Advanced", "Python": "Intermediate", "PowerBI / Tableau": "Advanced"}
    },
    "DevOps Engineer": {
        "required": ["Docker & Kubernetes", "AWS Cloud", "Linux & Shell Scripting", "GitHub Actions CI/CD", "Prometheus & Grafana", "Terraform"],
        "levels": {"Docker & Kubernetes": "Advanced", "Linux & Shell Scripting": "Advanced", "AWS Cloud": "Intermediate"}
    }
}

def analyze_resume_text(resume_text: str, target_role: str = "Full Stack Developer", cgpa: float = 8.5) -> ResumeAnalysisResponse:
    text_lower = resume_text.lower() if resume_text else ""
    
    # Check key skills
    all_known_skills = [
        "React", "Next.js", "Java", "Python", "JavaScript", "TypeScript", "C++", "Spring Boot",
        "FastAPI", "Node.js", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes",
        "AWS", "Git", "DSA", "Algorithms", "System Design", "Machine Learning", "GraphQL", "Tailwind"
    ]
    
    found_skills = [s for s in all_known_skills if re.search(r'\b' + re.escape(s.lower()) + r'\b', text_lower)]
    
    # Calculate scores based on content depth
    has_experience = any(w in text_lower for w in ["intern", "experience", "work", "developer", "engineer"])
    has_projects = any(w in text_lower for w in ["project", "developed", "built", "implemented", "github"])
    has_metrics = bool(re.search(r'\d+%', text_lower) or re.search(r'\$\d+', text_lower) or re.search(r'\d+\s*(ms|users|requests|stars)', text_lower))
    has_contact = any(w in text_lower for w in ["email", "@", "linkedin", "github", "phone", "+91"])
    
    score = 50
    if len(found_skills) >= 6: score += 15
    elif len(found_skills) >= 3: score += 10
    if has_experience: score += 12
    if has_projects: score += 10
    if has_metrics: score += 8
    if has_contact: score += 5
    score = min(score, 94)
    
    ats_score = score + 3 if score < 95 else 92

    role_reqs = ROLE_SKILL_REQUIREMENTS.get(target_role, ROLE_SKILL_REQUIREMENTS["Full Stack Developer"])["required"]
    missing = [req for req in role_reqs if not any(req.lower().startswith(s.lower()) for s in found_skills)][:4]
    
    strengths = [
        f"Strong foundation in core modern technologies: {', '.join(found_skills[:4]) if found_skills else 'Foundational CS subjects'}",
        "Well-structured project highlights with explicit technology references",
        "High academic performance record supporting analytical aptitude"
    ]
    if has_metrics:
        strengths.append("Effective use of quantifiable impact metrics (e.g. latency reductions, user scale)")
        
    weaknesses = [
        f"Lack of explicit cloud and containerization mentions ({'Docker, AWS' if 'docker' not in text_lower else 'CI/CD pipeline configuration'})",
        "Missing automated unit testing and test coverage metrics (JUnit, Jest, PyTest)",
        "Resume lacks industry-standard STAR methodology (Situation, Task, Action, Result) in project bullets"
    ]
    
    recommended_improvements = [
        "Include 2-3 bullet points per project starting with strong action verbs (Architected, Engineered, Optimized)",
        "Highlight your competitive programming profile (LeetCode rating, CodeChef, HackerRank)",
        "Add live demo hyperlinks alongside GitHub repository URLs for recruiter preview"
    ]
    
    ats_suggestions = [
        "Adopt a standard single-column ATS-friendly layout without graphics, icons, or complex tables",
        "Standardize section headers to: WORK EXPERIENCE, PROJECTS, TECHNICAL SKILLS, EDUCATION",
        "Ensure all acronyms are spelled out at least once (e.g., Application Programming Interface (API))"
    ]
    
    career_suggestions = [
        f"Ideal target roles: {target_role}, Junior Software Development Engineer, Frontend Specialist",
        "Prioritize building 1 full-stack production app with Redis caching and Docker deployment",
        "Contribute to open source repositories to build a public GitHub contribution green graph"
    ]
    
    optimized_markdown = f"""# Professional Resume Structure
**Target Role:** {target_role} | **ATS Score:** {ats_score}/100

---
## Summary
Detail-oriented Computer Science student (CGPA: {cgpa:.2f}) with proven ability building full-stack applications and solving complex algorithmic challenges. Proficient in {', '.join(found_skills[:5]) if found_skills else 'Modern Programming'}.

## Core Technical Proficiencies
- **Languages:** {', '.join([s for s in found_skills if s in ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++']]) or 'Java, Python, TypeScript, SQL'}
- **Frameworks & Libraries:** {', '.join([s for s in found_skills if s in ['React', 'Next.js', 'Spring Boot', 'FastAPI', 'Node.js', 'Tailwind']]) or 'React, Next.js, Spring Boot, FastAPI'}
- **Databases & Cloud:** PostgreSQL, MongoDB, Redis, Docker, AWS S3
- **Tools & Methodologies:** Git, Postman, Agile/Scrum, CI/CD Actions

## Featured Engineering Projects
**Enterprise Platform Project** *(Tech: {', '.join(found_skills[:3]) if found_skills else 'Full Stack'})*
- Architected and deployed microservices backend handling 10,000+ simulated requests with sub-100ms response time.
- Implemented secure JWT authentication and role-based access control with PostgreSQL persistence.

## Education
**Bachelor of Technology in Computer Science** (2023 – 2027) — CGPA: {cgpa:.2f}/10.0
"""
    return ResumeAnalysisResponse(
        overall_score=score,
        ats_compatibility_score=ats_score,
        strengths=strengths,
        weaknesses=weaknesses,
        missing_skills=missing,
        recommended_improvements=recommended_improvements,
        ats_suggestions=ats_suggestions,
        career_suggestions=career_suggestions,
        extracted_skills=found_skills,
        optimized_markdown=optimized_markdown
    )

def calculate_skill_gap(current_skills: List[str], target_role: str) -> SkillGapResponse:
    config = ROLE_SKILL_REQUIREMENTS.get(target_role, ROLE_SKILL_REQUIREMENTS["Full Stack Developer"])
    required_skills = config["required"]
    levels = config.get("levels", {})
    
    current_lower = [s.lower() for s in current_skills]
    
    gaps: List[SkillGapItem] = []
    strong: List[str] = []
    missing: List[str] = []
    
    matched_count = 0
    for req in required_skills:
        req_clean = req.split('/')[0].strip().lower()
        has_skill = any(req_clean in c or c in req_clean for c in current_lower)
        target_lvl = levels.get(req, "Intermediate")
        
        if has_skill:
            matched_count += 1
            strong.append(req)
            gaps.append(SkillGapItem(
                skill_name=req,
                current_level="Intermediate" if target_lvl == "Advanced" else "Good",
                required_level=target_lvl,
                priority="MEDIUM",
                gap_score=25 if target_lvl == "Advanced" else 10,
                recommendation=f"Advance your knowledge of {req} with enterprise architectural patterns and profiling."
            ))
        else:
            missing.append(req)
            priority = "CRITICAL" if req in ["Data Structures & Algorithms", "System Design", "Spring Boot", "Docker & Kubernetes"] else "HIGH"
            gap_score = 70 if priority == "CRITICAL" else 50
            gaps.append(SkillGapItem(
                skill_name=req,
                current_level="Beginner / Missing",
                required_level=target_lvl,
                priority=priority,
                gap_score=gap_score,
                recommendation=f"Complete foundational tutorials and build hands-on mini projects in {req}."
            ))
            
    match_pct = int((matched_count / max(len(required_skills), 1)) * 100)
    match_pct = max(35, min(match_pct, 95))
    
    summary = f"You possess {matched_count} of {len(required_skills)} core skills required for a {target_role} position. Focusing on high-priority gaps ({', '.join(missing[:2]) if missing else 'Advanced System Design'}) will rapidly elevate your placement readiness."
    
    return SkillGapResponse(
        target_role=target_role,
        overall_match_percentage=match_pct,
        skill_gaps=gaps,
        missing_skills=missing,
        strong_skills=strong,
        readiness_summary=summary
    )

def generate_learning_roadmap(target_role: str, current_skills: List[str]) -> LearningPathResponse:
    modules = [
        RoadmapModule(
            month_number=1,
            topic="Month 1: Advanced Programming & Data Structures Foundations",
            description="Strengthen core language mechanics (memory, concurrency, typing) and master fundamental data structures (Arrays, HashMaps, Two Pointers, Sliding Window).",
            difficulty="MEDIUM",
            estimated_hours=30,
            resources=[
                {"title": "NeetCode DSA Roadmap", "url": "https://neetcode.io"},
                {"title": "Official Language Documentation", "url": "https://developer.mozilla.org"}
            ],
            practice_tasks=[
                "Solve 25 Easy and 15 Medium LeetCode problems on Arrays & Strings",
                "Implement a generic LRU Cache from scratch"
            ],
            project_milestone="In-Memory High-Performance Cache Library"
        ),
        RoadmapModule(
            month_number=2,
            topic="Month 2: Non-Linear Data Structures & Algorithmic Complexity",
            description="Deep dive into Binary Trees, BSTs, Heaps, Graphs (BFS, DFS, Dijkstra), and Dynamic Programming tabulation & memoization.",
            difficulty="HARD",
            estimated_hours=35,
            resources=[
                {"title": "MIT 6.006 Introduction to Algorithms", "url": "https://ocw.mit.edu"},
                {"title": "Striver's SDE Sheet", "url": "https://takeuforward.org"}
            ],
            practice_tasks=[
                "Solve 30 Tree & Graph problems on LeetCode",
                "Implement Trie prefix tree and Dijkstra pathfinder"
            ],
            project_milestone="Interactive Shortest Path Visualizer Web App"
        ),
        RoadmapModule(
            month_number=3,
            topic="Month 3: Full-Stack Architecture & RESTful Microservices",
            description="Build scalable backends using Java Spring Boot / Node.js with PostgreSQL, JPA/Hibernate query tuning, and JWT security.",
            difficulty="HARD",
            estimated_hours=32,
            resources=[
                {"title": "Spring Boot 3 Documentation", "url": "https://spring.io"},
                {"title": "Prisma & PostgreSQL Masterclass", "url": "https://www.prisma.io"}
            ],
            practice_tasks=[
                "Design database ER diagram with normalization and indexes",
                "Build role-based auth middleware with refresh token rotation"
            ],
            project_milestone="Campus Collab Platform API with Real-Time WebSockets"
        ),
        RoadmapModule(
            month_number=4,
            topic="Month 4: Frontend Mastery & Modern Client State",
            description="React 19, Next.js App Router, Server Components, optimistic UI, state machines, Tailwind CSS design system, and Web Accessibility.",
            difficulty="MEDIUM",
            estimated_hours=28,
            resources=[
                {"title": "React Official Docs", "url": "https://react.dev"},
                {"title": "Next.js Learn Course", "url": "https://nextjs.org/learn"}
            ],
            practice_tasks=[
                "Build a high-performance dashboard with TanStack Query and Recharts",
                "Implement infinite scroll and virtualized lists"
            ],
            project_milestone="AI-Powered Analytics SaaS Dashboard"
        ),
        RoadmapModule(
            month_number=5,
            topic="Month 5: DevOps, Docker, CI/CD & Cloud Infrastructure",
            description="Containerize full-stack apps with multi-stage Dockerfiles, configure GitHub Actions pipelines, and deploy on AWS (EC2/ECS, S3, RDS).",
            difficulty="MEDIUM",
            estimated_hours=25,
            resources=[
                {"title": "Docker Getting Started Guide", "url": "https://docs.docker.com"},
                {"title": "AWS Skill Builder Free Tier", "url": "https://explore.skillbuilder.aws"}
            ],
            practice_tasks=[
                "Write automated GitHub Actions CI pipeline running unit & lint checks",
                "Configure Nginx reverse proxy with SSL certificate termination"
            ],
            project_milestone="Automated Production Deployment Pipeline on Cloud"
        ),
        RoadmapModule(
            month_number=6,
            topic="Month 6: Distributed System Design & Mock MNC Interviews",
            description="Master scalable system design (caching, load balancing, message queues, CAP theorem) and complete technical & behavioral mock interviews.",
            difficulty="HARD",
            estimated_hours=35,
            resources=[
                {"title": "System Design Primer by Donne Martin", "url": "https://github.com/donnemartin/system-design-primer"},
                {"title": "Grokking Modern System Design", "url": "https://designgurus.org"}
            ],
            practice_tasks=[
                "Design a distributed URL Shortener and Notification Service",
                "Conduct 6 mock technical and HR rounds on CampusAI Interview Simulator"
            ],
            project_milestone="Full Capstone Portfolio Demo & Live MNC Placement Drive"
        )
    ]
    return LearningPathResponse(
        title=f"Personalized 6-Month {target_role} Placement Blueprint",
        target_role=target_role,
        estimated_months=6,
        total_modules=6,
        modules=modules
    )

def generate_interview_questions(mode: str, target_role: str, question_count: int = 5) -> List[InterviewQuestion]:
    pool = {
        "TECHNICAL": [
            InterviewQuestion(
                id=1,
                question=f"Explain how you would architect a scalable REST API for a {target_role} application handling 50,000 requests per second. How do you manage database connections and caching?",
                category="System Design & Architecture",
                expected_concepts=["Horizontal scaling", "Redis caching layer", "Database connection pooling (HikariCP)", "Load balancing", "Read replicas"],
                hint="Think about rate limiting, read/write segregation, and cache-aside pattern."
            ),
            InterviewQuestion(
                id=2,
                question="What is the difference between optimistic locking and pessimistic locking in databases? In what scenario would you choose one over the other?",
                category="Database Management",
                expected_concepts=["Version column", "Transaction isolation", "Lock contention", "Deadlocks", "High-concurrency e-commerce"],
                hint="Contrast ticket booking systems with high collision vs read-heavy social feeds."
            ),
            InterviewQuestion(
                id=3,
                question="How does the JavaScript Event Loop handle microtasks vs macrotasks, and how does this impact React 18/19 rendering batching?",
                category="Frontend & Runtime Internals",
                expected_concepts=["Call Stack", "Microtask Queue (Promises, queueMicrotask)", "Macrotask Queue (setTimeout, I/O)", "Automatic Batching"],
                hint="Trace execution order of console logs inside setTimeout vs Promise.resolve."
            ),
            InterviewQuestion(
                id=4,
                question="Explain the time and space complexity of QuickSort vs MergeSort. Why is QuickSort often preferred in practice for arrays in memory?",
                category="Data Structures & Algorithms",
                expected_concepts=["O(N log N) average", "O(N^2) worst case pivot", "O(1) auxiliary space in-place", "CPU cache locality"],
                hint="Mention CPU cache line benefits and memory allocation overhead."
            ),
            InterviewQuestion(
                id=5,
                question="How does Spring Security / JWT authentication handle stateless token verification, and what is the standard strategy for token revocation / refresh?",
                category="Security & Authentication",
                expected_concepts=["HMAC / RSA signatures", "Short-lived Access Token", "HttpOnly Secure Cookie Refresh Token", "Redis token blacklist"],
                hint="Explain why stateless JWTs cannot be instantly invalidated without an in-memory store like Redis."
            )
        ],
        "HR": [
            InterviewQuestion(
                id=1,
                question="Tell me about a time you faced a severe conflict or disagreement in a technical team project. How did you resolve it?",
                category="Conflict Resolution & Teamwork",
                expected_concepts=["STAR format", "Objective data-driven decision", "Empathy & listening", "Successful project delivery"],
                hint="Describe the technical disagreement, pros/cons evaluated, and final unified outcome."
            ),
            InterviewQuestion(
                id=2,
                question="Where do you see yourself in 3 to 5 years as an engineer, and how does joining our company align with your career ambitions?",
                category="Career Vision & Ambition",
                expected_concepts=["Technical depth & mastery", "Mentorship", "Ownership of mission-critical systems", "Alignment with company tech stack"],
                hint="Balance individual contributor growth with collaborative leadership."
            ),
            InterviewQuestion(
                id=3,
                question="Describe your biggest technical failure or project setback in college. What did you learn from the experience?",
                category="Resilience & Growth Mindset",
                expected_concepts=["Honest ownership", "Root cause analysis", "Post-mortem lessons", "Preventative safeguards added"],
                hint="Show that you take responsibility and implemented automated checks to prevent recurrence."
            ),
            InterviewQuestion(
                id=4,
                question="How do you prioritize your time when you have simultaneous deadlines for college exams, hackathons, and placement preparation?",
                category="Time Management & Prioritization",
                expected_concepts=["Eisenhower matrix / time blocking", "Prioritizing high-impact tasks", "Proactive communication", "Consistency"],
                hint="Mention specific productivity strategies and maintaining high academic standard alongside coding."
            )
        ],
        "BEHAVIORAL": [
            InterviewQuestion(
                id=1,
                question="Give an example of when you had to learn a completely unfamiliar technology stack under tight deadline constraints.",
                category="Fast Learning & Adaptability",
                expected_concepts=["Rapid documentation reading", "Building proof of concept", "Debugging systematically", "Delivering MVP"],
                hint="Highlight your research methodology and fast prototyping cycle."
            ),
            InterviewQuestion(
                id=2,
                question="Describe a situation where you identified a significant bug or security loophole in a project that others missed.",
                category="Attention to Detail & Ownership",
                expected_concepts=["Proactive testing", "Edge case analysis", "Communicating risk to team", "Writing regression tests"],
                hint="Walk through the edge case you spotted and how you patched it."
            )
        ],
        "RESUME_BASED": [
            InterviewQuestion(
                id=1,
                question="In your resume, you listed a full-stack project using React, WebSockets, and PostgreSQL. What was the most challenging technical bottleneck you faced while building it?",
                category="Resume Project Deep Dive",
                expected_concepts=["WebSocket connection lifecycle", "State synchronization", "Database locking", "Performance optimization"],
                hint="Highlight the exact architecture and how you benchmarked latency."
            ),
            InterviewQuestion(
                id=2,
                question="Looking at your profile, you have an 8.85 CGPA and multiple projects. How did you design your database schema to ensure relational integrity without sacrificing read throughput?",
                category="Academic & Engineering Synthesis",
                expected_concepts=["Foreign key cascading", "Composite indexes", "Denormalization trade-offs", "Transaction isolation levels"],
                hint="Discuss specific index types like B-tree and query execution plans."
            )
        ]
    }
    selected = pool.get(mode, pool["TECHNICAL"])
    return selected[:question_count]

def evaluate_interview_answer(question: str, category: str, student_answer: str, target_role: str) -> InterviewEvaluateResponse:
    ans = student_answer.strip()
    words = ans.split()
    word_count = len(words)
    
    if word_count < 15:
        return InterviewEvaluateResponse(
            score=42,
            feedback="Your response is too brief for an MNC technical interview. Recruiters look for structured reasoning, architecture trade-offs, and concrete technical terms.",
            missing_points=["Detailed step-by-step technical explanation", "Real-world trade-off analysis", "Example scenarios and edge cases"],
            improved_model_answer="In a production system, I would approach this by first decoupling the architecture into modular layers. For data persistence, we configure connection pooling (such as HikariCP) with tuned min/max pool sizes to prevent exhaustion. To safeguard the database from spike loads, a distributed Redis caching layer with a Cache-Aside pattern absorbs 90%+ of read traffic. For write bursts, an asynchronous message broker (like Apache Kafka or RabbitMQ) buffers requests, ensuring horizontal elasticity and high availability.",
            communication_feedback="Structure your response using the STAR or Problem-Solution-Impact format to demonstrate senior-level articulation.",
            confidence_rating="Needs Improvement"
        )
    
    # Calculate score
    score = 68
    if word_count >= 50: score += 12
    if word_count >= 100: score += 8
    
    # Keyword checks
    tech_buzzwords = ["cache", "redis", "database", "index", "scale", "concurrency", "trade-off", "performance", "asynchronous", "security", "latency", "architecture", "microservice", "testing", "monitoring"]
    matched_buzz = [w for w in tech_buzzwords if w in ans.lower()]
    score += min(len(matched_buzz) * 2, 12)
    score = min(score, 95)
    
    missing = []
    if "cache" not in ans.lower() and "redis" not in ans.lower():
        missing.append("Caching strategies (e.g. Redis / Memcached Cache-Aside pattern)")
    if "test" not in ans.lower() and "monitor" not in ans.lower():
        missing.append("Automated test coverage and production telemetry / observability")
    if "trade-off" not in ans.lower():
        missing.append("Explicit engineering trade-offs (e.g. consistency vs latency under CAP theorem)")
    if not missing:
        missing.append("Deeper edge-case handling under network partition scenarios")
        
    return InterviewEvaluateResponse(
        score=score,
        feedback=f"Solid, articulate answer demonstrating good technical comprehension. You highlighted key architectural considerations and structured your thoughts logically.",
        missing_points=missing,
        improved_model_answer=f"To architect a resilient solution for {target_role}: 1) Implement an API Gateway with rate limiting (Token Bucket) to protect upstream services; 2) Utilize Redis distributed cache for sub-5ms lookups with TTL expiration; 3) Scale database reads using Read Replicas while directing writes to the Primary instance; 4) Monitor end-to-end latency with Prometheus and OpenTelemetry distributed tracing.",
        communication_feedback="Excellent clarity and professional tone. Continue using precise engineering terminology to stand out during final director-level rounds.",
        confidence_rating="High - Placement Ready" if score >= 80 else "Good - Refine Depth"
    )

def career_mentor_chat(message: str, history: List[Dict[str, str]], student_profile: Optional[Dict[str, Any]] = None) -> CareerMentorResponse:
    msg_lower = message.lower()
    name = student_profile.get("full_name", "Student") if student_profile else "Aarav"
    career = student_profile.get("target_career", "Full Stack Developer") if student_profile else "Full Stack Developer"
    cgpa = student_profile.get("cgpa", 8.85) if student_profile else 8.85
    readiness = student_profile.get("career_readiness_score", 78) if student_profile else 78
    
    if "mnc" in msg_lower or "faang" in msg_lower or "google" in msg_lower or "amazon" in msg_lower or "microsoft" in msg_lower:
        reply = f"""Hello {name}! For Tier-1 MNCs and Product companies (Google, Microsoft, Amazon, Atlassian), hiring teams evaluate candidates across 4 key pillars:

1. **DSA & Algorithmic Problem Solving (40% weight):**
   - Solve at least 150-200 LeetCode problems (Focus: Graphs, Trees, Dynamic Programming, Heaps, Two Pointers).
   - Aim for clean, idiomatic code with optimal O(N) space/time analysis.

2. **Core CS Foundations (25% weight):**
   - Deep mastery of Operating Systems (Threads, Semaphores, Virtual Memory), DBMS (Normalization, B+ Trees, Transactions/ACID), and Computer Networks (TCP/UDP, HTTP/3, DNS).
   - With your current CGPA of **{cgpa}**, you already meet the academic cutoff for all top-tier MNC placement drives!

3. **High-Impact Projects (20% weight):**
   - Don't build generic clone tutorials. Build full-stack applications with real-world complexities: WebSocket concurrency, Redis caching, Docker deployment, and CI/CD pipelines.

4. **System Design & Soft Skills (15% weight):**
   - Practice explaining your thought process out loud using the STAR method in our CampusAI Interview Simulator!"""
        followups = [
            "Give me a 6-month roadmap for MNC placements",
            "What projects will stand out on my resume?",
            "How should I prepare for DSA rounds?"
        ]
    elif "resume" in msg_lower or "ats" in msg_lower or "improve my resume" in msg_lower:
        reply = f"""Hi {name}, based on your target role as a **{career}**, here are the top 3 high-impact resume improvements you should make right now:

1. **Quantify Every Project Bullet:** Replace *"Built a backend API"* with *"Architected Spring Boot REST API serving 10K+ requests with sub-80ms response time using Redis caching."*
2. **Add Missing Cloud & DevOps Tools:** Ensure **Docker**, **AWS (EC2/S3)**, and **GitHub Actions** are clearly listed under your Tools section.
3. **Include Live Links:** Put clickable live demo URLs next to your GitHub repository links so recruiters can test your working apps with 1 click.

You can also head over to our **AI Resume Analyzer** tab to upload your current PDF and download a customized ATS-optimized resume markdown!"""
        followups = [
            "Analyze my resume for ATS score",
            "What skills should I add to my resume?",
            "How do I write impactful project bullet points?"
        ]
    elif "project" in msg_lower or "build" in msg_lower:
        reply = f"""For a **{career}**, recruiters love seeing projects that demonstrate full lifecycle engineering rather than simple CRUD apps:

1. **AI-Powered ATS Resume & Career Intelligence Engine** *(FastAPI, React, spaCy, PostgreSQL)*: Solves real candidate evaluation challenges with NLP parsing and similarity scoring.
2. **Real-Time Collaborative Code Editor & Canvas** *(Next.js, WebSockets, Redis Pub/Sub, Docker)*: Demonstrates concurrency, low latency, and distributed synchronization.
3. **Distributed Microservices Cloud Store** *(Spring Boot 3, Kafka, PostgreSQL, Kubernetes)*: Proves understanding of event-driven architectures, circuit breakers, and container orchestration.

Check out our **Project Hub** tab to explore starter templates and find teammates on campus!"""
        followups = [
            "How do I deploy my project to AWS for free?",
            "What makes a project impressive to recruiters?",
            "Can you help me design the architecture for a real-time app?"
        ]
    elif "ready" in msg_lower or "readiness" in msg_lower or "score" in msg_lower:
        reply = f"""Your current **AI Career Readiness Score is {readiness}/100**!

Here is how your readiness score breaks down:
- **Technical Skills:** 82% (Strong proficiency in React and PostgreSQL)
- **DSA / Problem Solving:** 68% *(Opportunity area - solve 25 more Medium problems)*
- **Projects:** 75% *(Strong portfolio; add 1 microservices project)*
- **Academics:** 88% *(Excellent CGPA: {cgpa})*
- **Resume ATS:** 82% *(Optimized layout)*
- **Interview Simulator:** 65% *(Practice 2 more mock technical rounds)*

**Top Priority Next Action:** Complete Month 3 in your **Personalized Learning Path** to boost your Career Readiness score past 85!"""
        followups = [
            "How can I boost my DSA score quickly?",
            "Start a mock interview session",
            "Show my recommended learning roadmap"
        ]
    else:
        reply = f"""Hi {name}! As your **CampusAI Career Mentor**, I am here to guide your journey toward your dream role as a **{career}**.

You are currently making strong progress (Career Readiness: **{readiness}/100**, CGPA: **{cgpa}**). Whether you need tailored advice on:
- 🎯 Closing skill gaps for top tech companies
- 📄 Polishing your resume for ATS parsers
- 💻 Structuring standout software projects
- 🚀 Preparing for coding and behavioral interviews

What would you like to focus on today?"""
        followups = [
            "What skills should I learn for an MNC?",
            "Am I ready for campus placements?",
            "What should I learn after React & Node.js?",
            "Give me a 6-month roadmap"
        ]
        
    return CareerMentorResponse(reply=reply, suggested_followups=followups)

def calculate_career_readiness(
    tech_score: int = 82,
    dsa_score: int = 68,
    proj_score: int = 75,
    acad_score: int = 88,
    resume_score: int = 82,
    interview_score: int = 65,
    cert_score: int = 70
) -> ReadinessScoreResponse:
    # 25% Technical + 20% DSA + 15% Projects + 10% Academics + 10% Resume + 10% Interview + 10% Certifications
    overall = int(
        (0.25 * tech_score) +
        (0.20 * dsa_score) +
        (0.15 * proj_score) +
        (0.10 * acad_score) +
        (0.10 * resume_score) +
        (0.10 * interview_score) +
        (0.10 * cert_score)
    )
    overall = max(0, min(100, overall))
    
    breakdown = {
        "technical_skills": tech_score,
        "dsa_coding": dsa_score,
        "projects": proj_score,
        "academics": acad_score,
        "resume_quality": resume_score,
        "interview_readiness": interview_score,
        "certifications": cert_score
    }
    
    # Identify top 3 areas with lowest weighted scores
    weights = {
        "DSA & Problem Solving": (dsa_score, "Solve 20 LeetCode Medium problems on Trees and Dynamic Programming to crack Tier-1 coding rounds."),
        "Interview Simulator Readiness": (interview_score, "Complete 3 AI Mock Interview rounds to improve verbal articulation and technical depth."),
        "Technical Skills & Architecture": (tech_score, "Master Spring Boot microservices and Docker containerization to close backend skill gaps."),
        "Projects & Open Source": (proj_score, "Build and deploy 1 high-throughput full-stack capstone project with live demo URL."),
        "Certifications & Cloud": (cert_score, "Earn AWS Certified Cloud Practitioner or Docker fundamentals badge.")
    }
    
    sorted_improvements = sorted(weights.items(), key=lambda x: x[1][0])
    top_3 = [
        {"title": f"Improve {item[0]} (Current: {item[1][0]}%)", "description": item[1][1], "priority": "High" if idx == 0 else "Medium"}
        for idx, item in enumerate(sorted_improvements[:3])
    ]
    
    if overall >= 85:
        tier = "Elite Placement Ready"
        tier_desc = "Top 5% candidate pool. Highly competitive for Tier-1 Product MNCs (Google, Microsoft, Amazon, Atlassian)."
    elif overall >= 70:
        tier = "Placement Ready - Advanced"
        tier_desc = "Strong candidate profile. On track for Tier-1 and Tier-2 software engineering roles."
    elif overall >= 55:
        tier = "Intermediate Progression"
        tier_desc = "Solid fundamentals. Focus on closing critical skill gaps in DSA and System Design."
    else:
        tier = "Foundational Stage"
        tier_desc = "Starting career journey. Focus on academic basics, core coding, and first web project."
        
    return ReadinessScoreResponse(
        overall_score=overall,
        breakdown=breakdown,
        top_3_improvements=top_3,
        readiness_tier=tier,
        tier_description=tier_desc
    )

def recommend_projects(target_role: str, current_skills: List[str]) -> List[RecommendedProject]:
    return [
        RecommendedProject(
            title="AI Resume & ATS Intelligence Engine",
            description="Full-stack AI SaaS that parses resumes in PDF/DOCX format, extracts candidate skill ontologies, and scores ATS compliance using machine learning.",
            category="AI / Machine Learning",
            tech_stack=["FastAPI", "Python", "React", "PostgreSQL", "Tailwind CSS"],
            difficulty="INTERMEDIATE",
            estimated_duration="3 - 4 Weeks",
            why_this_project="Addresses critical hiring automation needs and proves your ability to connect Python AI microservices with modern React frontends.",
            skills_learned=["FastAPI Async Endpoints", "NLP Text Tokenization", "JWT Authentication", "PostgreSQL Schema Design"],
            career_impact="Boosts Full Stack & AI Engineer placement eligibility by 35%."
        ),
        RecommendedProject(
            title="Campus Safety & Emergency Dispatch Grid",
            description="Real-time incident reporting and campus security telemetry broadcasting system with live geospatial mapping and WebSockets.",
            category="Web Development & Real-Time",
            tech_stack=["Next.js", "Node.js", "Socket.io", "PostgreSQL", "Leaflet Maps"],
            difficulty="ADVANCED",
            estimated_duration="4 - 5 Weeks",
            why_this_project="Showcases bidirectional WebSocket handling, location tracking, and real-time state synchronization under high concurrent traffic.",
            skills_learned=["WebSocket Rooms", "Geospatial Queries", "State Machines", "Optimistic UI Updates"],
            career_impact="Highly rated in hackathons and software development internship interviews."
        ),
        RecommendedProject(
            title="Distributed Microservices Cloud Commerce Core",
            description="High-throughput e-commerce backend built with Spring Boot 3, Kafka event-driven architecture, Redis distributed caching, and Docker Compose.",
            category="Cloud & Enterprise Architecture",
            tech_stack=["Spring Boot 3", "Apache Kafka", "PostgreSQL", "Redis", "Docker"],
            difficulty="ADVANCED",
            estimated_duration="5 - 6 Weeks",
            why_this_project="Directly replicates MNC enterprise architecture patterns with circuit breakers, event streams, and database sharding.",
            skills_learned=["Spring Data JPA", "Kafka Consumer Groups", "Distributed Caching", "Docker Orchestration"],
            career_impact="Demonstrates senior-level backend readiness for Tier-1 Product companies."
        )
    ]
