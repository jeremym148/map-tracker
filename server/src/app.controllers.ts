import express from 'express';
import { generateGoal, checkGoal } from './app.services';
import Coordinate from './app.types';

const router = express.Router();

router.get('/goal', generateGoalHandler);
router.post('/check-goal', checkGoalHandler);

function generateGoalHandler(req: express.Request, res: express.Response) {
    try {
        const latitude = parseFloat(req.query.currentLat?.toString() || '');
        const longitude = parseFloat(req.query.currentLng?.toString() || '');
        const current: Coordinate = {lat: latitude, lng: longitude };
        const goal = generateGoal(current);
        res.send(goal);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }    
    
}

function checkGoalHandler(req: express.Request, res: express.Response) {
    try {
        const current: Coordinate = req.body.current;
        const goal: Coordinate = req.body.goal;
        const reached = checkGoal(current, goal);
        res.send({isGoalReached: reached});
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export default router;