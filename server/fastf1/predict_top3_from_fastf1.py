from flask import Flask, request, jsonify
import fastf1
import pandas as pd
import joblib
import os

app = Flask(__name__)

# Enable cache
fastf1.Cache.enable_cache('./f1_cache')

# Load model
top3_model = joblib.load('../server/ml_models/top3_predictor.pkl')

# Load driver/constructor mapping
drivers_df = pd.read_json('../client/src/data/drivers_2024.json')
constructors_df = pd.read_json('../client/src/data/constructors_2024.json')

@app.route('/api/ml/predict-top3/from-fastf1', methods=['GET'])
def predict_top3_from_fastf1():
    year = int(request.args.get('year'))
    round_number = int(request.args.get('round'))

    try:
        session = fastf1.get_session(year, round_number, 'Q')
        print(f"📦 Predicting for {year} Round {round_number}")
        session.load()
        quali = session.results

        predictions = []

        for _, row in quali.iterrows():
            abbrev = row.Abbreviation.lower()
            print("🔍 Processing driver:", abbrev)
            driver_row = drivers_df[drivers_df['code'].str.lower() == abbrev]
            if driver_row.empty:
                print(f"⚠️ No driver match for {abbrev}")
                continue

            driverId = int(driver_row['driverId'].values[0])
            constructorId = int(driver_row['constructorId'].values[0])
            grid = int(row.Position)

            input_df = pd.DataFrame([[driverId, constructorId, grid, round_number, year]],
                                    columns=['driverId', 'constructorId', 'grid', 'round', 'year'])
            pred = top3_model.predict(input_df)[0]

            predictions.append({
                'driver': abbrev.upper(),
                'grid': grid,
                'predictedTop3': bool(pred)
            })

        top3 = [p for p in predictions if p['predictedTop3']]
        return jsonify(top3)

    except Exception as e:
        return jsonify({'error': str(e)}), 500