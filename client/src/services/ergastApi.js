import axios from 'axios';

const API_BASE = 'https://ergast.com/api/f1';

// Fetch last race results
export const getLastRaceResults = async () => {
  try {
    const response = await axios.get(`${API_BASE}/current/last/results.json`);
    return response.data.MRData.RaceTable.Races[0];
  } catch (error) {
    console.error('Error fetching last race results:', error);
    return null;
  }
};

// Fetch pit stops for last race
export const getLastRacePitStops = async () => {
  try {
    const response = await axios.get(`${API_BASE}/current/last/pitstops.json?limit=100`);
    return response.data.MRData.RaceTable.Races[0]?.PitStops;
  } catch (error) {
    console.error('Error fetching pit stop data:', error);
    return [];
  }
};

export const getLastRaceDriverStandings = async () => {
    try {
      const response = await axios.get(`${API_BASE}/current/last/results.json`);
      const race = response.data.MRData.RaceTable.Races[0];
      if (race && race.Results) {
        return race.Results.map(driver => ({
          position: driver.position,
          driverName: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          driverCode: driver.Driver.code,
          nationality: driver.Driver.nationality,
          team: driver.Constructor.name,
          lastLap: driver.FastestLap ? driver.FastestLap.Time.time : 'N/A',
          points: driver.points,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching driver standings:', error);
      return [];
    }
  };
  
  // Get list of all 2024 races
export const getAllRacesForSeason = async (season = 2024) => {
    const res = await axios.get(`https://ergast.com/api/f1/${season}.json`);
    return res.data.MRData.RaceTable.Races;
  };
  
  // Get results for a selected round
  export const getRaceResultsByRound = async (season = 2024, round) => {
    const res = await axios.get(`https://ergast.com/api/f1/${season}/${round}/results.json`);
    return res.data.MRData.RaceTable.Races[0]?.Results || [];
  };
  
  
  