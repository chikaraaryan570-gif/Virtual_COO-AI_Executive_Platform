from agents.supervisor import supervisor
from services.data_service import load_company_data

async def run_chat(message: str):

    company = load_company_data()

    prompt = f"""
Company Name: {company['company_name']}
Employees: {company['employees']}
Revenue: {company['revenue']}
Expenses: {company['expenses']}
Profit: {company['profit']}
Sales Growth: {company['sales_growth']}
Customer Satisfaction: {company['customer_satisfaction']}
Employee Satisfaction: {company['employee_satisfaction']}
Pending Tasks: {company['pending_tasks']}

User Question:
{message}
"""

    agent = supervisor.route(message)

    return agent.run(prompt)