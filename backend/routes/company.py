from fastapi import APIRouter, Depends
from services.firebase_service import db
from routes.auth import get_current_user

router = APIRouter()

@router.get("/company")
def company(user = Depends(get_current_user)):
    doc = db.collection("companies").document(user["uid"]).get()
    if not doc.exists:
        return {}
    return doc.to_dict()