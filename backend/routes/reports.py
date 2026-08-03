import io
import datetime
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from routes.auth import get_current_user
from services.firebase_service import db
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
# from agents.reporting_agent import reporting_agent

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.post("/generate")
def generate_report(data: dict, user = Depends(get_current_user)):
    try:
        report_type = data.get("type", "General")
        
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        
        p.setFont("Helvetica-Bold", 16)
        p.drawString(100, 750, f"Virtual COO Report: {report_type}")
        
        p.setFont("Helvetica", 10)
        p.drawString(100, 730, f"Generated on: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        p.setFont("Helvetica", 12)
        p.drawString(100, 700, f"This is an automated business report for {report_type}.")
        
        company_data = db.collection("companies").document(user["uid"]).get().to_dict() or {}
        
        y_pos = 660
        p.setFont("Helvetica-Bold", 14)
        p.drawString(100, y_pos, "Company Overview")
        
        p.setFont("Helvetica", 12)
        y_pos -= 25
        p.drawString(100, y_pos, f"- Total Employees: {company_data.get('employees', 'N/A')}")
        y_pos -= 20
        p.drawString(100, y_pos, f"- Sales Growth: {company_data.get('sales_growth', 'N/A')}%")
        y_pos -= 20
        p.drawString(100, y_pos, f"- Active Deals: {company_data.get('active_deals', 'N/A')}")
        y_pos -= 20
        p.drawString(100, y_pos, f"- Pending Tasks: {company_data.get('pending_tasks', 'N/A')}")
        
        # We can add more sections based on the type if we wanted.
        
        p.showPage()
        p.save()
        
        buffer.seek(0)
        
        return StreamingResponse(
            buffer, 
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=report.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
