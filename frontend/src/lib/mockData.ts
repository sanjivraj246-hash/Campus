import {
  StudentProfile, FacultyProfile, User, Project, Hackathon,
  CodingProblem, PlacementApplication, NotificationItem,
  AcademicRecord, AttendanceRecord, LearningPath, Skill
} from '../types';

export const INITIAL_USERS: User[] = [
  { id: 1, email: 'admin@campusiq.edu', fullName: 'Dr. Vikram Malhotra', role: 'ADMIN', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
  { id: 2, email: 'priya.sharma@campusiq.edu', fullName: 'Prof. Priya Sharma', role: 'FACULTY', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
  { id: 3, email: 'rajesh.verma@campusiq.edu', fullName: 'Dr. Rajesh Verma', role: 'FACULTY', avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150' },
  { id: 5, email: 'aarav.patel@student.campusiq.edu', fullName: 'Aarav Patel', role: 'STUDENT', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' },
  { id: 6, email: 'diya.nair@student.campusiq.edu', fullName: 'Diya Nair', role: 'STUDENT', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 7, email: 'rohan.gupta@student.campusiq.edu', fullName: 'Rohan Gupta', role: 'STUDENT', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 8, email: 'sneha.reddy@student.campusiq.edu', fullName: 'Sneha Reddy', role: 'STUDENT', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }
];

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 1,
    userId: 5,
    fullName: 'Aarav Patel',
    email: 'aarav.patel@student.campusiq.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    college: 'MIT Institute of Technology',
    department: 'Computer Science & Engineering',
    year: 3,
    cgpa: 8.85,
    phone: '+91 91234 56789',
    targetCareer: 'Full Stack Developer',
    bio: 'Passionate developer building modern web apps with React, Next.js, and Java Spring Boot.',
    githubUrl: 'https://github.com/aaravpatel',
    linkedinUrl: 'https://linkedin.com/in/aaravpatel',
    portfolioUrl: 'https://aaravpatel.dev',
    careerReadinessScore: 78,
    technicalSkillScore: 82,
    dsaScore: 68,
    projectsScore: 75,
    academicScore: 88,
    resumeScore: 82,
    interviewScore: 65,
    certificationsScore: 70,
    attendancePercentage: 89.50
  },
  {
    id: 2,
    userId: 6,
    fullName: 'Diya Nair',
    email: 'diya.nair@student.campusiq.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    college: 'MIT Institute of Technology',
    department: 'Computer Science & Engineering',
    year: 4,
    cgpa: 9.20,
    phone: '+91 91234 56780',
    targetCareer: 'AI Engineer',
    bio: 'Deep learning & LLM researcher.',
    githubUrl: 'https://github.com/diyanair',
    linkedinUrl: 'https://linkedin.com/in/diyanair',
    careerReadinessScore: 89,
    technicalSkillScore: 92,
    dsaScore: 85,
    projectsScore: 90,
    academicScore: 92,
    resumeScore: 90,
    interviewScore: 84,
    certificationsScore: 85,
    attendancePercentage: 94.00
  },
  {
    id: 3,
    userId: 7,
    fullName: 'Rohan Gupta',
    email: 'rohan.gupta@student.campusiq.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    college: 'MIT Institute of Technology',
    department: 'Information Technology',
    year: 3,
    cgpa: 7.45,
    phone: '+91 91234 56781',
    targetCareer: 'Cloud Engineer',
    bio: 'AWS & Kubernetes cloud enthusiast.',
    githubUrl: 'https://github.com/rohangupta',
    linkedinUrl: 'https://linkedin.com/in/rohangupta',
    careerReadinessScore: 68,
    technicalSkillScore: 70,
    dsaScore: 58,
    projectsScore: 65,
    academicScore: 74,
    resumeScore: 75,
    interviewScore: 60,
    certificationsScore: 80,
    attendancePercentage: 72.00
  },
  {
    id: 4,
    userId: 8,
    fullName: 'Sneha Reddy',
    email: 'sneha.reddy@student.campusiq.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    college: 'MIT Institute of Technology',
    department: 'Computer Science & Engineering',
    year: 4,
    cgpa: 8.60,
    phone: '+91 91234 56782',
    targetCareer: 'Software Engineer',
    bio: 'Competitive programmer (4-star CodeChef, 400+ LeetCode).',
    githubUrl: 'https://github.com/snehareddy',
    linkedinUrl: 'https://linkedin.com/in/snehareddy',
    careerReadinessScore: 84,
    technicalSkillScore: 86,
    dsaScore: 92,
    projectsScore: 78,
    academicScore: 86,
    resumeScore: 85,
    interviewScore: 80,
    certificationsScore: 75,
    attendancePercentage: 91.00
  }
];

export const INITIAL_FACULTY: FacultyProfile[] = [
  {
    id: 1,
    userId: 2,
    fullName: 'Prof. Priya Sharma',
    email: 'priya.sharma@campusiq.edu',
    department: 'Computer Science & Engineering',
    designation: 'Professor & Head of Department',
    cabinLocation: 'CS Block 301',
    specialization: 'Artificial Intelligence & Distributed Architecture',
    phone: '+91 98765 43210'
  },
  {
    id: 2,
    userId: 3,
    fullName: 'Dr. Rajesh Verma',
    email: 'rajesh.verma@campusiq.edu',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    cabinLocation: 'CS Block 204',
    specialization: 'Algorithms & Database Management Systems',
    phone: '+91 98765 43211'
  }
];

export const INITIAL_SKILLS: Skill[] = [
  { id: 1, name: 'React / Next.js', category: 'FRAMEWORK', proficiencyLevel: 'ADVANCED', verified: true, score: 85 },
  { id: 2, name: 'TypeScript', category: 'PROGRAMMING', proficiencyLevel: 'ADVANCED', verified: true, score: 82 },
  { id: 3, name: 'Java', category: 'PROGRAMMING', proficiencyLevel: 'INTERMEDIATE', verified: true, score: 72 },
  { id: 4, name: 'Spring Boot', category: 'FRAMEWORK', proficiencyLevel: 'BEGINNER', verified: false, score: 55 },
  { id: 5, name: 'PostgreSQL', category: 'DATABASE', proficiencyLevel: 'INTERMEDIATE', verified: true, score: 80 },
  { id: 6, name: 'Data Structures & Algorithms', category: 'CORE_CS', proficiencyLevel: 'INTERMEDIATE', verified: true, score: 68 },
  { id: 7, name: 'System Design', category: 'CORE_CS', proficiencyLevel: 'BEGINNER', verified: false, score: 45 },
  { id: 8, name: 'Docker & Kubernetes', category: 'CLOUD_DEVOPS', proficiencyLevel: 'BEGINNER', verified: false, score: 50 },
  { id: 9, name: 'Communication & HR Skills', category: 'SOFT_SKILLS', proficiencyLevel: 'INTERMEDIATE', verified: true, score: 65 }
];

export const INITIAL_LEARNING_PATH: LearningPath = {
  id: 1,
  title: 'Full Stack Product Engineer Mastery',
  targetRole: 'Full Stack Developer',
  estimatedMonths: 6,
  totalModules: 6,
  completedModules: 2,
  modules: [
    {
      monthNumber: 1,
      topic: 'Month 1: Advanced TypeScript & Modern React Architecture',
      description: 'Master React 19 hooks, concurrency, server actions, caching, and state machines.',
      difficulty: 'MEDIUM',
      estimatedHours: 24,
      resources: [
        { title: 'React Deep Dive Documentation', url: 'https://react.dev' },
        { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' }
      ],
      practiceTasks: [
        'Build a custom Kanban board with optimistic UI updates',
        'Implement custom debounce and throttle hooks in TypeScript'
      ],
      projectMilestone: 'In-Memory High-Performance Cache Library',
      isCompleted: true
    },
    {
      monthNumber: 2,
      topic: 'Month 2: Data Structures & Algorithms Sprint',
      description: 'Solve 75 curated LeetCode problems focusing on Graphs, Trees, and Dynamic Programming.',
      difficulty: 'HARD',
      estimatedHours: 35,
      resources: [
        { title: 'NeetCode 150 Guide', url: 'https://neetcode.io' },
        { title: 'MIT 6.006 Algorithms', url: 'https://ocw.mit.edu' }
      ],
      practiceTasks: [
        'Solve 20 Tree problems on LeetCode',
        'Implement Dijkstra and Topological Sort from scratch'
      ],
      projectMilestone: 'Interactive Shortest Path Visualizer Web App',
      isCompleted: true
    },
    {
      monthNumber: 3,
      topic: 'Month 3: Spring Boot 3 & Enterprise Architecture',
      description: 'Deep dive into Spring Data JPA, Hibernate optimization, Spring Security with JWT, and OpenAPI specs.',
      difficulty: 'HARD',
      estimatedHours: 30,
      resources: [
        { title: 'Spring Boot Reference Guide', url: 'https://spring.io/projects/spring-boot' },
        { title: 'Baeldung Spring Boot Masterclass', url: 'https://www.baeldung.com' }
      ],
      practiceTasks: [
        'Build a multi-tenant SaaS REST API with Spring Security and PostgreSQL',
        'Implement pagination, sorting, and custom query specifications'
      ],
      projectMilestone: 'Campus Collab Platform API with Real-Time WebSockets',
      isCompleted: false
    },
    {
      monthNumber: 4,
      topic: 'Month 4: Relational Database Tuning & Redis Caching',
      description: 'PostgreSQL indexing strategies, EXPLAIN ANALYZE, connection pooling, and Redis distributed caching.',
      difficulty: 'MEDIUM',
      estimatedHours: 20,
      resources: [
        { title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com' },
        { title: 'Redis University', url: 'https://university.redis.com' }
      ],
      practiceTasks: [
        'Set up Redis caching for hot product listings',
        'Benchmark database query execution times before and after B-Tree indexes'
      ],
      projectMilestone: 'AI-Powered Analytics SaaS Dashboard',
      isCompleted: false
    },
    {
      monthNumber: 5,
      topic: 'Month 5: Docker, CI/CD & Cloud Deployment',
      description: 'Containerize full-stack apps with multi-stage Dockerfiles, GitHub Actions CI/CD, and AWS ECS/S3 deployment.',
      difficulty: 'MEDIUM',
      estimatedHours: 25,
      resources: [
        { title: 'Docker Official Documentation', url: 'https://docs.docker.com' },
        { title: 'AWS Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/' }
      ],
      practiceTasks: [
        'Write GitHub Actions workflow to run lint, test, and push Docker image',
        'Deploy Spring Boot + Next.js app to AWS with SSL certificates'
      ],
      projectMilestone: 'Automated Production Deployment Pipeline on Cloud',
      isCompleted: false
    },
    {
      monthNumber: 6,
      topic: 'Month 6: Distributed System Design & Mock MNC Interviews',
      description: 'High-level architectures: Rate limiters, URL shorteners, distributed notification queues, and mock interviews.',
      difficulty: 'HARD',
      estimatedHours: 35,
      resources: [
        { title: 'System Design Primer by Donne Martin', url: 'https://github.com/donnemartin/system-design-primer' },
        { title: 'ByteByteGo Architecture Guide', url: 'https://bytebytego.com' }
      ],
      practiceTasks: [
        'Design a scalable video streaming platform architecture diagram',
        'Complete 5 mock AI technical & behavioral interview rounds'
      ],
      projectMilestone: 'Full Capstone Portfolio Demo & Live MNC Placement Drive',
      isCompleted: false
    }
  ]
};

export const INITIAL_ACADEMIC_RECORDS: AcademicRecord[] = [
  {
    id: 1,
    subjectCode: 'CS301',
    subjectName: 'Data Structures & Algorithms',
    semester: 5,
    internalMarks: 26.5,
    assignmentMarks: 18.0,
    examMarks: 42.5,
    totalMarks: 87.0,
    grade: 'A+',
    aiFeedback: 'Strong grasp of graph traversals and sorting; recommend revising dynamic programming memoization patterns.'
  },
  {
    id: 2,
    subjectCode: 'CS302',
    subjectName: 'Database Management Systems',
    semester: 5,
    internalMarks: 28.0,
    assignmentMarks: 19.5,
    examMarks: 45.0,
    totalMarks: 92.5,
    grade: 'O',
    aiFeedback: 'Exceptional performance in relational normalization and query execution planning.'
  },
  {
    id: 3,
    subjectCode: 'CS303',
    subjectName: 'Operating Systems & Concurrency',
    semester: 5,
    internalMarks: 24.0,
    assignmentMarks: 16.0,
    examMarks: 38.0,
    totalMarks: 78.0,
    grade: 'A',
    aiFeedback: 'Good understanding of process synchronization; review virtual memory paging concepts.'
  },
  {
    id: 4,
    subjectCode: 'CS304',
    subjectName: 'Web Technologies & Cloud Arch',
    semester: 5,
    internalMarks: 29.0,
    assignmentMarks: 20.0,
    examMarks: 46.0,
    totalMarks: 95.0,
    grade: 'O',
    aiFeedback: 'Top in class for full-stack API integration and client-side state handling.'
  },
  {
    id: 5,
    subjectCode: 'CS305',
    subjectName: 'Computer Networks & Security',
    semester: 5,
    internalMarks: 22.0,
    assignmentMarks: 15.0,
    examMarks: 35.0,
    totalMarks: 72.0,
    grade: 'B+',
    aiFeedback: '⚠️ Performance in Network Protocol layers dropped by 12% in Midterm 2. Recommended revision: TCP 3-way handshake and subnetting calculations.'
  }
];

export const INITIAL_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  { id: 1, subjectCode: 'CS301', subjectName: 'Data Structures & Algorithms', totalClasses: 42, attendedClasses: 38, percentage: 90.48, status: 'SAFE' },
  { id: 2, subjectCode: 'CS302', subjectName: 'Database Management Systems', totalClasses: 40, attendedClasses: 38, percentage: 95.00, status: 'SAFE' },
  { id: 3, subjectCode: 'CS303', subjectName: 'Operating Systems & Concurrency', totalClasses: 38, attendedClasses: 33, percentage: 86.84, status: 'SAFE' },
  { id: 4, subjectCode: 'CS304', subjectName: 'Web Technologies & Cloud Arch', totalClasses: 44, attendedClasses: 42, percentage: 95.45, status: 'SAFE' },
  { id: 5, subjectCode: 'CS305', subjectName: 'Computer Networks & Security', totalClasses: 36, attendedClasses: 27, percentage: 75.00, status: 'WARNING' },
  { id: 6, subjectCode: 'CS306', subjectName: 'AI & Machine Learning Lab', totalClasses: 30, attendedClasses: 28, percentage: 93.33, status: 'SAFE' }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'AI Resume & ATS Intelligence Engine',
    description: 'Next-generation resume parser with NLP scoring, keyword extraction, and ATS compliance recommendations.',
    category: 'AI_ML',
    techStack: ['FastAPI', 'Python', 'React', 'Tailwind CSS', 'PostgreSQL'],
    difficulty: 'INTERMEDIATE',
    teamSize: 3,
    githubUrl: 'https://github.com/campusiq/resume-ai',
    demoUrl: 'https://resume.campusiq.edu',
    status: 'COMPLETED',
    createdByUserId: 5,
    createdByName: 'Aarav Patel',
    createdAt: '2026-07-15'
  },
  {
    id: 2,
    title: 'Campus Emergency & Safety Dispatch Grid',
    description: 'Real-time incident reporting and campus alert broadcasting with geolocation telemetry and WebSockets.',
    category: 'WEB_DEV',
    techStack: ['Next.js', 'Node.js', 'Socket.io', 'PostgreSQL', 'Leaflet'],
    difficulty: 'ADVANCED',
    teamSize: 4,
    githubUrl: 'https://github.com/campusiq/campus-safety',
    demoUrl: 'https://safety.campusiq.edu',
    status: 'IN_PROGRESS',
    createdByUserId: 5,
    createdByName: 'Aarav Patel',
    createdAt: '2026-08-01'
  },
  {
    id: 3,
    title: 'Cloud-Native Automated Facial Attendance',
    description: 'Facial recognition attendance system with edge computing cameras and automated parent alert dispatching.',
    category: 'AI_ML',
    techStack: ['Python', 'OpenCV', 'AWS Lambda', 'DynamoDB', 'FastAPI'],
    difficulty: 'ADVANCED',
    teamSize: 4,
    githubUrl: 'https://github.com/campusiq/facial-attendance',
    demoUrl: 'https://attend.campusiq.edu',
    status: 'IN_PROGRESS',
    createdByUserId: 6,
    createdByName: 'Diya Nair',
    createdAt: '2026-08-05'
  },
  {
    id: 4,
    title: 'Distributed Microservices Cloud Commerce Core',
    description: 'High-throughput e-commerce core with Kafka event streaming, Redis caching, and resilient circuit breakers.',
    category: 'CLOUD_DEVOPS',
    techStack: ['Spring Boot 3', 'Apache Kafka', 'PostgreSQL', 'Docker', 'Kubernetes'],
    difficulty: 'ADVANCED',
    teamSize: 3,
    githubUrl: 'https://github.com/campusiq/micro-shop',
    demoUrl: 'https://shop.campusiq.dev',
    status: 'PLANNING',
    createdByUserId: 7,
    createdByName: 'Rohan Gupta',
    createdAt: '2026-08-10'
  },
  {
    id: 5,
    title: 'Blockchain Academic Credential Registry',
    description: 'Tamper-proof smart contract registry on Polygon to verify university transcripts and degrees instantly.',
    category: 'BLOCKCHAIN',
    techStack: ['Solidity', 'Hardhat', 'Polygon', 'Next.js', 'Ethers.js'],
    difficulty: 'INTERMEDIATE',
    teamSize: 2,
    githubUrl: 'https://github.com/campusiq/vericred',
    demoUrl: 'https://vericred.campusiq.edu',
    status: 'COMPLETED',
    createdByUserId: 8,
    createdByName: 'Sneha Reddy',
    createdAt: '2026-07-20'
  }
];

export const INITIAL_HACKATHONS: Hackathon[] = [
  {
    id: 1,
    name: 'Smart India Hackathon 2026',
    organizer: 'Ministry of Education & AICTE',
    description: 'Nationwide digital initiative solving real-world challenges across education, health, smart cities, and AI.',
    dateStart: '2026-09-05',
    dateEnd: '2026-09-07',
    location: 'New Delhi & Virtual Nodal Centers',
    mode: 'HYBRID',
    prizePool: '₹1,00,000 per problem statement',
    requiredSkills: ['React', 'Python', 'Cloud', 'AI/ML', 'IoT'],
    registrationDeadline: '2026-08-25',
    maxTeamSize: 6,
    registrationUrl: 'https://sih.gov.in',
    bannerUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
    isSaved: true
  },
  {
    id: 2,
    name: 'Google Cloud AI Global Hackathon',
    organizer: 'Google Cloud Platform',
    description: 'Build generative AI applications using Gemini 1.5 Pro, Vertex AI, and Google Cloud Run for social impact.',
    dateStart: '2026-09-12',
    dateEnd: '2026-09-14',
    location: 'Online (Global)',
    mode: 'ONLINE',
    prizePool: '$50,000 USD',
    requiredSkills: ['Gemini API', 'FastAPI', 'Next.js', 'Docker'],
    registrationDeadline: '2026-08-30',
    maxTeamSize: 4,
    registrationUrl: 'https://cloud.google.com/hackathons',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600',
    isSaved: false
  },
  {
    id: 3,
    name: 'Microsoft Imagine Cup 2026',
    organizer: 'Microsoft Corporation',
    description: 'Empowering student developers worldwide to bring tech solutions solving sustainability, health, and accessibility.',
    dateStart: '2026-09-25',
    dateEnd: '2026-09-28',
    location: 'Redmond, WA / Virtual',
    mode: 'HYBRID',
    prizePool: '$100,000 USD + Mentorship',
    requiredSkills: ['Azure', 'C#', 'Python', 'React', 'AI'],
    registrationDeadline: '2026-09-10',
    maxTeamSize: 4,
    registrationUrl: 'https://imaginecup.microsoft.com',
    bannerUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600',
    isSaved: true
  },
  {
    id: 4,
    name: 'ETHIndia 2026 Hackathon',
    organizer: 'Devfolio & ETHGlobal',
    description: 'Asia’s largest Ethereum hackathon bringing together 2,000+ builders to create decentralized futures.',
    dateStart: '2026-10-02',
    dateEnd: '2026-10-04',
    location: 'KTPO Bangalore, India',
    mode: 'OFFLINE',
    prizePool: '$120,000 in bounties',
    requiredSkills: ['Solidity', 'Web3.js', 'React', 'Zero Knowledge'],
    registrationDeadline: '2026-09-15',
    maxTeamSize: 4,
    registrationUrl: 'https://ethindia.co',
    bannerUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600',
    isSaved: false
  }
];

export const INITIAL_CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 1,
    title: 'Two Sum Target Index',
    slug: 'two-sum',
    topic: 'ARRAYS',
    difficulty: 'EASY',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    inputFormat: 'nums = [2,7,11,15], target = 9',
    outputFormat: '[0,1]',
    constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9',
    sampleTestCases: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ],
    defaultStarterCode: {
      javascript: 'function twoSum(nums, target) {\n  const map = new Map();\n  for(let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if(map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}',
      python: 'def two_sum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []',
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) return new int[] { map.get(comp), i };\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}',
      cpp: '#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for(int i=0; i<nums.size(); i++) {\n            int diff = target - nums[i];\n            if(seen.count(diff)) return {seen[diff], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};'
    },
    acceptanceRate: 88.5,
    isSolved: true
  },
  {
    id: 2,
    title: 'Valid Parentheses Matching',
    slug: 'valid-parentheses',
    topic: 'STACK_QUEUE',
    difficulty: 'EASY',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order.',
    inputFormat: 's = "()[]{}"',
    outputFormat: 'true',
    constraints: '1 <= s.length <= 10^4\ns consists of parentheses only',
    sampleTestCases: [
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    defaultStarterCode: {
      javascript: 'function isValid(s) {\n  const stack = [];\n  const map = { ")": "(", "}": "{", "]": "[" };\n  for(let char of s) {\n    if(!map[char]) stack.push(char);\n    else if(stack.pop() !== map[char]) return false;\n  }\n  return stack.length === 0;\n}',
      python: 'def is_valid(s: str) -> bool:\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else "#"\n            if mapping[char] != top: return False\n        else: stack.append(char)\n    return not stack'
    },
    acceptanceRate: 82.1,
    isSolved: true
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeats',
    topic: 'STRINGS',
    difficulty: 'MEDIUM',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters using sliding window.',
    inputFormat: 's = "abcabcbb"',
    outputFormat: '3',
    constraints: '0 <= s.length <= 5 * 10^4',
    sampleTestCases: [
      { input: 's = "abcabcbb"', output: '3' },
      { input: 's = "bbbbb"', output: '1' }
    ],
    defaultStarterCode: {
      javascript: 'function lengthOfLongestSubstring(s) {\n  let set = new Set();\n  let left = 0, maxLen = 0;\n  for(let right = 0; right < s.length; right++) {\n    while(set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}',
      python: 'def length_of_longest_substring(s: str) -> int:\n    char_set = set()\n    left = 0\n    res = 0\n    for right in range(len(s)):\n        while s[right] in char_set:\n            char_set.remove(s[left])\n            left += 1\n        char_set.add(s[right])\n        res = max(res, right - left + 1)\n    return res'
    },
    acceptanceRate: 74.3,
    isSolved: false
  },
  {
    id: 4,
    title: 'Coin Change Minimum Count',
    slug: 'coin-change',
    topic: 'DYNAMIC_PROGRAMMING',
    difficulty: 'MEDIUM',
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount.',
    inputFormat: 'coins = [1,2,5], amount = 11',
    outputFormat: '3',
    constraints: '1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4',
    sampleTestCases: [
      { input: 'coins = [1,2,5], amount = 11', output: '3' },
      { input: 'coins = [2], amount = 3', output: '-1' }
    ],
    defaultStarterCode: {
      javascript: 'function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for(let i = 1; i <= amount; i++) {\n    for(let coin of coins) {\n      if(i - coin >= 0) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}',
      python: 'def coin_change(coins: list[int], amount: int) -> int:\n    dp = [float("inf")] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for c in coins:\n            if i - c >= 0:\n                dp[i] = min(dp[i], dp[i - c] + 1)\n    return dp[amount] if dp[amount] != float("inf") else -1'
    },
    acceptanceRate: 65.8,
    isSolved: false
  }
];

export const INITIAL_PLACEMENTS: PlacementApplication[] = [
  {
    id: 1,
    companyName: 'Google India',
    roleTitle: 'Associate Software Engineer',
    ctcLpa: 28.50,
    location: 'Bangalore / Hyderabad',
    appliedDate: '2026-07-24',
    status: 'TECHNICAL_INTERVIEW',
    notes: 'Passed initial OA (100% test cases). Round 2 Technical scheduled for System Design & Graph Algorithms.',
    interviewDate: '2026-08-22 14:00'
  },
  {
    id: 2,
    companyName: 'Microsoft',
    roleTitle: 'Software Engineer I',
    ctcLpa: 26.00,
    location: 'Bangalore',
    appliedDate: '2026-07-10',
    status: 'HR_INTERVIEW',
    notes: 'Cleared Coding Round 1 & 2. Final AA / Director round upcoming.',
    interviewDate: '2026-08-25 11:30'
  },
  {
    id: 3,
    companyName: 'Amazon AWS',
    roleTitle: 'Cloud Support Engineer / SDE',
    ctcLpa: 22.00,
    location: 'Hyderabad',
    appliedDate: '2026-08-03',
    status: 'ONLINE_ASSESSMENT',
    notes: 'OA link received, 48 hours assessment window active.',
    interviewDate: '2026-08-20 18:00'
  },
  {
    id: 4,
    companyName: 'Atlassian',
    roleTitle: 'Graduate Software Engineer',
    ctcLpa: 32.00,
    location: 'Bengaluru (Remote)',
    appliedDate: '2026-06-28',
    status: 'SELECTED',
    notes: '🎉 Offer Letter Released! CTC: 32 LPA (Base 18L + 12L Stocks + Joining Bonus).'
  },
  {
    id: 5,
    companyName: 'Goldman Sachs',
    roleTitle: 'Summer Technology Analyst',
    ctcLpa: 24.00,
    location: 'Bangalore',
    appliedDate: '2026-06-18',
    status: 'REJECTED',
    notes: 'Fell short in Round 2 Advanced Probability / DP question.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    title: 'Technical Interview Alert: Google India',
    message: 'Your Technical Round 2 with Google ASE hiring team is scheduled in 3 days. Review Graphs and System Design.',
    category: 'INTERVIEW_REMINDER',
    isRead: false,
    actionUrl: '/placements',
    createdAt: '10m ago'
  },
  {
    id: 2,
    title: 'Smart India Hackathon Registration',
    message: 'Registration for SIH 2026 closes in 5 days. 2 team spots remaining in your team.',
    category: 'HACKATHON',
    isRead: false,
    actionUrl: '/hackathons',
    createdAt: '2h ago'
  },
  {
    id: 3,
    title: 'Attendance Warning: Computer Networks',
    message: 'Your attendance in Computer Networks (CS305) is 75.0%. Maintain above 75% to avoid exam eligibility hold.',
    category: 'ATTENDANCE_WARNING',
    isRead: true,
    actionUrl: '/attendance',
    createdAt: '1d ago'
  },
  {
    id: 4,
    title: 'AI Learning Roadmap Milestone Unlocked',
    message: 'Congratulations! You completed Month 2: DSA Sprint. Career readiness increased +4%.',
    category: 'LEARNING_MILESTONE',
    isRead: true,
    actionUrl: '/learning-path',
    createdAt: '2d ago'
  },
  {
    id: 5,
    title: 'Placement Offer Released: Atlassian',
    message: 'Congratulations Aarav! Atlassian has released your formal offer letter for 32 LPA.',
    category: 'PLACEMENT_UPDATE',
    isRead: false,
    actionUrl: '/placements',
    createdAt: '3d ago'
  }
];
