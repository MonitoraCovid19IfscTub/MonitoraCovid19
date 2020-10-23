import CreateANewPatientService from '@modules/patient/services/CreateANewPatientService';
import ReturnProfessionalByProfileService from '@modules/professional/services/ReturnProfessionalByProfileService';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import RequestParams from '@shared/@types/expressExtendTypes';
import {Response } from 'express';
import Patient from '../../typeorm/entities/Patient';
import ReturnPatientByProfileService from '@modules/patient/services/ReturnPatientByProfileService';
import ReturnPatientMeasurementsAndProfessionalsById from '@modules/patient/services/ReturnPatientMeasurementsAndProfessionalsById'
import patientsRouter from '../routes/patients.routes';
import { send } from 'process';
export default class PatientController {

  async create(request: RequestParams, response: Response) {
    const data = request.body;
    try{
      const professionalProfileId = request.profileId;

      const profile = new Profile();
      profile.id = professionalProfileId;

      const returnProfessionalByProfileService = new ReturnProfessionalByProfileService(profile);
      const professional = await returnProfessionalByProfileService.run();
      if(!professional){
        response.status(403).send({error:'only professionals can register patients'});
      }


      const createANewPatientService = new CreateANewPatientService({professional,...data});
      const patient = await createANewPatientService.run();
      if(!patient){
        return response.status(400).send({error : "invalid data, please check the data and try again"});

      }

      const sendEmailByPatient = new SendEmailByCreatedPatient(patient);
      await sendEmailByPatient.run();


      return response.status(201).send();

    }catch(err){
      return response.status(500).send({error : err.message});
    }
  }

  async show(request: RequestParams, response: Response){
    const profileId = request.profileId;
    const ṕatientId = request.query.patientId;

    const profile = new Profile();
    profile.id = profileId;

    const returnPatientByProfileService = new ReturnPatientByProfileService(profile);
    const patientProfile = await returnPatientByProfileService.run();



    if(!patientProfile){
      if(!ṕatientId){
        return response.status(403).send({error: "no patientId provided"});
      }
      const returnPatientById = new ReturnPatientMeasurementsAndProfessionalsById(ṕatientId as string);
      const patient = await returnPatientById.run();
      if(!patient){
        return response.send({error:'patient not found '});
      }

      const returnProfessionalByProfileService = new ReturnProfessionalByProfileService(profile);
      const professional = await returnProfessionalByProfileService.run();
      if(!professional){
        return response.status(403).send({error: "acesses denied"});
      }

     const found =  patient.professionals.find(professionalPatient => professionalPatient.id == professional.id);
     patient.professionals = undefined;
     patient.profileId = undefined;

     if(!found){
       return response.status(403).send({error: 'you are not allowed to access this patient\'s data'})
     }
      return response.send(patient);
    }else{
      const returnPatientById = new ReturnPatientMeasurementsAndProfessionalsById(patientProfile.id);
      const patient = await returnPatientById.run();
      if(patient){
        return response.send(patient);
      }
    }

  }

}
