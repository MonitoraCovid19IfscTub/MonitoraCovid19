import { Router } from 'express';
import patientsRouter from '@modules/patient/infra/http/routes/patients.routes';

const router = Router();

router.use('/patient', patientsRouter);

export default router;
