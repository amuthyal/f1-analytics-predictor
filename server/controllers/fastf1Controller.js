import axios from 'axios';

export const getFastf1Laps = async (req, res) => {
  const { year, round } = req.params;

  try {
    const response = await axios.get(`http://localhost:5050/laps/${year}/${round}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch laps from FastF1 microservice' });
  }
};