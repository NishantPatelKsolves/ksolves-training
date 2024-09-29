import { Router } from 'express';
import healthCheckController from '../controllers/healthCheck.controllers.js';

const router = Router();
router.route('/').get(healthCheckController);

export default router;
