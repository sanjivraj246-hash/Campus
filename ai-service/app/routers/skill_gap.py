from fastapi import APIRouter
from app.models.schemas import SkillGapRequest, SkillGapResponse
from app.services.heuristics import calculate_skill_gap

router = APIRouter(prefix="/api/ai/skill-gap", tags=["Skill Gap Analysis"])

@router.post("/analyze", response_model=SkillGapResponse)
async def analyze_skill_gap(request: SkillGapRequest):
    return calculate_skill_gap(
        current_skills=request.current_skills,
        target_role=request.target_role
    )
