
import authenticationProfile from '@modules/Profile/infra/http/middleware/autenticationProfile';
import authenticationProfessional from '@modules/Profile/infra/http/middleware/authenticationProfessional';
import express from 'express';
import PatientController from '../controllers/PatientController';

const patientsRouter = express.Router();

const patientController = new PatientController();
patientsRouter.use(authenticationProfile);
patientsRouter.use(authenticationProfessional);
patientsRouter.post('/', patientController.create);

export default patientsRouter;
