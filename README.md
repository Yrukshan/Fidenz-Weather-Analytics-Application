# Weather Analytics Application 

A modern, responsive dashboard displaying weather and comfort scores for multiple cities. Built with **React**, **Node.js/Express**, **Tailwind CSS**, and **Auth0** for authentication.

---

## Table of Contents

1. [Setup Instructions](#setup-instructions)  
2. [Comfort Index Formula](#comfort-index-formula)  
3. [Reasoning Behind Variable Weights](#reasoning-behind-variable-weights)  
4. [Trade-offs Considered](#trade-offs-considered)  
5. [Cache Design Explanation](#cache-design-explanation)  
6. [Known Limitations](#known-limitations)    
7. [Author & Contact](#author--contact)  

---

## Setup Instructions

### Backend

1. Navigate to backend folder:  
   ```bash
   cd backend

2. Install dependencies:
   - npm install

3. Create a .env file in the backend folder:
   - OPENWEATHER_KEY=your_openweathermap_api_key
   - PORT=5000

4. Start the server:
   - npm start

5. API endpoint available at: http://localhost:5000/api/weather

### Frontend 

1. Navigate to frontend folder:
   - cd frontend

2. Install dependencies:
   - npm install

3. Start the frontend:
   - npm start

4. Open http: //localhost:3000 in your browser.

## Comfort Index Formula

Comfort Score = 100 
               - |Temperature - 22| * 2
               - |Humidity - 50| * 0.5
               - |Wind Speed - 3| * 5
               - Cloudiness * 0.1

- Temperature (°C) – Optimal at 22°C

- Humidity (%) – Optimal at 50%

- Wind Speed (m/s) – Optimal at 3 m/s

- Cloudiness (%) – Minimal effect

- The score is clamped between 0 and 100.

## Reasoning Behind Variable Weights

| Variable    | Weight | Reasoning                              |
| ----------- | ------ | -------------------------------------- |
| Temperature | 2      | Most critical factor for human comfort |
| Humidity    | 0.5    | Moderate influence on comfort          |
| Wind Speed  | 5      | Strong influence; light breeze ideal   |
| Cloudiness  | 0.1    | Minor effect on comfort                |

## Trade-offs Considered

- Accuracy vs Performance: Real-time API provides accuracy but slower response; cache reduces API calls.
- Complexity vs UX: Formula is simple for maintainability, though more factors could increase accuracy.
- Frontend Libraries: Tailwind + Recharts provide fast development and responsive, visually appealing UI.

## Cache Design Explanation

- Used Node-Cache in backend with TTL 300 seconds (5 minutes)
- Reduces API requests to OpenWeather
- Cache key "weather"; API returns HIT if cached, MISS if fresh fetch
- Ensures smooth performance and fast responses

## Known Limitations

- Free-tier OpenWeather API limits requests → may hit API limits
- Comfort Index simplified; ignores UV, air quality, microclimates
- Only predefined cities included; dynamic city search not implemented

## Author & Contact

- Name : Rukshan Ekanayake...
