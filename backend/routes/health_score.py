from fastapi import APIRouter

from services.health_service import calculate_health

router = APIRouter()


@router.get("/company-health")

def company_health():

    score = calculate_health()

    return {

        "Company Health Score": score,

        "Status": "Excellent" if score >= 80 else "Needs Improvement"

    }