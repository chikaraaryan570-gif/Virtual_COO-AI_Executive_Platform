# pyrefly: ignore [missing-import]
from .database import get_connection

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Drop existing table to ensure schema is fully updated during init
    cursor.execute("DROP TABLE IF EXISTS company")

    cursor.execute("""
        CREATE TABLE company (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_name TEXT NOT NULL,
            industry TEXT,
            employees INTEGER,
            annual_revenue REAL,
            revenue REAL,
            expenses REAL,
            profit REAL,
            sales_growth REAL,
            customer_satisfaction REAL,
            employee_satisfaction REAL,
            pending_tasks INTEGER,
            location TEXT,
            founded_year INTEGER,
            description TEXT
        )
    """)

    # Seed the initial company data
    cursor.execute("""
        INSERT INTO company (
            company_name, industry, employees, annual_revenue,
            revenue, expenses, profit, sales_growth,
            customer_satisfaction, employee_satisfaction, pending_tasks,
            location, founded_year, description
        ) VALUES (
            'TechNova Solutions', 'Technology', 120, 850000,
            850000, 520000, 330000, 16.5,
            91.0, 88.0, 24,
            'San Francisco, CA', 2018, 'Leading provider of innovative software solutions for enterprise resource planning and AI automation.'
        )
    """)

    conn.commit()
    conn.close()

    print("Database initialized successfully.")

if __name__ == "__main__":
    init_db()