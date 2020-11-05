import express from 'express';
import { celebrate, Joi, Segments, errors } from 'celebrate';
import MeasurementControllers from '../../controllers/MeasuramentControllers';
import authenticationProfile from '@modules/Profile/infra/http/middleware/autenticationProfile';

const measurementsAuthRouter = express.Router();
const measurementControllers = new MeasurementControllers();


measurementsAuthRouter.get('/',authenticationProfile,measurementControllers.index);


export default measurementsAuthRouter;
