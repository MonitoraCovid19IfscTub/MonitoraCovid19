import ReturnAccompaniedPatientsByProfessional from "@modules/professional/services/ReturnAccompaniedPatientsByProfessional";
import ReturnProfessionalByProfileService from "@modules/professional/services/ReturnProfessionalByProfileService";
import Profile from "@modules/Profile/infra/typeorm/entities/Profile";
import RequestParams from "@shared/@types/expressExtendTypes";
import { Response } from "express";

export default class ProfessionalController {

  async patientsMonitored(request: RequestParams,response: Response){
    try{
        const professionalProfileId = request.profileId;

        const profile = new Profile();
        profile.id = professionalProfileId;

        const returnProfessionalByProfileService = new ReturnProfessionalByProfileService(profile);
        const professional = await returnProfessionalByProfileService.run();

        const returnAccompaniedPatientByProfessional = new ReturnAccompaniedPatientsByProfessional(professional);
        const patients = await  returnAccompaniedPatientByProfessional.run();

        response.send(patients);

      }catch(err){
        console.log(err);
        response.status(500).send({error: "failure to seek monitored patients"});

      }
    }
}
