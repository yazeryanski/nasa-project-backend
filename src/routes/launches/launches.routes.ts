import express from 'express';
import launchesController from './launches.controller';

const router = express.Router();

router.get('/', launchesController.httpGetLaunches);
router.post('/', launchesController.httpAddNewLaunch);
router.delete('/:id', launchesController.httpAbortLaunch);

export default router;
