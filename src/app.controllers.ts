import express from 'express';
import { generateGoal, checkGoal } from './app.services';

const router = express.Router();

router.get('/goal', generateGoal);
router.post('/check-goal', checkGoal);

export default router;