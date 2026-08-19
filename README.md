# CampusAI – AI-Powered Campus Intelligence & Career Platform

[![Stack: Next.js](https://img.shields.io/badge/Frontend-Next.js%20%7C%20React%20%7C%20Tailwind-indigo.svg)](https://nextjs.org/)
[![Backend: Spring Boot 3](https://img.shields.io/badge/Backend-Java%20Spring%20Boot%203%20%7C%20JWT-green.svg)](https://spring.io/projects/spring-boot)
[![AI Engine: FastAPI](https://img.shields.io/badge/AI%20Engine-Python%20FastAPI%20%7C%20NLP-purple.svg)](https://fastapi.tiangolo.com/)
[![Database: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%2015-blue.svg)](https://www.postgresql.org/)
[![Container: Docker Compose](https://img.shields.io/badge/Infrastructure-Docker%20Compose-cyan.svg)](https://www.docker.com/)

**CampusAI** is an intelligent full-stack SaaS platform designed for college students, faculty, and academic administrators. It accelerates student placement readiness, technical proficiency, academic performance, and interview capability using personalized AI intelligence engines.

---

## 🌟 5 Standout Differentiating Features

1. **AI Career Readiness Engine (The Core Differentiating Feature)**
   - Calculates a live multi-factor readiness score (0-100) combining **25% Technical Skills**, **20% DSA/Coding**, **15% Projects**, **10% Academics**, **10% Resume ATS**, **10% Interview Prep**, and **10% Certifications**.
   - Features dynamic radar charts, 7-factor progress breakdowns, and actionable "Top 3 Things You Should Improve Next" prioritizations.
2. **AI Resume & ATS Analyzer**
   - Upload PDF/DOCX or paste resume text to receive an ATS compatibility score, section-by-section strengths & weaknesses, missing keywords, and an instant downloadable optimized Markdown resume structure.
3. **AI Skill-Gap Analyzer**
   - Benchmarks current skills against real-world MNC hiring matrices for Full Stack, Software Engineer, Cloud Engineer, AI Engineer, and DevOps roles with prioritized remediation.
4. **Personalized AI Learning Path**
   - Interactive 6-month curriculum with curated study resources, hands-on practice tasks, capstone milestones, and real-time readiness score recalculation upon completing milestones.
5. **AI Interview Simulator**
   - Practice Technical, HR, Behavioral, and Resume-specific mock interviews with voice/text input, instant scoring (0-100), missing technical points, and placement-grade model answers.

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────┐
│               Next.js / TypeScript Frontend            │
│  (Modern SaaS UI, Recharts, Responsive AppShell, Confetti)│
└───────────────▲────────────────────────▲───────────────┘
                │                        │
         REST / JWT Auth          Direct AI Endpoints
                │                        │
┌───────────────▼───────────────┐ ┌──────▼───────────────┐
│     Java Spring Boot 3        │ │  Python FastAPI AI   │
│ (Spring Security, JPA, 22 Ent)│◄┤ (LLM / NLP Heuristics│
└───────────────▲───────────────┘ └──────────────────────┘
                │
┌───────────────▼───────────────┐
│   PostgreSQL 15 Database      │
│ (22 Relational Tables + Seed) │
└───────────────────────────────┘
```

---

## 🔑 Demo Credentials (1-Click Switcher Available in UI)

| Role | Email | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **Student** | `aarav.patel@student.campusiq.edu` | `password123` | Student Dashboard, AI Resume, Coding DSA, Mock Interviews |
| **Faculty** | `priya.sharma@campusiq.edu` | `password123` | Batch Attendance, Marks Entry, At-Risk Student Warnings |
| **Admin** | `admin@campusiq.edu` | `password123` | Platform KPIs, Department Analytics, User Management |

---

## 🚀 Quick Start Guide

### Option 1: Run with Docker Compose (Recommended)
```bash
# Clone the repository
git clone https://github.com/your-org/campusiq.git
cd campusiq

# Copy environment variables template
cp .env.example .env

# Start all microservices (PostgreSQL + FastAPI + Spring Boot + Next.js)
docker-compose up --build
```
- **Frontend Web App:** [http://localhost:3000](http://localhost:3000)
- **Backend REST API:** [http://localhost:8080](http://localhost:8080)
- **AI Intelligence Service:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **PostgreSQL Database:** `localhost:5432` (User: `postgres`, DB: `campusiq`)

---

### Option 2: Running Locally (Development Mode)

#### 1. Start Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:3000
```

#### 2. Start AI Service (Python FastAPI)
```bash
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# Docs available at http://localhost:8000/docs
```

#### 3. Start Backend (Java Spring Boot 3)
```bash
cd backend
mvn spring-boot:run
# Backend REST API starts on port 8080
```

---

## 📂 Project Structure

```
CAMPUSIQ/
├── frontend/                 # Next.js 14 App Router, TypeScript, Tailwind CSS
│   ├── src/app/              # 15+ rich SaaS application routes
│   ├── src/components/       # Layouts, Navbar, Sidebar, ScoreWidget, UI components
│   ├── src/context/          # AuthContext, StudentContext
│   ├── src/lib/              # Mock database, AI simulation engine, API connectors
│   └── src/types/            # Comprehensive TypeScript definitions
├── backend/                  # Java Spring Boot 3 REST API Service
│   ├── src/main/java/com/campusiq/
│   │   ├── config/           # Spring Security, JWT Filter, DataInitializer
│   │   ├── controller/       # 10 REST Controllers
│   │   ├── model/            # 22 JPA Entities
│   │   ├── repository/       # Spring Data JPA Repositories
│   │   └── service/          # Business logic services
│   └── pom.xml
├── ai-service/               # Python FastAPI Microservice
│   ├── app/
│   │   ├── routers/          # Resume, SkillGap, Roadmap, Interview, Mentor, Readiness
│   │   ├── services/         # Heuristics & LLM engine
│   │   └── models/           # Pydantic schemas
│   ├── requirements.txt
│   └── Dockerfile
├── database/                 # Relational PostgreSQL Database
│   ├── schema.sql            # Complete 22-table DDL schema
│   └── seed.sql              # Realistic seed data (10 students, 3 faculty, 1 admin)
├── docker/                   # Dockerfiles
├── docker-compose.yml        # Full-stack container orchestration
├── .env.example              # Environment variables template
└── README.md
```

---

## 🛡️ Security & Enterprise Readiness
- **Stateless JWT Authentication:** Secure token validation with role-based routing.
- **BCrypt Password Hashing:** Enterprise cryptographic password hashing.
- **Fail-Safe AI Architecture:** Dual-mode LLM engine with smart offline fallback guaranteeing 100% platform availability even without third-party API keys.
- **Relational Integrity:** Foreign keys, cascades, composite indexes, and database check constraints.

---

&copy; 2026 CampusAI – AI-Powered Campus Intelligence & Career Platform. Built for MNC Recruitment Drives, National Hackathons, and University Portals.
