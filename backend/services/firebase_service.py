import os
import json
import firebase_admin
from firebase_admin import credentials, firestore, auth

def initialize_firebase():
    if not firebase_admin._apps:
        try:
            cred_json = os.getenv("FIREBASE_CREDENTIALS_JSON")
            cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
            
            if cred_json:
                cred_dict = json.loads(cred_json)
                cred = credentials.Certificate(cred_dict)
                firebase_admin.initialize_app(cred)
                print("Firebase Admin SDK initialized via JSON string.")
            elif cred_path and os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
                print("Firebase Admin SDK initialized via file.")
            else:
                # Use default credentials
                firebase_admin.initialize_app()
                print("Firebase Admin SDK initialized with defaults.")
        except Exception as e:
            error_msg = f"Failed to initialize Firebase Admin SDK. Please ensure FIREBASE_CREDENTIALS_JSON is set correctly. Error: {e}"
            print(error_msg)
            raise RuntimeError(error_msg)

initialize_firebase()
db = firestore.client()
