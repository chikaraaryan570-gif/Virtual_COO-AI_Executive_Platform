import os
from dotenv import load_dotenv

load_dotenv()

MODEL = os.getenv("MODEL", "llama-3.3-70b-versatile")