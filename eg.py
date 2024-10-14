import streamlit as st
from streamlit_lottie import st_lottie
import requests
from core import NutritionAssistantAPI
import plotly.graph_objects as go
from streamlit_option_menu import option_menu

# Initialize the API
api = NutritionAssistantAPI()

# Set page config
st.set_page_config(page_title="NutriAI Assistant", page_icon="🥗", layout="wide")

# Custom CSS for animations and styling
st.markdown(
    """
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

* {font-family: 'Poppins', sans-serif;}

.stApp {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.st-bw {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stButton>button {
    background-color: #4CAF50;
    color: white;
    border-radius: 20px;
    border: none;
    padding: 10px 20px;
    transition: all 0.3s ease;
}

.stButton>button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Change text color to black for all screens except sidebar */
.main .stMarkdown, .main .stText, .main h1, .main h2, .main h3 {
    color: black !important;
}

/* Keep sidebar text color as is */
.sidebar .stMarkdown, .sidebar .stText, .sidebar h1, .sidebar h2, .sidebar h3 {
    color: inherit;
}

</style>
""",
    unsafe_allow_html=True,
)


# Function to load Lottie animations
def load_lottieurl(url):
    try:
        r = requests.get(url)
        if r.status_code != 200:
            return None
        return r.json()
    except:
        return None


# Load Lottie animations
lottie_nutrition = load_lottieurl(
    "https://assets5.lottiefiles.com/packages/lf20_tljjahng.json"
)
lottie_workout = load_lottieurl(
    "https://assets5.lottiefiles.com/private_files/lf30_rxa1dl9w.json"
)
lottie_meal_planning = load_lottieurl(
    "https://assets9.lottiefiles.com/packages/lf20_vPnn3K.json"
)
lottie_progress = load_lottieurl(
    "https://assets2.lottiefiles.com/packages/lf20_htEgHu.json"
)
lottie_recipe = load_lottieurl(
    "https://assets6.lottiefiles.com/packages/lf20_qwgbpqxc.json"
)
lottie_water = load_lottieurl(
    "https://assets7.lottiefiles.com/packages/lf20_zBnPll.json"
)

# Sidebar navigation
with st.sidebar:
    st.header("NutriAI Assistant")
    st.markdown("🥗 Your nutrition guide")
    selected = option_menu(
        "Menu",
        [
            "Home",
            "User Profile",
            "Nutrition Plan",
            "Meal Tracker",
            "Progress",
            "Recipe Suggester",
            "Hydration Tracker",
        ],
        icons=[
            "house",
            "person",
            "card-checklist",
            "journal-album",
            "graph-up",
            "egg-fried",
            "droplet",
        ],
        menu_icon="list",
        default_index=0,
    )

# Home page
if selected == "Home":
    st.title("Welcome to NutriAI Assistant")
    st.write("Your personal guide to a healthier lifestyle!")
    col1, col2 = st.columns(2)
    with col1:
        if lottie_nutrition:
            st_lottie(lottie_nutrition, height=300, key="nutrition")
        else:
            st.image(
                "https://via.placeholder.com/300x200.png?text=Nutrition+Illustration",
                use_column_width=True,
            )
    with col2:
        st.write(
            """
        NutriAI Assistant is here to help you achieve your health and fitness goals.
        Whether you're looking to lose weight, gain muscle, or just eat healthier,
        we've got you covered with personalized nutrition plans, meal tracking,
        progress monitoring, and delicious recipe suggestions.
        """
        )
        st.info("👈 Use the sidebar to navigate through different features!", icon="ℹ️")

    st.subheader("Quick Stats")
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Calories Today", "1,500", "500 remaining")
    with col2:
        st.metric("Water Intake", "1.5L", "0.5L to go")
    with col3:
        st.metric("Weekly Weight Change", "-0.5 kg", "2% decrease")

# User Profile page
elif selected == "User Profile":
    st.title("Your Profile")
    col1, col2 = st.columns([2, 1])
    with col1:
        with st.form("user_profile_form"):
            name = st.text_input("Name", value=api.user_data.get("name", ""))
            age = st.number_input(
                "Age", min_value=0, max_value=120, value=api.user_data.get("age", 30)
            )
            weight = st.number_input(
                "Weight (kg)", min_value=0.0, value=api.user_data.get("weight", 70.0)
            )
            height = st.number_input(
                "Height (cm)", min_value=0.0, value=api.user_data.get("height", 170.0)
            )
            activity_level = st.selectbox(
                "Activity Level",
                [
                    "Sedentary",
                    "Lightly Active",
                    "Moderately Active",
                    "Very Active",
                    "Extremely Active",
                ],
                index=[
                    "Sedentary",
                    "Lightly Active",
                    "Moderately Active",
                    "Very Active",
                    "Extremely Active",
                ].index(api.user_data.get("activity_level", "Moderately Active")),
            )

            col1, col2, col3 = st.columns(3)
            with col1:
                primary_goal = st.selectbox(
                    "Primary Goal",
                    [
                        "Weight Loss",
                        "Muscle Gain",
                        "Maintain Weight",
                        "Improve Overall Health",
                    ],
                )
            with col2:
                target_weight = st.number_input(
                    "Target Weight (kg)",
                    min_value=0.0,
                    value=api.user_data.get("target_weight", weight),
                )
            with col3:
                timeline_weeks = st.number_input(
                    "Timeline (weeks)",
                    min_value=1,
                    max_value=52,
                    value=api.user_data.get("timeline_weeks", 12),
                )

            submitted = st.form_submit_button("Save Profile")
            if submitted:
                api.update_user_profile(name, age, weight, height, activity_level)
                api.set_fitness_goals(primary_goal, target_weight, timeline_weeks)
                st.success("Profile updated successfully!")
    with col2:
        if lottie_workout:
            st_lottie(lottie_workout, height=300, key="workout")
        else:
            st.image(
                "https://via.placeholder.com/300x200.png?text=Workout+Illustration",
                use_column_width=True,
            )

# Nutrition Plan page
elif selected == "Nutrition Plan":
    st.title("Your Personalized Nutrition Plan")
    col1, col2 = st.columns([2, 1])
    with col1:
        if st.button("Generate Nutrition Plan"):
            with st.spinner("Generating your personalized nutrition plan..."):
                nutrition_plan = api.generate_nutrition_plan()
            st.markdown(nutrition_plan)
    with col2:
        st_lottie(lottie_meal_planning, height=300, key="meal_planning")

# Meal Tracker page
elif selected == "Meal Tracker":
    st.title("Meal Tracker")
    col1, col2 = st.columns([2, 1])
    with col1:
        with st.form("meal_tracker_form"):
            meal_name = st.text_input("Meal Name")
            col1, col2, col3, col4 = st.columns(4)
            with col1:
                calories = st.number_input("Calories", min_value=0)
            with col2:
                protein = st.number_input("Protein (g)", min_value=0)
            with col3:
                carbs = st.number_input("Carbs (g)", min_value=0)
            with col4:
                fat = st.number_input("Fat (g)", min_value=0)

            submitted = st.form_submit_button("Log Meal")
            if submitted:
                api.log_meal(meal_name, calories, protein, carbs, fat)
                st.success("Meal logged successfully!")

        st.subheader("Recent Meals")
        if api.user_data.get("meals"):
            for meal in api.user_data["meals"][-5:]:
                st.write(f"{meal['meal_name']} - {meal['calories']} calories")
    with col2:
        st_lottie(lottie_nutrition, height=300, key="nutrition_tracker")

# Progress page
elif selected == "Progress":
    st.title("Your Progress")
    col1, col2 = st.columns([2, 1])
    with col1:
        progress_report = api.get_progress_report()
        st.write(progress_report)

        # Weight tracking chart
        if api.user_data.get("weight_history"):
            weights = [entry["weight"] for entry in api.user_data["weight_history"]]
            dates = [entry["date"] for entry in api.user_data["weight_history"]]
            fig = go.Figure(data=go.Scatter(x=dates, y=weights, mode="lines+markers"))
            fig.update_layout(
                title="Weight Progress", xaxis_title="Date", yaxis_title="Weight (kg)"
            )
            st.plotly_chart(fig)

        new_weight = st.number_input(
            "Update Current Weight (kg)",
            min_value=0.0,
            value=api.user_data.get("weight", 70.0),
        )
        if st.button("Update Weight"):
            api.update_weight(new_weight)
            st.success("Weight updated successfully!")
    with col2:
        st_lottie(lottie_progress, height=300, key="progress")

# Recipe Suggester page
elif selected == "Recipe Suggester":
    st.title("Recipe Suggester")
    col1, col2 = st.columns([2, 1])
    with col1:
        preferences = st.text_area(
            "Enter your preferences (e.g., vegetarian, high-protein, low-carb)"
        )
        if st.button("Suggest Recipe"):
            with st.spinner("Generating a delicious recipe for you..."):
                recipe = api.suggest_recipe(preferences)
            st.markdown(recipe)
    with col2:
        if lottie_recipe:
            st_lottie(lottie_recipe, height=300, key="workout")
        else:
            st.image(
                "https://via.placeholder.com/300x200.png?text=Workout+Illustration",
                use_column_width=True,
            )

# Hydration Tracker page
elif selected == "Hydration Tracker":
    st.title("Hydration Tracker")
    col1, col2 = st.columns([2, 1])
    with col1:
        target_water = st.number_input(
            "Daily Water Target (L)", min_value=0.0, value=2.0, step=0.1
        )
        current_water = st.number_input(
            "Water consumed today (L)", min_value=0.0, value=0.0, step=0.1
        )

        progress = min(current_water / target_water * 100, 100)
        st.progress(progress)
        st.write(
            f"You've consumed {current_water:.1f}L out of your {target_water:.1f}L daily target."
        )

        if st.button("Log Water Intake"):
            # Here you would update the water intake in your API
            st.success(f"Water intake logged: {current_water:.1f}L")
    with col2:
        if lottie_water:
            st_lottie(lottie_water, height=300, key="workout")
        else:
            st.image(
                "https://via.placeholder.com/300x200.png?text=Workout+Illustration",
                use_column_width=True,
            )

# Add a motivational quote to the bottom of every page
st.markdown("---")
st.markdown('*"The only bad workout is the one that didn\'t happen."* - Unknown')

# Floating action button for quick actions
with st.sidebar:
    st.markdown(
        """
    <style>
    .floating-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
    }
    </style>
    """,
        unsafe_allow_html=True,
    )

    with st.expander("Quick Actions"):
        if st.button("Log Water"):
            st.session_state.water_logged = True
        if st.button("Log Meal"):
            st.session_state.meal_logged = True
        if st.button("Update Weight", key=1):
            st.session_state.update_weight = True

# Handle quick actions
if st.session_state.get("water_logged"):
    st.sidebar.success("Water logged successfully!")
    st.session_state.water_logged = False

if st.session_state.get("meal_logged"):
    st.sidebar.success("Meal logged successfully!")
    st.session_state.meal_logged = False

if st.session_state.get("update_weight"):
    new_weight = st.sidebar.number_input(
        "Enter new weight (kg)", min_value=0.0, value=api.user_data.get("weight", 70.0)
    )
    if st.sidebar.button("Confirm Weight Update"):
        api.update_weight(new_weight)
        st.sidebar.success("Weight updated successfully!")
        st.session_state.update_weight = False

# Add a chatbot-like interface for quick questions
st.sidebar.markdown("---")
st.sidebar.subheader("Ask NutriAI")
user_question = st.sidebar.text_input("Got a quick nutrition question?")
if user_question:
    with st.sidebar:
        with st.spinner("Thinking..."):
            # Here you would integrate with your AI model to generate a response
            # For now, we'll use a placeholder response
            ai_response = "I'm sorry, but I don't have enough information to answer that question accurately. It's always best to consult with a registered dietitian or nutritionist for personalized advice."
        st.info(ai_response)

# Add gamification elements
if "points" not in st.session_state:
    st.session_state.points = 0


def award_points(amount):
    st.session_state.points += amount
    st.balloons()
    st.success(f"You earned {amount} points! Total: {st.session_state.points}")


# Example of awarding points (you would call this function when users complete actions)
if st.sidebar.button("Complete Daily Challenge"):
    award_points(50)

# Display user level based on points
user_level = st.session_state.points // 100 + 1
st.sidebar.markdown(f"### Your Level: {user_level}")
st.sidebar.progress(st.session_state.points % 100 / 100)

# Add a tips carousel
tips = [
    "Drink water before meals to help control portion sizes.",
    "Include a variety of colorful vegetables in your diet for optimal nutrition.",
    "Get enough sleep to support your weight loss and fitness goals.",
    "Try meal prepping to make healthy eating more convenient throughout the week.",
    "Remember to include protein with each meal to help maintain muscle mass.",
]

st.markdown("---")
st.subheader("Daily Nutrition Tip")
tip_index = st.session_state.get("tip_index", 0)
st.info(tips[tip_index])
col1, col2 = st.columns(2)
if col1.button("Previous Tip"):
    tip_index = (tip_index - 1) % len(tips)
    st.session_state.tip_index = tip_index
if col2.button("Next Tip"):
    tip_index = (tip_index + 1) % len(tips)
    st.session_state.tip_index = tip_index

# Add a community feature
st.markdown("---")
st.subheader("Community Corner")
community_post = st.text_area("Share your health journey or ask for support:")
if st.button("Post to Community"):
    # Here you would integrate with a backend to store and display community posts
    st.success("Your post has been shared with the community!")
    award_points(10)

# Add a weekly challenge
st.markdown("---")
st.subheader("Weekly Challenge")
challenges = [
    "Try a new healthy recipe",
    "Exercise for 30 minutes every day",
    "Meditate for 10 minutes daily",
    "Get 8 hours of sleep each night",
    "Try a new fruit or vegetable",
]
import random

weekly_challenge = random.choice(challenges)
st.info(f"This week's challenge: {weekly_challenge}")
if st.button("I completed the challenge!"):
    award_points(100)
    st.success("Congratulations on completing the weekly challenge!")

# Add a progress visualization
st.markdown("---")
st.subheader("Your Fitness Journey")
weeks = list(range(1, 53))
progress = [random.randint(0, 100) for _ in weeks]  # Replace with actual progress data
fig = go.Figure(data=go.Scatter(x=weeks, y=progress, mode="lines+markers"))
fig.update_layout(
    title="Weekly Progress", xaxis_title="Week", yaxis_title="Progress Score"
)
st.plotly_chart(fig)

# Add a personalized recommendation section
st.markdown("---")
st.subheader("Personalized Recommendations")
col1, col2, col3 = st.columns(3)
with col1:
    st.markdown("### Workout of the Day")
    st.write("30-minute HIIT session")
    if st.button("View Workout"):
        st.session_state.view_workout = True
with col2:
    st.markdown("### Recipe of the Day")
    st.write("Quinoa Stuffed Bell Peppers")
    if st.button("View Recipe"):
        st.session_state.view_recipe = True
with col3:
    st.markdown("### Mindfulness Exercise")
    st.write("5-minute breathing meditation")
    if st.button("Start Meditation"):
        st.session_state.start_meditation = True

# Handle personalized recommendation actions
if st.session_state.get("view_workout"):
    st.sidebar.markdown("### Workout of the Day")
    st.sidebar.write("1. Warm-up (5 minutes)")
    st.sidebar.write("2. High knees (30 seconds)")
    st.sidebar.write("3. Burpees (30 seconds)")
    st.sidebar.write("4. Mountain climbers (30 seconds)")
    st.sidebar.write("5. Rest (30 seconds)")
    st.sidebar.write("Repeat 2-5 for 6 rounds")
    st.sidebar.write("6. Cool-down (5 minutes)")
    st.session_state.view_workout = False

if st.session_state.get("view_recipe"):
    st.sidebar.markdown("### Quinoa Stuffed Bell Peppers")
    st.sidebar.write(
        "Ingredients: Bell peppers, quinoa, black beans, corn, tomatoes, cheese"
    )
    st.sidebar.write("1. Cook quinoa according to package instructions")
    st.sidebar.write("2. Mix quinoa with beans, corn, and diced tomatoes")
    st.sidebar.write("3. Stuff mixture into halved bell peppers")
    st.sidebar.write("4. Top with cheese and bake at 350°F for 25-30 minutes")
    st.session_state.view_recipe = False

if st.session_state.get("start_meditation"):
    st.sidebar.markdown("### 5-Minute Breathing Meditation")
    st.sidebar.write("Find a comfortable position and close your eyes")
    st.sidebar.write(
        "Focus on your breath, inhaling for 4 counts and exhaling for 4 counts"
    )
    st.sidebar.write("Continue this pattern for 5 minutes")
    meditation_progress = st.sidebar.progress(0)
    for i in range(100):
        time.sleep(3)  # Simulate 5 minutes passing
        meditation_progress.progress(i + 1)
    st.sidebar.success("Meditation complete! Great job!")
    award_points(20)
    st.session_state.start_meditation = False

# Footer
st.markdown("---")
st.markdown("© 2024 NutriAI Assistant. All rights reserved.")
st.markdown(
    "Disclaimer: This app provides general information and is not a substitute for professional medical advice."
)
