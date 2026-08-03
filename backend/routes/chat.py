from fastapi import APIRouter, Depends
from models.chat_model import ChatRequest
from services.chat_service import run_chat
from routes.auth import get_current_user

router = APIRouter()

@router.post("/chat")
async def chat(request: ChatRequest, user = Depends(get_current_user)):
    response = await run_chat(request.message, user["uid"])
    return {
        "response": response
    }