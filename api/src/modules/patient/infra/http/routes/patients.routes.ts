
import authenticationProfile from '@modules/Profile/infra/http/middleware/autenticationProfile';
import authenticationProfessional from '@modules/Profile/infra/http/middleware/authenticationProfessional';
import express from 'express';
import PatientController from '../controllers/PatientController';
import {celebrate,errors,Joi,Segments} from 'celebrate'
const patientsRouter = express.Router();

const patientController = new PatientController();
patientsRouter.use(errors());
patientsRouter.use(authenticationProfile);
patientsRouter.use(authenticationProfessional);
patientsRouter.post('/',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name : Joi.string().min(3).required(),
    birthDate: Joi.string().isoDate().required(),
    email :Joi.string().email().required(),
    password :Joi.string().min(8).required(),
    contact : Joi.string().replace(/[\(\+\) \-\.]/gi,'').trim().pattern(/^[0-9]+$/,'numbers').min(8).max(15).required(),
    monitoringStart: Joi.string().isoDate().required(),
    accompanying: Joi.object().keys({
      name : Joi.string().min(3).required(),
      contact:Joi.string().replace(/[\(\+\) \-\.]/gi,'').trim().pattern(/^[0-9]+$/,'numbers').min(8).max(15).required()
    }),
    address: Joi.object().keys({
      street:Joi.string().min(3).max(250).required(),
      number: Joi.number().required(),
      complement: Joi.string().max(250),
      postalCode: Joi.string().min(4),
      neighborhood: Joi.string().min(2).required(),
      city: Joi.string().min(2).max(200).required(),
      state:Joi.string().min(2).max(200).required()
    }).required()
  })
})
 ,patientController.create);

 patientsRouter.get('/',patientController.index);

export default patientsRouter;
