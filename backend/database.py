from pymongo import MongoClient

MONGO_URI = "mongodb+srv://shreeshanth:Kssg%40123@cluster0.yu7ac7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(MONGO_URI)

try:
    client.admin.command("ping")
    print("MongoDB Connected Successfully")
except Exception as e:
    print("MongoDB Error:", e)

db = client["fairhire_ai"]
candidates = db["candidates"]
interview_questions = db["interview_questions"]