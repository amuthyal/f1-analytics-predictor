import fastf1
import pandas as pd
import joblib
import os

# Enable cache
fastf1.Cache.enable_cache('./f1_cache')

# Load driver and constructor mapping
drivers = pd.read_json('../client/src/data/drivers_2024.json')
constructors = pd.read_json('../client/src/data/constructors_2024.json')

# Load trained model
model = joblib.load('../server/ml_models/top3_predictor.pkl')

# Load qualifying session (adjust round as needed)
season = 2024
round_num = 3
session = fastf1.get_session(season, round_num, 'Q')
session.load()

# Get starting grid order from session.results
quali = session.results

# Predict for each driver
predictions = []
for _, row in quali.iterrows():
    abbrev = row.Abbreviation.lower()

    # Find matching driverId/constructorId
    driver = drivers[drivers['code'].str.lower() == abbrev]
    if driver.empty:
        continue
    driverId = int(driver['driverId'].values[0])
    constructorId = int(driver['constructorId'].values[0])

    # Grid = Qualifying position
    grid = int(row.Position)

    input_df = pd.DataFrame([{
        'driverId': driverId,
        'constructorId': constructorId,
        'grid': grid,
        'round': round_num,
        'year': season
    }])

    pred = model.predict(input_df)[0]
    predictions.append({
        'driver': abbrev.upper(),
        'predicted_top3': bool(pred),
        'grid': grid
    })

# Sort and show only Top 3 predictions
top3_preds = [p for p in predictions if p['predicted_top3']]
top3_sorted = sorted(top3_preds, key=lambda x: x['grid'])  # Optional: sort by grid

for p in top3_sorted:
    print(f"🚥 Grid {p['grid']}: {p['driver']} — Predicted TOP 3 ✅")
