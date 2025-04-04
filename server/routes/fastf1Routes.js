import express from 'express';
import { getFastf1Laps } from '../controllers/fastf1Controller.js';

const router = express.Router();

router.get('/laps/:year/:round', getFastf1Laps);

export default router;