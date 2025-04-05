from flask import Flask, request, jsonify
from flask_cors import CORS
import fastf1
import pandas as pd
import joblib
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Enable FastF1 cache
fastf1.Cache.enable_cache('./f1_cache')

# Base path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load models
model_path = os.path.join(BASE_DIR, '../ml_models/race_result_model.pkl')
top3_model_path = os.path.join(BASE_DIR, '../ml_models/top3_rank_predictor.pkl')

try:
    model = joblib.load(model_path)
    print("✅ Race result model loaded successfully.")
except Exception as e:
    print("❌ Failed to load race result model:", e)
    model = None

try:
    top3_model = joblib.load(top3_model_path)
    print("✅ Top 3 ranking model loaded successfully.")
except Exception as e:
    print("❌ Failed to load Top 3 ranking model:", e)
    top3_model = None

# Load driver/constructor metadata
drivers_path = os.path.join(BASE_DIR, '../../client/src/data/drivers_2024.json')
constructors_path = os.path.join(BASE_DIR, '../../client/src/data/constructors_2024.json')

drivers_df = pd.read_json(drivers_path)
constructors_df = pd.read_json(constructors_path)

@app.route('/')
def home():
    return "🏁 F1 ML API is running!"

@app.route('/api/ml/predict-top3/rank-model', methods=['GET'])
def predict_top3_rank_model():
    if top3_model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        year = int(request.args.get('year'))
        round_number = int(request.args.get('round'))

        session = fastf1.get_session(year, round_number, 'Q')
        session.load()
        quali = session.results

        input_rows = []

        for _, row in quali.iterrows():
            abbrev = row.Abbreviation.lower()
            driver_row = drivers_df[drivers_df['code'].str.lower() == abbrev]
            if driver_row.empty:
                continue

            driver_id = int(driver_row['driverId'].values[0])
            constructor_id = int(driver_row['constructorId'].values[0])
            grid = int(row.Position)
            q3_raw = row.Q3

            # Only include drivers with valid Q3 time
            if pd.isna(q3_raw) or q3_raw == "\\N":
                continue

            try:
                q3_seconds = q3_raw.total_seconds()
            except:
                continue

            input_rows.append({
                "driverId": driver_id,
                "code": abbrev.upper(),
                "constructorId": constructor_id,
                "grid": grid,
                "q1_seconds": q3_seconds,   # Q3 time, model expects this column
                "team": row.TeamName        # live team name from FastF1
            })

        if not input_rows:
            return jsonify({'error': 'No valid Q3 data for any drivers'}), 400

        input_df = pd.DataFrame(input_rows)
        features = input_df[["grid", "constructorId", "q1_seconds"]]
        input_df["score"] = top3_model.predict(features)

        top3 = input_df.sort_values("score").head(3)

        result = []
        for i, (_, row) in enumerate(top3.iterrows(), start=1):
            result.append({
                "position": i,
                "driver": row["code"],
                "team": row["team"],
                "grid": row["grid"]
            })

        return jsonify(result)

    except Exception as e:
        print("❌ Error in /predict-top3/rank-model:", e)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=3001)
