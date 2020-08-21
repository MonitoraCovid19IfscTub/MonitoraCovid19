import { Router } from 'express';
import patientsRouter from '@modules/patient/infra/http/routes/patients.routes';
import measurementsRouter from '@modules/measurements/infra/http/routes/measurements.routes';

const router = Router();

router.use('/patient', patientsRouter);
router.use('/measurement', measurementsRouter);

export default router;
