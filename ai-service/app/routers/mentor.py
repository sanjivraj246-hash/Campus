from fastapi import APIRouter
from app.models.schemas import CareerMentorRequest, CareerMentorResponse
from app.services.heuristics import career_mentor_chat

router = APIRouter(prefix="/api/ai/career-advice", tags=["AI Career Mentor"])

@router.post("/chat", response_model=CareerMentorResponse)
async def chat_with_mentor(request: CareerMentorRequest):
    history_dicts = [{"role": h.role, "content": h.content} for h in (request.history or [])]
    return career_mentor_chat(
        message=request.message,
        history=history_dicts,
        student_profile=request.student_profile
    )
