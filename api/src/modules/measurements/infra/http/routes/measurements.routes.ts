import express from 'express';
import { celebrate, Joi, Segments, errors } from 'celebrate';
import MeasurementControllers from '../../controllers/MeasuramentControllers';

const measurementsRouter = express.Router();
const measurementControllers = new MeasurementControllers();

measurementsRouter.use(errors());
measurementsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      patientId: Joi.string().required().uuid(),
      stationId: Joi.string().required().uuid(),
      measurement: Joi.object().keys({
        value: Joi.number().required(),
        typeId: Joi.number().integer().required(),
        registeredAt: Joi.date().iso().required().min('01-01-2020'),
      }),
    }),
  }),
  measurementControllers.create,
);

export default measurementsRouter;
