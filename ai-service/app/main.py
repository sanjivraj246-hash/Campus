from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import resume, skill_gap, learning_path, interview, mentor, readiness, projects

app = FastAPI(
    title="CampusAI Intelligence Engine",
    description="Microservice providing AI-powered career scoring, resume ATS analysis, roadmap generation, and interview simulations for CampusAI.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router)
app.include_router(skill_gap.router)
app.include_router(learning_path.router)
app.include_router(interview.router)
app.include_router(mentor.router)
app.include_router(readiness.router)
app.include_router(projects.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "CampusAI Intelligence Engine",
        "version": "1.0.0",
        "endpoints": [
            "/api/ai/resume/analyze-text",
            "/api/ai/skill-gap/analyze",
            "/api/ai/learning-path/generate",
            "/api/ai/interview/generate-questions",
            "/api/ai/interview/evaluate-answer",
            "/api/ai/career-advice/chat",
            "/api/ai/readiness/calculate",
            "/api/ai/projects/recommend"
        ]
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
