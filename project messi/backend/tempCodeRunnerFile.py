import random
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import requests  # Import requests to make API calls
 # Example API

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, template_folder="templates")  # Ensures Flask uses the 'templates' folder
CORS(app)  # Allow frontend to connect
bcrypt = Bcrypt(app)  # Password hashing
app.config["JWT_SECRET_KEY"] = "supersecretkey"  # Change this for production
jwt = JWTManager(app)

# Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client["amishkoli621"]
users = db["users"]
db = client["calorie_finder"]
food_collection = db["food_items"]
food_calories = db["food_calories"]
new_food = db["new_food"]
new_exercise = db["new_exercise"]


# ✅ Corrected Home Route
@app.route("/")
def home():
    return render_template("index.html")  # Ensure index.html is inside the 'templates/' folder
@app.route("/home",methods=["GET"])
def dashboard():
    return render_template("home.html")
# ✅ Register Page Route (GET)
@app.route("/register", methods=["GET"])
def register_page():
    return render_template("register.html")

# ✅ Login Page Route (GET)
@app.route("/login", methods=["GET"])
def login_page():
    return render_template("login.html")

# ✅ Register API (POST)
@app.route("/api/register", methods=["POST"])
def register_api():
    data = request.json

    # Check if user already exists
    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "Email already exists! Please log in."}), 400

    # Hash Password & Insert into DB
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    users.insert_one({"name": data["name"], "email": data["email"], "password": hashed_password})

    # ✅ Auto-login after registration
    token = create_access_token(identity=data["email"])
    return jsonify({"message": "Registration successful!", "token": token, "redirect": "/home"}), 201
# ✅ Login API (POST)
@app.route("/api/login", methods=["POST"])
def login_api():
    data = request.json
    user = users.find_one({"email": data["email"]})
    
    if user and bcrypt.check_password_hash(user["password"], data["password"]):
        token = create_access_token(identity=user["email"])
        return jsonify({"message": "Login successful", "token": token}), 200
    
    return jsonify({"message": "Invalid credentials"}), 401
#Search
@app.route("/search")
def Search():
    return render_template("home.html")

@app.route("/api/search", methods=["GET"])
def search_food():
    query = request.args.get("query", "").strip()
    
    if not query:
        return jsonify([])  # Agar query empty hai toh empty list return karo
    
    # MongoDB me search karo (case-insensitive search)
    results = new_food.find({"name": {"$regex": query, "$options": "i"}})
    
    
    # MongoDB ke result ko list me convert karo
    data = []
    for item in results:
        data.append({
            "name":item["name"], 
            "calories":item["calories"],
            "calories_":item["calories_"],
            "Carbohydrates":item["Carbohydrates"], 
            "Cholesterol":item["Cholesterol"], 
            "Saturatedfat":item["Saturatedfat"], 
            "TotalFat":item["TotalFat"], 
            "FiberContent":item["FiberContent"], 
            "Potassium":item["Potassium"], 
            "Protein":item["Protein"], 
            "Sodium":item["Sodium"], 
            "Sugar":item["Sugar"],
            "Jog":item["Jog"],
            "Yoga": item["Yoga"],
            "Gym": item["Gym"],
            "Walk": item["Walk"]
        })

    return jsonify(data)
#page1
@app.route('/one.html')
def one():
    return render_template('one.html')


# Run the app
if __name__ == "__main__":
    app.run(debug=True)
