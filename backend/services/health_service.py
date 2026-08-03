from services.firebase_service import db

def calculate_health(uid: str):
    doc = db.collection("companies").document(uid).get()
    
    if not doc.exists:
        return 0
        
    company = doc.to_dict()
    score = 0
    
    if company.get("sales_growth", 0) > 10:
        score += 20
    if company.get("customer_satisfaction", 0) > 80:
        score += 20
    if company.get("employee_satisfaction", 0) > 80:
        score += 20
    if company.get("profit", 0) > 0:
        score += 20
    if company.get("pending_tasks", 0) < 30:
        score += 20
        
    return score