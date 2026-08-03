from agents.supervisor import supervisor
from services.firebase_service import db

async def run_chat(message: str, uid: str):
    doc = db.collection("companies").document(uid).get()
    
    if doc.exists:
        company = doc.to_dict()
    else:
        company = {}

    prompt = f"""
Company Name: {company.get('companyName', 'Unknown')}
Employees: {company.get('employees', 0)}
Revenue: {company.get('revenue', 0)}
Expenses: {company.get('expenses', 0)}
Profit: {company.get('profit', 0)}
Sales Growth: {company.get('sales_growth', 0)}
Customer Satisfaction: {company.get('customer_satisfaction', 0)}
Employee Satisfaction: {company.get('employee_satisfaction', 0)}
Pending Tasks: {company.get('pending_tasks', 0)}

User Question:
{message}
"""

    agent = supervisor.route(message)
    return agent.run(prompt)