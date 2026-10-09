'''from pymongo import MongoClient

# Requires the PyMongo package.
# https://api.mongodb.com/python/current

client = MongoClient('mongodb+srv://amishkoli621:Akmonzok767@cluster0.fz2wy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
filter={}

result = client['calorie_finder']['food_items'].find(
  filter=filter
)

# Sample Data Insert
food_items = [
    {"name": "Granola", "calories": 100},
    {"name": "Apple", "calories": 52},
    {"name": "Banana", "calories": 89},
    {"name": "Pizza", "calories": 266},
]

food_collection.insert_many(food_items)
print("Sample data inserted successfully!")'''

