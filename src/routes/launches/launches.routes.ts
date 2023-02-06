import express from 'express';
import launchesController from './launches.controller';

const router = express.Router();

router.get('/', launchesController.get);
router.post('/', launchesController.add);
router.delete('/:id', launchesController.abort);

export default router;
