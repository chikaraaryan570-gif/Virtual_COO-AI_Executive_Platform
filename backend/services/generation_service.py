import json
from services.groq_client import client
from config import MODEL

def generate_missing_lists(data: dict) -> dict:
    needs_generation = []
    
    # Check Employee Distribution
    if data.get('employees') and (not data.get('employee_distribution') or str(data['employee_distribution']).strip() == ""):
        needs_generation.append('employee_distribution')
        
    # Check Recent Deals
    if data.get('active_deals') and (not data.get('recent_deals') or str(data['recent_deals']).strip() == ""):
        needs_generation.append('recent_deals')
        
    # Check Active Operations
    if data.get('pending_tasks') and (not data.get('active_operations') or str(data['active_operations']).strip() == ""):
        needs_generation.append('active_operations')
        
    # Check Reports List
    if not data.get('reports_list') or str(data['reports_list']).strip() == "":
        needs_generation.append('reports_list')
        
    if not needs_generation:
        return data

    prompt = f"""
    You are an AI assistant generating realistic mock data for a company dashboard based on its KPIs.
    Generate the following missing lists based on the provided company data:
    {', '.join(needs_generation)}
    
    Company Context:
    Industry: {data.get('industry', 'Technology')}
    Employees: {data.get('employees', 0)}
    Sales Growth: {data.get('sales_growth', 0)}%
    Active Deals: {data.get('active_deals', 0)}
    Pending Tasks: {data.get('pending_tasks', 0)}
    
    Format requirements:
    1. employee_distribution: Return a string with one department per line, e.g. "Engineering: 15\\nSales: 5" (must sum up to {data.get('employees', 0)} if possible).
    2. recent_deals: Return a string with one deal per line, e.g. "Enterprise License - $50k\\nCloud Migration - $120k". Max 5 deals.
    3. active_operations: Return a string with one operation per line, e.g. "Q3 Server Migration\\nNew CRM Integration". Max 5 operations.
    4. reports_list: Return a string with one report per line in format "Report Name | Department", e.g. "Q1 Financials | Finance\\nEmployee Survey | HR". Max 4 reports.
    
    Output ONLY valid JSON containing the requested keys with their string values. Do not wrap in markdown tags.
    """
    
    try:
        completion = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        result = json.loads(completion.choices[0].message.content)
        
        for key in needs_generation:
            if key in result:
                data[key] = result[key]
                
    except Exception as e:
        print(f"Failed to generate lists: {e}")
        
    return data
