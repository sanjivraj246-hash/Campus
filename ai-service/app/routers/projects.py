from fastapi import APIRouter
from typing import List
from app.models.schemas import ProjectRecommendRequest, RecommendedProject
from app.services.heuristics import recommend_projects

router = APIRouter(prefix="/api/ai/projects", tags=["AI Project Recommender"])

@router.post("/recommend", response_model=List[RecommendedProject])
async def recommend(request: ProjectRecommendRequest):
    return recommend_projects(
        target_role=request.target_role,
        current_skills=request.current_skills
    )
