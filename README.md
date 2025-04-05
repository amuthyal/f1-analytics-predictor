# 🏎️ F1 Analytics Predictor

An interactive web app to predict Formula 1 podium finishes and visualize driver & team performance using real-time and historical data.

## 🚀 Features

- 🔮 Predict top 3 race finishers based on qualifying performance (ML ranking model)
- 📈 Visualize driver & constructor points progression
- 🏁 View race results, standings, and position changes
- 🎨 Responsive React UI with charts, dropdowns, and dashboards
- ⚙️ FastF1-powered backend using Flask
- 🧠 Machine learning model trained on 2000–2024 race data

---

## 🧱 Tech Stack

| Frontend        | Backend       | ML / Data         |
|-----------------|---------------|-------------------|
| React + Axios   | Python + Flask | LightGBM (Ranker) |
| Recharts        | FastF1 API     | pandas + joblib   |

---

## 📸 Screenshots

| Podium Predictor | Driver Points Chart |
|------------------|---------------------|
| ![Podium](docs/podium.png) | ![Drivers](docs/driver-chart.png) |

---
### 🧠 Machine Learning Model

## 🔍 Problem Statement

We aim to predict the top 3 finishers (podium positions) in a Formula 1 race before the race happens, using qualifying data — particularly from Q3. The challenge is framed as a ranking problem, where we assign a “score” to each driver and select the lowest three as the predicted podium.

## ⚙️ Model Overview
Model Used	Type	Library
LightGBM Ranker	Learning-to-rank	LightGBM
We chose LightGBM's ranking model (lambdarank) because:

It supports ranking tasks out of the box

Efficient with large datasets

Easy to train and deploy

Performs well even with relatively few features

## 📊 Features Used   Feature Description

grid	              Starting grid position of the driver

constructorId	      Numeric ID representing the constructor

q1_seconds	          Q3 lap time in seconds (model expects this column name even though it's Q3)

📌 Note: We only include drivers with valid Q3 times for more reliable predictions.

## 🧪 Model Training Details

# Dataset
Based on Kaggle’s F1 dataset (1950–2024)

Filtered to only include races from 2000 to 2024

Joined: results.csv, qualifying.csv, drivers.csv, constructors.csv, races.csv

# Preprocessing
Removed rows with missing values in required columns

Converted lap times from timedelta to seconds

Only kept drivers who made it to Q3 (most relevant for podium)

# Train-Test Split
Split by raceId (not random!) to simulate real-time race prediction

80% of races for training, 20% for testing

# Evaluation Metrics

Metric	                     Description	Value (Sample)
MAE	                         Mean Absolute Error of predicted finish positions	~11.5
RMSE	                     Root Mean Squared Error	~12.9
Kendall's Tau	             Rank correlation between predicted & actual	~0.33
Top-3 Accuracy	             % of correctly predicted podium finishers	~43%

# 💾 Saved Model
Filename: top3_rank_predictor.pkl

Location: /ml_models/

Loaded at Flask startup

Served via:
GET /api/ml/predict-top3/rank-model?year=YYYY&round=N

### 🔄 Future Improvements (Planned)

# Include more features:

Driver & team points up to the race

Average Q3 performance

Track type / weather conditions

Use ensemble models or neural networks for experimentation

Real-time live updates with post-quali data

## 🔧 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/f1-analytics-predictor.git
cd f1-analytics-predictor

### 2. Install Dependencies

Frontend:

cd client
npm install
npm start

Backend:

cd server/fastf1
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

📡 API Endpoints
GET /api/ml/predict-top3/rank-model
Predict podium using qualifying data from FastF1 (Q3 only).

Query Params:

year: Season year (e.g. 2025)

round: Round number (e.g. 3)

Returns:


[
  { "position": 1, "driver": "VER", "team": "Red Bull", "grid": 1 }
]

📂 Folder Structure
bash
Copy
Edit
client/          # React frontend
server/fastf1/   # Flask backend + ML model
ml/              # Training scripts + data
public/          # Static assets

🧹 Cleanup Notes
✅ Removed unused FastF1 controller (Node)

✅ Removed placeholder Firebase/socket files

✅ Uses live team names from FastF1 (no outdated JSONs)

✅ Loads Q3 only for better podium prediction

📘 Credits
FastF1 – F1 data API

Ergast API – Historical F1 results

LightGBM – Ranking-based ML model

📜 License
MIT — Feel free to fork, extend, and build on it!

🙌  Contributions Welcome
Have a feature in mind or want to refine the ML model? PRs are always welcome!

Let me know if you'd like:
- a lighter minimal version
- deploy instructions (e.g. for Vercel + Flask backend)
- GitHub action to auto-train ML model on new data

You’re basically race-ready 🏁🔥

