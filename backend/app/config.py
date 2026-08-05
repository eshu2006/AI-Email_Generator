import os
from dotenv import load_dotenv

# Find absolute path of the .env file relative to this file
base_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(base_dir)
dotenv_path = os.path.join(backend_dir, ".env")

load_dotenv(dotenv_path=dotenv_path)

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")