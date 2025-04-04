import axios from 'axios';

export const getFastF1Telemetry = async (year, round, driver) => {
  const res = await axios.get(`http://localhost:3001/api/fastf1/telemetry/${year}/${round}/${driver}`);
  return res.data;
};

export const getFastF1Laps = async (year, round) => {
  const res = await axios.get(`http://localhost:3001/laps/${year}/${round}`);
  return res.data;
};
