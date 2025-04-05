// client/src/pages/Predictor.js
import React, { useState } from 'react';
import PredictorForm from '../components/PredictorForm';
import '../styles/Predictor.css';

const Predictor = () => {
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="predictor-container">
      <h1>🏆 F1 Podium Predictor</h1>
      <PredictorForm onResult={setPrediction} setLoading={setLoading} />

      {loading && (
        <div className="prediction-result">
          <p>🔄 Predicting podium... Please wait.</p>
        </div>
      )}

      {!loading && prediction?.length > 0 && !prediction.error && (
        <div className="prediction-result">
          <h3>🥇 Predicted Top 3 Finishers:</h3>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Grid Start</th>
              </tr>
            </thead>
            <tbody>
              {prediction.map((entry) => (
                <tr key={entry.driver}>
                  <td>{entry.position}</td>
                  <td>{entry.driver}</td>
                  <td>{entry.team}</td>
                  <td>{entry.grid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && prediction?.error && (
        <div className="prediction-result error">
          <p>{prediction.error}</p>
        </div>
      )}
    </div>
  );
};

export default Predictor;
