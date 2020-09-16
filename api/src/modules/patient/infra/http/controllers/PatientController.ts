import CreateANewPatientService from '@modules/patient/services/CreateANewPatientService';
import Professional from '@modules/professional/infra/typeorm/entities/Professional';
import ReturnProfessionalByProfileService from '@modules/professional/services/ReturnProfessionalByProfileService';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import SetProfessionalForPatient from '@modules/Profile/service/SetProfessionalForPatient';
import RequestParams from '@shared/@types/expressExtendTypes';
import {Response } from 'express';
import Patient from '../../typeorm/entities/Patient';

export default class PatientController {
  async create(request: RequestParams, response: Response) {
      const data = request.body;
      try{
        const professionalProfileId = request.profileId;
        const profile = new Profile();
        profile.id = professionalProfileId;
        const returnProfessionalByProfileService = new ReturnProfessionalByProfileService(profile);
        const professional = await returnProfessionalByProfileService.run();


      const createANewPatientService = new CreateANewPatientService({professional,...data});
      const patient = await createANewPatientService.run();
      if(!patient){
        return response.status(400).send({error : "invalid data, please check the data and try again"});

      }

     // const setProfessionalForPatient = new SetProfessionalForPatient(professional,patient);
      /* E se der erro aqui */
     // const success= await setProfessionalForPatient.run()
    //  if(!success){
  //      throw new Error("Error in Set Professional for patient");
//}*/


      console.log(patient);
      return response.send();

    }catch(err){
      console.log(err);
      return response.status(500).send({error : err.message});
    }
  }
}
