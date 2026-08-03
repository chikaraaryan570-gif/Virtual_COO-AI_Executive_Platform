from fastapi import APIRouter, Depends
from services.health_service import calculate_health
from routes.auth import get_current_user

router = APIRouter()

@router.get("/company-health")
def company_health(user = Depends(get_current_user)):
    score = calculate_health(user["uid"])
    return {
        "Company Health Score": score,
        "Status": "Excellent" if score >= 80 else "Needs Improvement"
    }