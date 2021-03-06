import { Router } from 'express';
import patientsRouter from '@modules/patient/infra/http/routes/patients.routes';
import measurementsRouter from '@modules/measurements/infra/http/routes/measurements.routes';
import profileRouter from '@modules/Profile/infra/http/routes/profile.routes';
import professionalRouter from '@modules/professional/infra/http/routes/professional.routes';

const router = Router();

router.use('/api/patient', patientsRouter);
router.use('/api/measurement', measurementsRouter);
router.use('/api/profile', profileRouter);
router.use('/api/professional',professionalRouter);


export default router;
