import sys
import os
from dotenv import load_dotenv

load_dotenv()

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from services.firebase_service import db
from services.generation_service import generate_missing_lists
from firebase_admin import auth

def seed_data():
    try:
        users = auth.list_users()
        if not users.users:
            print("No users found.")
            return

        for user in users.users:
            print(f"Seeding data for user: {user.uid} ({user.email})")
            
            # initial mock data
            data = {
                "industry": "Technology",
                "employees": 120,
                "sales_growth": 20,
                "active_deals": 8,
                "pending_tasks": 5,
                "employee_satisfaction": 92,
                "active_roles": 30,
                "open_positions": 4,
                "customer_satisfaction": 89,
                "conversion_rate": 18,
                "revenue": 2400000,
                "expenses": 1600000,
                "cash_flow": 400000,
                "completed_tasks": 45,
                "system_uptime": 99.9,
                "avg_response_time": 1.5,
                "employee_distribution": "",
                "recent_deals": "",
                "active_operations": "",
                "reports_list": ""
            }
            
            print("Generating lists...")
            augmented_data = generate_missing_lists(data)
            
            db.collection("companies").document(user.uid).set(augmented_data, merge=True)
            print(f"Successfully seeded data for {user.uid}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    seed_data()
