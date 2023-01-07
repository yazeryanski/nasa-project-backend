import express from 'express';
import planetsController from './planets.controller';

const router = express.Router();

router.get('/', planetsController.getPlanets);

export default router;
