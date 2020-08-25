import express from 'express';
import MeasurementControllers from '../../controllers/MeasuramentControllers';

const measurementsRouter = express.Router();
const measurementControllers = new MeasurementControllers();

measurementsRouter.post('/', measurementControllers.create);

export default measurementsRouter;
