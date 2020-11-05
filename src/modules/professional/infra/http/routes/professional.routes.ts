import authenticationProfile from '@modules/Profile/infra/http/middleware/autenticationProfile';
import {Router} from 'express';
import ProfessionalController from '../../controller/professionalController';

const professionalRouter = Router();

const professionalController = new ProfessionalController();

professionalRouter.use(authenticationProfile);

professionalRouter.get('/patientsMonitored',professionalController.patientsMonitored);


export default professionalRouter;
