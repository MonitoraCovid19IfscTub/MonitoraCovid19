import express from 'express';
import PatientController from '../controllers/PatientController';

const patientsRouter = express.Router();

const patientController = new PatientController();

patientsRouter.post('/', patientController.create);

export default patientsRouter;
