from database.database import get_connection

def load_company_data():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM company LIMIT 1")

    row = cursor.fetchone()

    conn.close()

    return dict(row)