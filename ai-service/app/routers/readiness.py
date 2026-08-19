from fastapi import APIRouter
from app.models.schemas import ReadinessScoreRequest, ReadinessScoreResponse
from app.services.heuristics import calculate_career_readiness

router = APIRouter(prefix="/api/ai/readiness", tags=["AI Career Readiness Engine"])

@router.post("/calculate", response_model=ReadinessScoreResponse)
async def calculate_readiness_score(request: ReadinessScoreRequest):
    return calculate_career_readiness(
        tech_score=request.technical_skill_score,
        dsa_score=request.dsa_score,
        proj_score=request.projects_score,
        acad_score=request.academic_score,
        resume_score=request.resume_score,
        interview_score=request.interview_score,
        cert_score=request.certifications_score
    )
