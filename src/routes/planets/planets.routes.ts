import express from 'express';
import planetsController from './planets.controller';

const router = express.Router();

router.get('/', planetsController.getPlanets);
router.post('/', planetsController.addPlanet);
router.delete('/:id', planetsController.removePlanet);

export default router;
