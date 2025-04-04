from flask import Flask, jsonify
from flask_cors import CORS
import fastf1
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Enable FastF1 cache
cache_dir = './f1_cache'
os.makedirs(cache_dir, exist_ok=True)
fastf1.Cache.enable_cache(cache_dir)

@app.route('/api/fastf1/telemetry/<int:season>/<int:round>/<string:driver_code>', methods=['GET'])
def get_telemetry(season, round, driver_code):
    print(f"Received request for {season} round {round} driver {driver_code}")

    try:
        session = fastf1.get_session(season, round, 'R')
        session.load()

        driver_laps = session.laps.pick_driver(driver_code.upper())
        fastest_lap = driver_laps.pick_fastest()

        if fastest_lap is None:
            return jsonify({'error': 'No telemetry found for driver'}), 404

        telemetry = fastest_lap.get_car_data().add_distance()

        telemetry_data = {
            "Distance": telemetry['Distance'].tolist(),
            "Speed": telemetry['Speed'].tolist(),
            "Throttle": telemetry['Throttle'].tolist(),
            "Brake": telemetry['Brake'].astype(int).tolist(),
            "RPM": telemetry['RPM'].tolist(),
            "nGear": telemetry['nGear'].tolist()
        }

        return jsonify(telemetry_data)
    except Exception as e:
        print("Telemetry Error:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=3001)
