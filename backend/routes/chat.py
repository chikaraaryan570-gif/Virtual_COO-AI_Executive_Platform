from fastapi import APIRouter

from models.chat_model import ChatRequest

from services.chat_service import run_chat

router = APIRouter()

@router.post("/chat")

async def chat(request: ChatRequest):

    response = await run_chat(request.message)

    return {

        "response": response

    }