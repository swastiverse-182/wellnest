# WellNest 🌿

**WellNest** is a **full-stack wellness web application** designed to provide **personalized, condition-based health guidance**. It helps users make informed lifestyle choices by offering **food recommendations**, **detailed nutritional breakdowns**, **yoga guidance tailored to body parts and fitness goals**, and practical wellness tools like a **BMI calculator**. The platform also leverages **AI-powered suggestions and integrated video searches** to support mental, physical, and nutritional well-being, delivering **actionable, beginner-friendly insights** that promote healthier habits in a simple, intuitive, and holistic manner.

---

## Table of Contents

1. [Features](#features)  
2. [Detailed Project Structure](#detailed-project-structure)  
3. [Tech Stack](#tech-stack)  
4. [Environment Variables](#environment-variables)  
5. [Installation](#installation)  
6. [Deployment](#deployment)  
7. [Project Status](#project-status)  
8. [Author](#author)  
9. [Notes](#notes)  

---

## Features

- **Smart Food Advice:** Personalized recommendations for foods to eat or avoid based on health conditions or health benefits, combining **rule-based logic** with API-driven data.  
- **Nutritional Insights:** Provides a detailed breakdown of calories, macronutrients, and portion sizes to help users understand the impact of their diet.  
- **BMI Calculator:** Calculates body mass index and categorizes users as underweight, normal, overweight, or obese.  
- **Yoga Recommendations:** Suggests poses targeting specific body areas and fitness goals, integrated with YouTube tutorials for guided practice.  
- **AI-Powered Wellness Guide:** Offers actionable insights covering mental, physical, and nutritional wellness.  
- **Wellness Video Search:** Enables users to explore relevant fitness, yoga, and nutrition videos via the YouTube Data API.  

---

## Detailed Project Structure

📁 Detailed Project Structure

WellNest/
│
├── server/                              # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js                        # MongoDB connection & configuration
│   ├── controllers/
│   │   └── healthFoodController.js      # Handles smart food logic & responses
│   ├── middleware/
│   │   ├── adminAuth.js                 # Protects admin-only routes
│   │   └── auth.js                      # JWT authentication & user verification
│   ├── models/
│   │   ├── HealthFood.js                # Stores food rules & nutrition logic
│   │   ├── User.js                     # User profile, auth & preferences schema
│   │   └── CalendarEvent.js             # Stores wellness & workout events
│   ├── routes/
│   │   ├── ai.js                        # AI-powered wellness suggestions
│   │   ├── auth.js                      # Login & registration endpoints
│   │   ├── foodAdvice.js                # Food recommendation APIs
│   │   ├── calendar.js                  # Calendar CRUD operations
│   │   ├── userGoals.js                 # Health & workout goals management
│   │   ├── adminHealthFood.js            # Admin food data management
│   │   └── adminUsers.js                 # Admin user analytics & controls
│   ├── index.js                         # Express server entry point
│   ├── package.json                    # Backend dependencies & scripts
│   └── .env                             # Backend environment variables
│
├── src/                                 # Frontend (React + Vite)
│   ├── api/
│   │   ├── ai.js                        # Calls AI wellness backend
│   │   ├── auth.js                      # Login & register API helpers
│   │   ├── food.js                      # Smart food advice API calls
│   │   ├── calendar.js                  # Calendar API integration
│   │   └── goals.js                     # Health & workout goals API
│   ├── auth/
│   │   ├── Login.jsx                    # User login page
│   │   └── Register.jsx                 # User registration page
│   ├── components/
│   │   ├── Navbar.jsx                   # Main navigation bar
│   │   ├── FeatureCard.jsx              # Reusable feature UI cards
│   │   ├── ToolTabs.jsx                 # Tabs for wellness tools
│   │   ├── CalendarEvent.jsx            # Individual calendar event UI
│   │   └── Footer.jsx                   # Website footer
│   ├── context/
│   │   └── AuthContext.jsx              # Global authentication state
│   ├── pages/
│   │   ├── Home.jsx                     # Landing page
│   │   ├── Dashboard.jsx                # User overview & progress
│   │   ├── Tools.jsx                    # Wellness tools hub
│   │   ├── Goals.jsx                    # Health & workout goals page
│   │   ├── Calendar.jsx                 # Wellness calendar page
│   │   └── Wellness.jsx                 # Wellness content overview
│   ├── routes/
│   │   └── PrivateRoute.jsx              # Protects authenticated routes
│   ├── tools/
│   │   ├── BMICalculator.jsx             # BMI calculation tool
│   │   ├── SmartFoodAdvisor.jsx          # Condition-based food advisor
│   │   ├── NutrientInfo.jsx              # USDA nutrition breakdown
│   │   ├── YogaSearch.jsx                # Yoga poses by body part/goal
│   │   ├── YoutubeSearch.jsx             # Wellness video search
│   │   └── TodayInfo.jsx                 # Daily wellness insights
│   ├── wellness/
│   │   ├── MentalWellness.jsx            # Mental health guidance
│   │   ├── PhysicalWellness.jsx          # Physical fitness content
│   │   └── NutritionWellness.jsx         # Nutrition education content
│   ├── assets/                           # Images, icons & illustrations
│   ├── App.jsx                           # Root React component
│   ├── main.jsx                          # React app bootstrap (Vite)
│   ├── index.css                         # Global styling & Tailwind base
│   └── .env                              # Frontend environment variables (VITE_*)
│
├── public/                               # Static public assets
├── index.html                            # Main HTML template
├── package.json                          # Frontend dependencies
├── .gitignore                            # Ignored files & folders
└── README.md                             # Project documentation


---

## Tech Stack

| Frontend                     | Backend / APIs                 |
|-------------------------------|-------------------------------|
| React + Vite                  | Node.js + Express v5          |
| Tailwind CSS                  | MongoDB + Mongoose            |
| Context API                   | JWT-based Authentication      |
| 2.5 Flash Lite (AI model)     | AI APIs              |

---

## Environment Variables

**Backend (`server/.env`):**
```
MONGO_URI=mongodb_connection_string
JWT_SECRET=jwt_secret
ADMIN_KEY=admin_api_key
```

**Frontend (`.env`):**
```
VITE_API_URL=/api
VITE_USDA_API_KEY=usda_key
VITE_YOUTUBE_API_KEY=youtube_key
```


---

## Installation

```bash
# Clone repository
git clone https://github.com/swastiverse-182/wellnest.git
cd wellnest

# Backend
cd server
npm install
npm start

# Frontend
cd ..
npm install
npm run dev
```

---

## Deployment

- **Backend:** Render  
- **Frontend:** Vercel / Netlify  
- **Database:** MongoDB Atlas  

---

## Project Status

🚧 Actively under development and continuously improving.

---


## Notes

WellNest is built for **learning, experimentation, and practical wellness applications**, focusing on **actionable, user-friendly guidance** rather than generic fitness tracking.



