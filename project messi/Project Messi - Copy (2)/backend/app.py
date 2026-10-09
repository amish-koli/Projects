import random
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import requests
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, template_folder="templates")
CORS(app)
bcrypt = Bcrypt(app)
app.config["JWT_SECRET_KEY"] = "supersecretkey"
jwt = JWTManager(app)

# Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client["amishkoli621"]
users = db["users"]
db = client["calorie_finder"]
new_food = db["new_food"]
new_exercise = db["new_exercise"]
activity_logs = db["activity_logs"]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/home", methods=["GET"])
def dashboard():
    return render_template("home.html")

@app.route("/register", methods=["GET"])
def register_page():
    return render_template("register.html")

@app.route("/login", methods=["GET"])
def login_page():
    return render_template("login.html")

@app.route("/api/register", methods=["POST"])
def register_api():
    data = request.json
    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "Email already exists! Please log in."}), 400

    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    users.insert_one({"name": data["name"], "email": data["email"], "password": hashed_password})
    token = create_access_token(identity=data["email"])
    return jsonify({"message": "Registration successful!", "token": token, "redirect": "/home"}), 201

@app.route("/api/login", methods=["POST"])
def login_api():
    data = request.json
    user = users.find_one({"email": data["email"]})
    if user and bcrypt.check_password_hash(user["password"], data["password"]):
        token = create_access_token(identity=user["email"])
        return jsonify({"message": "Login successful", "token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/search")
def Search():
    return render_template("home.html")

@app.route("/api/search", methods=["GET"])
def search_food():
    query = request.args.get("query", "").strip()
    if not query:
        return jsonify([])

    results = new_food.find({"name": {"$regex": query, "$options": "i"}})
    data = []
    for item in results:
        data.append({
            "name": item["name"],
            "calories": item["calories"],
            "calories_": item["calories_"],
            "Carbohydrates": item["Carbohydrates"],
            "Cholesterol": item["Cholesterol"],
            "Saturatedfat": item["Saturatedfat"],
            "TotalFat": item["TotalFat"],
            "FiberContent": item["FiberContent"],
            "Potassium": item["Potassium"],
            "Protein": item["Protein"],
            "Sodium": item["Sodium"],
            "Sugar": item["Sugar"],
            "Jog": item["Jog"],
            "Yoga": item["Yoga"],
            "Gym": item["Gym"],
            "Walk": item["Walk"]
        })

    return jsonify(data)

@app.route("/one.html")
def one():
    return render_template("one.html")

def fetch_video_from_youtube(query):
    youtube_api_key = os.getenv("YOUTUBE_API_KEY")
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={query}&key={youtube_api_key}&maxResults=1&type=video"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        if data["items"]:
            video = data["items"][0]
            return {
                "videoId": video["id"]["videoId"],
                "title": video["snippet"]["title"],
                "description": video["snippet"]["description"],
                "duration": "Unknown",  # Optional: Use videos endpoint to fetch real duration
                "intensity": "dynamic"
            }
    return None

@app.route("/api/one", methods=["POST"])
def health_suggestion():
    data = request.json
    mode = data.get("mode")
    age = data.get("age")
    height = data.get("height")
    weight = data.get("weight")
    calories = data.get("calories")

    if not all([mode, age, height, weight, calories]):
        return jsonify({"error": "All fields are required."}), 400

    try:
        age = int(age)
        height = int(height)
        weight = int(weight)
        calories = int(calories)
    except ValueError:
        return jsonify({"error": "Invalid input values."}), 400

    result = {
        "mode": mode,
        "age": age,
        "height": height,
        "weight": weight,
        "calories": calories 
    }

    suggestion = None

    if mode == "calorie":
        required_calories = 10 * weight + 6.25 * height - 5 * age + 5
        result["required_calories"] = required_calories
        if calories > required_calories:
            suggestion = new_exercise.find_one({"intensity": "high"})
        else:
            suggestion = new_exercise.find_one({"intensity": "low"})

    elif mode == "exercise":
        if calories < 100:
            suggestion = new_exercise.find_one({"level": "easy"})
        elif calories < 250:
            suggestion = new_exercise.find_one({"level": "moderate"})
        elif calories < 400:
            suggestion = new_exercise.find_one({"level": "intermediate"})
        elif calories < 600:
            suggestion = new_exercise.find_one({"level": "intense"})
        else:
            suggestion = new_exercise.find_one({"level": "extreme"})
    else:
        return jsonify({"error": "Invalid mode selected."}), 400

    if suggestion:
        result["suggestion"] = suggestion.get("title")
        activity_logs.insert_one(result)
        return jsonify({
            "message": suggestion.get("description"),
            "videoId": suggestion.get("videoId"),
            "title": suggestion.get("title"),
            "duration": suggestion.get("duration"),
            "intensity": suggestion.get("intensity")
        })
    else:
        # YouTube fallback
        query = f"{mode} workout for {calories} calories" if mode == "exercise" else "healthy diet tips"
        youtube_video = fetch_video_from_youtube(query)

        if youtube_video:
            return jsonify({
                "message": youtube_video["description"],
                "videoId": youtube_video["videoId"],
                "title": youtube_video["title"],
                "duration": youtube_video["duration"],
                "intensity": youtube_video["intensity"]
            })
        else:
            return jsonify({"message": "No suggestion available for this criteria."}), 404

if __name__ == "__main__":
    app.run(debug=True)
