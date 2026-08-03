from fastapi import APIRouter, Depends, HTTPException
from routes.auth import get_current_user
from services.firebase_service import db

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/company")
def company(user = Depends(get_current_user)):
    # This route might be deprecated since frontend uses onSnapshot directly.
    # We keep it for backwards compatibility or server-side reads.
    doc = db.collection("companies").document(user["uid"]).get()
    if not doc.exists:
        return {}
    return doc.to_dict()

@router.post("/company/update")
def update_company(data: dict, user = Depends(get_current_user)):
    try:
        # Filter out None values
        update_data = {k: v for k, v in data.items() if v is not None}
        if not update_data:
            return {"status": "success", "message": "No data to update"}
        
        # Merge True will create the document if it doesn't exist, and only update specified fields
        db.collection("companies").document(user["uid"]).set(update_data, merge=True)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))