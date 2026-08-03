import os
import firebase_admin
from firebase_admin import credentials, firestore, auth

def initialize_firebase():
    if not firebase_admin._apps:
        try:
            cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
            if cred_path and os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
            else:
                # Use default credentials
                firebase_admin.initialize_app()
            print("Firebase Admin SDK initialized.")
        except Exception as e:
            print(f"Failed to initialize Firebase Admin SDK: {e}")

initialize_firebase()
db = firestore.client()
