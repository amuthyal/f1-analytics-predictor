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
  
  
// Get driver standings for a given round
export const getDriverStandingsByRound = async (season = 2024, round) => {
    try {
      const response = await axios.get(
        `https://ergast.com/api/f1/${season}/${round}/driverStandings.json`
      );
      const standings = response.data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings;
      return standings || [];
    } catch (error) {
      console.error('Error fetching driver standings:', error);
      return [];
    }
  };
  
  export const getLapPositionsByRound = async (season, round) => {
    const limit = 2000;
    let offset = 0;
    let allLaps = [];
    let total = 1; // Assume at least one page
  
    while (offset < total) {
      const res = await axios.get(
        `https://ergast.com/api/f1/${season}/${round}/laps.json?limit=${limit}&offset=${offset}`
      );
  
      const laps = res.data.MRData.RaceTable.Races[0]?.Laps || [];
      total = parseInt(res.data.MRData.total); // Total entries across all pages
  
      allLaps = [...allLaps, ...laps];
      offset += limit;
    }
  
    return allLaps;
  };
  
  export const getConstructorStandingsByRound = async (season, round) => {
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/constructorStandings.json`);
    const data = await res.json();
    return data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
  };