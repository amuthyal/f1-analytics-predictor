// client/src/services/predictorApi.js
import axios from 'axios';

export const predictRacePosition = async ({ driverId, constructorId, grid, season, raceId }) => {
  try {
    const res = await axios.post('http://localhost:3001/api/ml/predict-position', {
      driverId: parseInt(driverId),
      constructorId: parseInt(constructorId),
      grid: parseInt(grid),
      season: parseInt(season),
      raceId: parseInt(raceId),
    });
    return res.data.predicted_position;
  } catch (error) {
    console.error('Prediction API error:', error);
    return null;
  }
};
