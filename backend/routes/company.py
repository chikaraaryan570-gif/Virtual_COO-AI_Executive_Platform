from fastapi import APIRouter

from services.data_service import load_company_data

router = APIRouter()

@router.get("/company")

def company():

    return load_company_data()