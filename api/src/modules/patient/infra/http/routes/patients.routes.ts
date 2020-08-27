import express from 'express';
import PatientController from '../controllers/PatientController';
import { useContainer } from 'typeorm';

const patientsRouter = express.Router();


const patientController = new PatientController();

patientsRouter.post('/',patientController.create);

export default patientsRouter;
