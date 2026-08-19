from fastapi import APIRouter
from app.models.schemas import LearningPathRequest, LearningPathResponse
from app.services.heuristics import generate_learning_roadmap

router = APIRouter(prefix="/api/ai/learning-path", tags=["Learning Roadmap"])

@router.post("/generate", response_model=LearningPathResponse)
async def generate_path(request: LearningPathRequest):
    return generate_learning_roadmap(
        target_role=request.target_role,
        current_skills=request.current_skills
    )
