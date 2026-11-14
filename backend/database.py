import os

from pymongo import MongoClient

MONGO_URI = os.getenv("MONGODB_URI")
if not MONGO_URI:
    raise ValueError("Missing MONGODB_URI environment variable")

client = MongoClient(MONGO_URI)

try:
    client.admin.command("ping")
    print("MongoDB Connected Successfully")
except Exception as e:
    print("MongoDB Error:", e)

db = client["fairhire_ai"]
candidates = db["candidates"]
interview_questions = db["interview_questions"]