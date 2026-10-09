    if mode == "calorie":
        required_calories = 10 * weight + 6.25 * height - 5 * age + 5
        result["required_calories"] = required_calories
        if calories > required_calories:
            suggestion = new_exercise.find_one({"intensity": "high"})
        else:
            suggestion = new_exercise.find_one({"intensity": "low"})
