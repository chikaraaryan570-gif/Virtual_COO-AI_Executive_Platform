from fastapi import APIRouter
from database.database import get_connection

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/company")
def company():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM company LIMIT 1")

    row = cursor.fetchone()

    conn.close()

    if row is None:
        return {}

    return {
        "company_name": row["company_name"],
        "employees": row["employees"],
        "revenue": row["revenue"],
        "expenses": row["expenses"],
        "profit": row["profit"],
        "sales_growth": row["sales_growth"],
        "customer_satisfaction": row["customer_satisfaction"],
        "employee_satisfaction": row["employee_satisfaction"],
        "pending_tasks": row["pending_tasks"],
    }