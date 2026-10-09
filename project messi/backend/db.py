'''from pymongo import MongoClient

# Requires the PyMongo package.
# https://api.mongodb.com/python/current

client = MongoClient('')
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

