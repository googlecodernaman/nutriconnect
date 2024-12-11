import requests
from datetime import datetime
import json
import os

class NutritionAssistantAPI:
    def __init__(self, user_data_file="user_data.json", api_key="YOUR_GROQ_API_KEY", api_url="https://api.groq.com/v1/models/generate"):
        self.user_data_file = user_data_file
        self.user_data = self.load_user_data()
        self.api_key = api_key
        self.api_url = api_url

    def load_user_data(self):
        if os.path.exists(self.user_data_file):
            with open(self.user_data_file, "r") as f
                return json.load(f)
        return {}

    def save_user_data(self):
        with open(self.user_data_file, "w") as f:
            json.dump(self.user_data, f)

    def update_user_profile(self, name, age, weight, height, activity_level):
        self.user_data.update(
            {
                "name": name,
                "age": age,
                "weight": weight,
                "height": height,
                "activity_level": activity_level,
                "bmi": self.calculate_bmi(weight, height),
            }
        )
        self.save_user_data()
        return "User profile updated successfully."

    def calculate_bmi(self, weight, height):
        return weight / ((height / 100) ** 2)

    def set_fitness_goals(self, primary_goal, target_weight, timeline_weeks):
        self.user_data.update(
            {
                "primary_goal": primary_goal,
                "target_weight": target_weight,
                "timeline_weeks": timeline_weeks,
            }
        )
        self.save_user_data()
        return "Fitness goals set successfully."

    def generate_nutrition_plan(self):
        prompt = f"""
        Generate a personalized nutrition plan based on the following user data:
        Name: {self.user_data.get('name')}
        Age: {self.user_data.get('age')}
        Weight: {self.user_data.get('weight')} kg
        Height: {self.user_data.get('height')} cm
        BMI: {self.user_data.get('bmi'):.2f}
        Activity Level: {self.user_data.get('activity_level')}
        Primary Goal: {self.user_data.get('primary_goal')}
        Target Weight: {self.user_data.get('target_weight')} kg
        Timeline: {self.user_data.get('timeline_weeks')} weeks

        Please provide:
        1. Daily calorie target
        2. Macronutrient split (protein, carbs, fat)
        3. List of recommended foods
        4. Sample meal plan for one day
        """
        return self._call_groq_api(prompt)

    def log_meal(self, meal_name, calories, protein, carbs, fat):
        if "meals" not in self.user_data:
            self.user_data["meals"] = []
        self.user_data["meals"].append(
            {
                "date": datetime.now().isoformat(),
                "meal_name": meal_name,
                "calories": calories,
                "protein": protein,
                "carbs": carbs,
                "fat": fat,
            }
        )
        self.save_user_data()
        return "Meal logged successfully."

    def get_progress_report(self):
        if not self.user_data.get("meals"):
            return "No meals logged yet."

        total_calories = sum(meal["calories"] for meal in self.user_data["meals"])
        avg_calories = total_calories / len(self.user_data["meals"])

        return f"""
        Progress Report:
        Total meals logged: {len(self.user_data['meals'])}
        Total calories consumed: {total_calories}
        Average calories per meal: {avg_calories:.2f}
        Current weight: {self.user_data.get('weight')} kg
        Target weight: {self.user_data.get('target_weight')} kg
        """

    def suggest_recipe(self, preferences):
        prompt = f"""
        Suggest a healthy recipe based on the following preferences:
        {preferences}
        
        The recipe should align with the user's nutritional goals:
        Primary Goal: {self.user_data.get('primary_goal')}
        Daily Calorie Target: (extract from nutrition plan)

        Please provide:
        1. Recipe name
        2. Ingredients list
        3. Cooking instructions
        4. Nutritional information (calories, protein, carbs, fat)
        """
        return self._call_groq_api(prompt)

    def update_weight(self, new_weight):
        self.user_data["weight"] = new_weight
        self.user_data["weight_history"] = self.user_data.get("weight_history", []) + [
            {"date": datetime.now().isoformat(), "weight": new_weight}
        ]
        self.save_user_data()
        return "Weight updated successfully."

    def _call_groq_api(self, prompt):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": "groq-model-name",  # Replace with the actual model name
            "prompt": prompt,
            "max_tokens": 1000,
        }

        try:
            response = requests.post(self.api_url, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()["text"]
        except requests.exceptions.RequestException as e:
            return f"Error during API call: {e}"

# Usage example:
# api = NutritionAssistantAPI()
# api.update_user_profile("John Doe", 30, 80, 180, "Moderately Active")
# api.set_fitness_goals("Weight Loss", 75, 12)
# nutrition_plan = api.generate_nutrition_plan()
# api.log_meal("Grilled Chicken Salad", 350, 30, 10, 20)
# progress = api.get_progress_report()
# recipe = api.suggest_recipe("vegetarian, high-protein")
# api.update_weight(79.5)
