import os
import random
import numpy as np
import tensorflow as tf
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from pymongo import MongoClient
from werkzeug.utils import secure_filename
from PIL import Image
from dotenv import load_dotenv

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
db = client["calorie_finder"]
users = db["users"]
food_collection = db["food_items"]

# ✅ Load AI Model (MobileNetV2)
model = tf.keras.applications.MobileNetV2(weights="imagenet")

# ✅ Image Processing Function
def process_image(image_path):
    img = Image.open(image_path).resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# ✅ AI-Powered Food Detection API
@app.route("/api/upload", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = secure_filename(file.filename)
    file_path = os.path.join("uploads", filename)
    file.save(file_path)

    # Process image & Predict
    img_array = process_image(file_path)
    preds = model.predict(img_array)
    decoded_preds = tf.keras.applications.mobilenet_v2.decode_predictions(preds, top=1)[0]
    food_name = decoded_preds[0][1].replace("_", " ")

    # Fetch calories from MongoDB
    food_data = food_collection.find_one({"name": food_name.lower()})
    if food_data:
        calories = food_data["calories"]
    else:
        calories = random.randint(100, 500)  # Default random calories if not found

    return jsonify({"food": food_name, "calories": calories})

# ✅ Other Flask Routes (Home, Register, Login, etc.)
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

# ✅ Run Flask App
if __name__ == "__main__":
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(debug=True)
