import {
  ResumeAnalysisResult, SkillGapResult, SkillGapItem,
  InterviewQuestion, InterviewEvaluation, RecommendedProject,
  LearningPath, RoadmapModule
} from '../types';

export const ROLE_REQUIREMENTS: Record<string, { required: string[]; levels: Record<string, string> }> = {
  'Full Stack Developer': {
    required: ['JavaScript / TypeScript', 'React / Next.js', 'Spring Boot', 'Node.js / Express', 'PostgreSQL', 'Data Structures & Algorithms', 'Docker & Kubernetes', 'System Design'],
    levels: { 'JavaScript / TypeScript': 'Advanced', 'React / Next.js': 'Advanced', 'Spring Boot': 'Intermediate', 'PostgreSQL': 'Intermediate', 'Data Structures & Algorithms': 'Advanced', 'Docker & Kubernetes': 'Intermediate', 'System Design': 'Intermediate' }
  },
  'Software Engineer': {
    required: ['Java', 'C++', 'Python', 'Data Structures & Algorithms', 'System Design', 'PostgreSQL', 'Operating Systems & Concurrency', 'Computer Networks & Security'],
    levels: { 'Java': 'Advanced', 'Data Structures & Algorithms': 'Advanced', 'System Design': 'Advanced', 'PostgreSQL': 'Intermediate', 'Operating Systems & Concurrency': 'Intermediate' }
  },
  'Cloud Engineer': {
    required: ['Docker & Kubernetes', 'AWS Cloud', 'Linux & Shell Scripting', 'Terraform / IaC', 'Python', 'Computer Networks & Security', 'CI/CD Pipelines'],
    levels: { 'Docker & Kubernetes': 'Advanced', 'AWS Cloud': 'Advanced', 'Linux & Shell Scripting': 'Advanced', 'Python': 'Intermediate' }
  },
  'AI Engineer': {
    required: ['Python', 'Machine Learning & Deep Learning', 'PyTorch / TensorFlow', 'FastAPI', 'PostgreSQL', 'Data Structures & Algorithms', 'Transformers & LLMs'],
    levels: { 'Python': 'Advanced', 'Machine Learning & Deep Learning': 'Advanced', 'FastAPI': 'Intermediate', 'Transformers & LLMs': 'Intermediate' }
  },
  'Data Analyst': {
    required: ['SQL & PostgreSQL', 'Python', 'Pandas & NumPy', 'PowerBI / Tableau', 'Statistical Analysis', 'Data Warehousing'],
    levels: { 'SQL & PostgreSQL': 'Advanced', 'Python': 'Intermediate', 'PowerBI / Tableau': 'Advanced' }
  },
  'DevOps Engineer': {
    required: ['Docker & Kubernetes', 'AWS Cloud', 'Linux & Shell Scripting', 'GitHub Actions CI/CD', 'Prometheus & Grafana', 'Terraform'],
    levels: { 'Docker & Kubernetes': 'Advanced', 'Linux & Shell Scripting': 'Advanced', 'AWS Cloud': 'Intermediate' }
  }
};

export function simulateResumeAnalysis(text: string, targetRole: string = 'Full Stack Developer', cgpa: number = 8.85): ResumeAnalysisResult {
  const t = text.toLowerCase();
  const known = ['React', 'Next.js', 'Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'Spring Boot', 'FastAPI', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Git', 'Data Structures', 'System Design', 'Machine Learning', 'Tailwind'];
  const extracted = known.filter(k => t.includes(k.toLowerCase()));

  let score = 55;
  if (extracted.length >= 6) score += 20;
  else if (extracted.length >= 3) score += 12;
  if (t.includes('intern') || t.includes('experience')) score += 10;
  if (t.includes('project') || t.includes('built')) score += 8;
  if (/\d+%|\$\d+|\d+\s*ms/.test(t)) score += 6;
  score = Math.min(score, 94);

  const atsScore = Math.min(score + 4, 96);
  const roleReqs = ROLE_REQUIREMENTS[targetRole]?.required || ROLE_REQUIREMENTS['Full Stack Developer'].required;
  const missing = roleReqs.filter(r => !extracted.some(e => r.toLowerCase().includes(e.toLowerCase()))).slice(0, 4);

  return {
    overallScore: score,
    atsCompatibilityScore: atsScore,
    strengths: [
      `Solid foundation in core competencies: ${extracted.slice(0, 4).join(', ') || 'Modern Software Engineering'}`,
      'Demonstrated project implementation with quantified tech stacks',
      `High academic standing (${cgpa.toFixed(2)} CGPA) validating strong analytical mindset`,
      'Clear, readable single-column structure suitable for ATS scanning algorithms'
    ],
    weaknesses: [
      `Limited explicit mentions of containerization & cloud infrastructure (${missing.slice(0, 2).join(', ') || 'Docker, AWS'})`,
      'Absence of automated testing metrics (e.g. Unit tests, Jest, JUnit, 80%+ code coverage)',
      'Project descriptions can use more STAR (Situation, Task, Action, Result) impact quantification'
    ],
    missingSkills: missing.length > 0 ? missing : ['Docker & Kubernetes', 'AWS Cloud Deployments', 'Redis Caching', 'Microservices'],
    recommendedImprovements: [
      'Begin each project bullet with strong action verbs: "Architected", "Engineered", "Optimized", "Benchmarked"',
      'Add live demo hyperlinks alongside GitHub repository URLs for instant recruiter evaluation',
      'Include your LeetCode / competitive programming handle with current contest rating'
    ],
    atsSuggestions: [
      'Stick to standard headers: SUMMARY, TECHNICAL SKILLS, EXPERIENCE, PROJECTS, EDUCATION',
      'Avoid graphics, tables with nested borders, and custom columns that trip up legacy ATS parsers',
      'Spell out acronyms once (e.g. Application Programming Interface (API))'
    ],
    careerSuggestions: [
      `Target high-growth roles: ${targetRole}, Software Development Engineer - Backend, Frontend Specialist`,
      'Build 1 full-stack capstone project incorporating Redis caching and Docker orchestration',
      'Contribute to open source full-stack GitHub repositories to showcase collaborative code reviews'
    ],
    extractedSkills: extracted.length > 0 ? extracted : ['React', 'JavaScript', 'Java', 'SQL', 'Git'],
    optimizedMarkdown: `# ${text.split('\n')[0] || 'Aarav Patel'}
**${targetRole}** | **ATS Score: ${atsScore}/100**

---
## Summary
Proactive Computer Science engineer (CGPA: ${cgpa.toFixed(2)}) with hands-on proficiency building responsive web applications, scalable backend microservices, and distributed cloud systems. Skilled in ${extracted.slice(0, 5).join(', ') || 'Modern Web Engineering'}.

## Core Technical Skills
- **Languages:** ${extracted.filter(s => ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++'].includes(s)).join(', ') || 'Java, TypeScript, Python, SQL'}
- **Frameworks:** ${extracted.filter(s => ['React', 'Next.js', 'Spring Boot', 'FastAPI', 'Node.js', 'Tailwind'].includes(s)).join(', ') || 'React, Next.js, Spring Boot'}
- **Databases & DevOps:** PostgreSQL, Redis, Docker, Git/GitHub, AWS S3
`
  };
}

export function simulateSkillGap(currentSkills: string[], targetRole: string): SkillGapResult {
  const config = ROLE_REQUIREMENTS[targetRole] || ROLE_REQUIREMENTS['Full Stack Developer'];
  const reqs = config.required;
  const levels = config.levels;

  const currentLower = currentSkills.map(s => s.toLowerCase());
  const gaps: SkillGapItem[] = [];
  const strong: string[] = [];
  const missing: string[] = [];

  let matched = 0;
  for (const req of reqs) {
    const clean = req.split('/')[0].trim().toLowerCase();
    const has = currentLower.some(c => c.includes(clean) || clean.includes(c));
    const targetLvl = levels[req] || 'Intermediate';

    if (has) {
      matched++;
      strong.push(req);
      gaps.push({
        skillName: req,
        currentLevel: targetLvl === 'Advanced' ? 'Intermediate' : 'Proficient',
        requiredLevel: targetLvl,
        priority: 'MEDIUM',
        gapScore: targetLvl === 'Advanced' ? 25 : 10,
        recommendation: `Deepen your expertise in ${req} with performance profiling, concurrency, and architecture patterns.`
      });
    } else {
      missing.push(req);
      const isCritical = ['Data Structures & Algorithms', 'System Design', 'Spring Boot', 'Docker & Kubernetes'].includes(req);
      gaps.push({
        skillName: req,
        currentLevel: 'Beginner / Missing',
        requiredLevel: targetLvl,
        priority: isCritical ? 'CRITICAL' : 'HIGH',
        gapScore: isCritical ? 70 : 50,
        recommendation: `Complete foundational exercises and build 1 portfolio project demonstrating practical ${req} skills.`
      });
    }
  }

  const matchPct = Math.max(35, Math.min(95, Math.round((matched / reqs.length) * 100)));

  return {
    targetRole,
    overallMatchPercentage: matchPct,
    skillGaps: gaps,
    missingSkills: missing,
    strongSkills: strong,
    readinessSummary: `You match ${matched} of ${reqs.length} essential industry skills for ${targetRole}. Bridging critical gaps (${missing.slice(0, 2).join(', ') || 'System Design'}) will quickly boost your placement readiness score above 85/100.`
  };
}

export function simulateEvaluateAnswer(question: string, studentAnswer: string, targetRole: string): InterviewEvaluation {
  const ans = studentAnswer.trim();
  const words = ans.split(/\s+/).filter(Boolean);
  const count = words.length;

  if (count < 15) {
    return {
      score: 45,
      feedback: 'Your answer is brief. Top MNC interviewers expect structured reasoning with architectural trade-offs, concrete technical examples, and edge-case awareness.',
      missingPoints: ['Detailed end-to-end technical explanation', 'Real-world latency & throughput trade-offs', 'Scalability considerations (e.g. caching, indexing, concurrency)'],
      improvedModelAnswer: 'In a production architecture, I would approach this by separating concerns across decoupled microservices. For hot reads, a Redis caching layer with a Cache-Aside pattern handles high-throughput requests sub-5ms. Database queries are optimized using composite indexes and connection pooling (HikariCP). For asynchronous burst handling, a message queue like Kafka buffers write operations, maintaining high availability.',
      communicationFeedback: 'Use the STAR (Situation, Task, Action, Result) method to systematically articulate your architectural choices.',
      confidenceRating: 'Needs Practice'
    };
  }

  let score = 70;
  if (count >= 40) score += 10;
  if (count >= 80) score += 8;

  const techWords = ['cache', 'redis', 'database', 'index', 'scale', 'concurrency', 'latency', 'security', 'microservice', 'async', 'docker', 'test', 'trade-off'];
  const matchedTech = techWords.filter(w => ans.toLowerCase().includes(w));
  score += Math.min(matchedTech.length * 2, 10);
  score = Math.min(score, 96);

  const missing: string[] = [];
  if (!ans.toLowerCase().includes('cache') && !ans.toLowerCase().includes('redis')) {
    missing.push('Distributed caching strategies (e.g. Redis / Memcached TTL expiration)');
  }
  if (!ans.toLowerCase().includes('test') && !ans.toLowerCase().includes('monitor')) {
    missing.push('Automated test coverage and observability telemetry (Prometheus / Grafana)');
  }
  if (!ans.toLowerCase().includes('trade-off')) {
    missing.push('Explicit architectural trade-offs (e.g. CAP theorem consistency vs availability)');
  }
  if (missing.length === 0) {
    missing.push('Edge-case recovery during network partitions and graceful degradation');
  }

  return {
    score,
    feedback: `Excellent, well-articulated response demonstrating strong engineering comprehension for ${targetRole}. You clearly explained architectural principles and structured your answer logically.`,
    missingPoints: missing,
    improvedModelAnswer: `To implement a resilient solution: 1) Secure endpoints with JWT authentication and rate limiting; 2) Introduce Redis distributed cache for read heavy paths; 3) Use PostgreSQL read-replicas for data isolation; 4) Monitor end-to-end latency with OpenTelemetry distributed tracing.`,
    communicationFeedback: 'Strong clarity, professional vocabulary, and coherent technical narrative. Suitable for Director-level interview rounds.',
    confidenceRating: score >= 82 ? 'Placement Ready - High' : 'Good Progress'
  };
}

export function simulateCareerMentorChat(message: string, studentName: string = 'Aarav', career: string = 'Full Stack Developer', cgpa: number = 8.85, readiness: number = 78): { reply: string; followups: string[] } {
  const m = message.toLowerCase();

  if (m.includes('mnc') || m.includes('google') || m.includes('amazon') || m.includes('microsoft') || m.includes('faang')) {
    return {
      reply: `Hello ${studentName}! For Tier-1 MNC placement drives (Google, Microsoft, Amazon, Atlassian), recruiters assess 4 key criteria:

1. **DSA & Problem Solving (40%):** Solve 150+ LeetCode problems (focus: Trees, Graphs, Dynamic Programming). Write clean, idiomatic code with optimal time/space complexity.
2. **Core CS Fundamentals (25%):** Operating Systems (Threads, Virtual Memory), DBMS (B-Trees, ACID, Normalization), Computer Networks (TCP/UDP, HTTP/3). Your **${cgpa} CGPA** easily clears all top-tier eligibility cutoffs!
3. **Full-Stack Projects (20%):** Build apps with real concurrency, WebSockets, Redis caching, and Docker deployment.
4. **Communication & System Design (15%):** Practice explaining design trade-offs using the STAR method.`,
      followups: [
        'Give me a 6-month roadmap for MNC placements',
        'What projects will make my resume stand out?',
        'How should I practice DSA effectively?'
      ]
    };
  }

  if (m.includes('resume') || m.includes('ats')) {
    return {
      reply: `Hi ${studentName}! To maximize your resume ATS score for **${career}** roles:

1. **Quantify Results:** Change *"Built backend APIs"* to *"Architected Spring Boot REST API serving 10,000+ requests with sub-80ms response time using Redis caching."*
2. **Add Missing Tools:** Explicitly list **Docker**, **AWS (EC2/S3)**, and **GitHub Actions** in your skills section.
3. **Live Links:** Include live working demo URLs next to your GitHub repositories for 1-click evaluation.

Head over to the **AI Resume Analyzer** tab to test your ATS score right now!`,
      followups: [
        'Analyze my resume for ATS score',
        'What projects should I build?',
        'How can I improve my DSA score?'
      ]
    };
  }

  if (m.includes('project') || m.includes('build')) {
    return {
      reply: `Here are 3 standout project ideas that will impress MNC interviewers:

1. **AI Resume & ATS Intelligence Engine** *(FastAPI, Python, React, PostgreSQL)*: Solves recruitment challenges with NLP parsing and semantic skill matching.
2. **Real-Time Campus Safety & Emergency Dispatch Grid** *(Next.js, WebSockets, Redis, Leaflet Maps)*: Demonstrates bidirectional telemetry, location clustering, and sub-50ms latency.
3. **Distributed Microservices Cloud Commerce** *(Spring Boot 3, Kafka, Docker, Kubernetes)*: Direct industry pattern with event streams, distributed transactions, and resilience.

Check out our **Project Hub** tab to explore starter templates and collaborate with teammates!`,
      followups: [
        'How do I deploy on AWS for free?',
        'What makes a project impressive to recruiters?',
        'Can you give me a step-by-step roadmap?'
      ]
    };
  }

  if (m.includes('ready') || m.includes('score') || m.includes('readiness')) {
    return {
      reply: `Your current **AI Career Readiness Score is ${readiness}/100**!

- **Technical Skills:** 82% (Strong React & PostgreSQL foundations)
- **DSA / Problem Solving:** 68% (Target: Solve 20 more Medium problems)
- **Projects:** 75% (Strong portfolio; add 1 microservices project)
- **Academics:** 88% (Excellent CGPA: ${cgpa})
- **Resume ATS:** 82% (Optimized layout)
- **Interview Simulator:** 65% (Practice 2 more mock rounds)

**Recommended Next Step:** Complete Month 3 in your **Personalized Learning Path** to boost your Career Readiness score past 85!`,
      followups: [
        'How can I boost my DSA score quickly?',
        'Start a mock interview session',
        'Show my recommended learning roadmap'
      ]
    };
  }

  return {
    reply: `Hello ${studentName}! As your **CampusAI Career Mentor**, I am here to accelerate your path to your target career as a **${career}**.

You are currently making strong progress (Career Readiness: **${readiness}/100**, CGPA: **${cgpa}**). What would you like to focus on today?
- 🎯 Closing skill gaps for top tech companies
- 📄 Polishing your resume for ATS parsers
- 💻 Building standout engineering projects
- 🚀 Practicing coding and behavioral interviews`,
    followups: [
      'What skills should I learn for an MNC?',
      'Am I ready for placements?',
      'Give me a 6-month roadmap',
      'What projects should I build?'
    ]
  };
}

export function calculateReadinessScore(
  tech: number,
  dsa: number,
  proj: number,
  acad: number,
  resume: number,
  interview: number,
  cert: number
): { overall: number; top3: { title: string; desc: string; priority: string }[] } {
  // 25% Tech + 20% DSA + 15% Projects + 10% Academics + 10% Resume + 10% Interview + 10% Certs
  const overall = Math.round(
    (0.25 * tech) +
    (0.20 * dsa) +
    (0.15 * proj) +
    (0.10 * acad) +
    (0.10 * resume) +
    (0.10 * interview) +
    (0.10 * cert)
  );

  const areas = [
    { title: `DSA & Problem Solving (${dsa}%)`, desc: 'Solve 20 LeetCode Medium problems on Trees and Dynamic Programming.', score: dsa },
    { title: `Interview Simulator (${interview}%)`, desc: 'Complete 3 AI Mock Interview rounds to improve verbal articulation and technical depth.', score: interview },
    { title: `Technical Architecture (${tech}%)`, desc: 'Master Spring Boot microservices and Docker containerization.', score: tech },
    { title: `Projects & Open Source (${proj}%)`, desc: 'Build and deploy 1 high-throughput capstone project with live demo URL.', score: proj },
    { title: `Certifications & Cloud (${cert}%)`, desc: 'Earn AWS Certified Cloud Practitioner or Docker badge.', score: cert }
  ];

  areas.sort((a, b) => a.score - b.score);
  const top3 = areas.slice(0, 3).map((a, idx) => ({
    title: `Improve ${a.title}`,
    desc: a.desc,
    priority: idx === 0 ? 'High' : 'Medium'
  }));

  return { overall: Math.min(100, Math.max(0, overall)), top3 };
}
