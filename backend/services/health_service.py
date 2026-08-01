from services.data_service import load_company_data


def calculate_health():

    company = load_company_data()

    score = 0

    if company["sales_growth"] > 10:
        score += 20

    if company["customer_satisfaction"] > 80:
        score += 20

    if company["employee_satisfaction"] > 80:
        score += 20

    if company["profit"] > 0:
        score += 20

    if company["pending_tasks"] < 30:
        score += 20

    return score