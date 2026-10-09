from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/amishkoli621"

try:
    client = MongoClient(MONGO_URI)
    db = client["backend"]
    print("✅ MongoDB Connected Successfully!")
except Exception as e:
    print("❌ MongoDB Connection Failed:", e)
