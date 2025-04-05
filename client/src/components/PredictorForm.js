// client/src/components/PredictorForm.js
import React, { useState } from 'react';
import '../styles/PredictorForm.css';
import axios from 'axios';

const PredictorForm = ({ onResult, setLoading }) => {
  const [formData, setFormData] = useState({
    season: 2025,
    round: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/api/ml/predict-top3/rank-model', {
        params: {
          year: formData.season,
          round: formData.round,
        },
      });
      onResult(res.data);
    } catch (err) {
      console.error(err);
      onResult({ error: 'Failed to fetch prediction.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="predictor-form" onSubmit={handleSubmit}>
      <label>Season:</label>
      <input
        type="number"
        name="season"
        value={formData.season}
        onChange={handleChange}
        min="2000"
        required
      />

      <label>Round:</label>
      <input
        type="number"
        name="round"
        value={formData.round}
        onChange={handleChange}
        min="1"
        required
      />

      <button type="submit">Predict Podium</button>
    </form>
  );
};

export default PredictorForm;
