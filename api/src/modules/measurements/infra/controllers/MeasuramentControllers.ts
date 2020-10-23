import { Request, Response } from 'express';
import CreateANewMeasurementService from '@modules/measurements/services/CreateANewMeasurementService';
import StationIsActive from '@modules/station/services/StationIsActive';
import VerifyPatientExist from '@modules/patient/services/VerifyPatientExist';
import RequestParams from '@shared/@types/expressExtendTypes';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import ReturnPatientByProfileService from '@modules/patient/services/ReturnPatientByProfileService';
import ReturnMeasurementsForPatientId from '@modules/measurements/services/ReturnMeasurementsForPatientId';
import ReturnProfessionalByProfileService from '@modules/professional/services/ReturnProfessionalByProfileService';
import ReturnPatientMeasurementsAndProfessionalsById from '@modules/patient/services/ReturnPatientMeasurementsAndProfessionalsById';

export default class MeasurementControllers {
  async index(request: RequestParams, response : Response){
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
      const returnPatientByProfileService = new ReturnPatientMeasurementsAndProfessionalsById(ṕatientId as string);
      const patient = await returnPatientByProfileService.run();
      if(!patient){
        return response.send({error:'patient not found '});
      }

      const returnProfessionalByProfileService = new ReturnProfessionalByProfileService(profile);
      const professional = await returnProfessionalByProfileService.run();
      if(!professional){
        return response.status(403).send({error: "acesses denied"});
      }

      const found =  patient.professionals.find(professionalPatient => professionalPatient.id == professional.id);

      if(!found){
        return response.status(403).send({error: 'you are not allowed to access this patient\'s data'})
      }

      const returnMeasurementsForPatientId = new ReturnMeasurementsForPatientId(ṕatientId as string);
      const measurements = await returnMeasurementsForPatientId.run();
      if(!measurements){
        return response.send({error:'measurements not found '});
      }

      return response.send({patientID : patient.id,measurements});
    }else{

      const returnMeasurementsForPatientId = new ReturnMeasurementsForPatientId(patientProfile.id);
      const measurements = await returnMeasurementsForPatientId.run();
      if(!measurements){
        return response.send({error:'measurements not found '});
      }
      return response.send({patientID : patientProfile.id,measurements});
    }
  }
  async create(request: Request, response: Response): Promise<Response> {
    const { patientId, stationId, measurement } = request.body;

    // identificar se a Estação  existe e se está ativo.
    try {
      const stationIsActiveService = new StationIsActive(stationId);
      const stationIsActive = await stationIsActiveService.run();

          if (!stationIsActive) {
        return response.status(400).send({ error: 'Station not Active' });
      }

      // identificar se o patient existe
      const verifyPatientExist = new VerifyPatientExist(patientId);
      const patientExist = await verifyPatientExist.run();
      if (!patientExist) {
        return response.status(400).send({ error: 'Patient not exist' });
      }

      // Caso não existir retorna erro caso sim continue

      // insert clinical_signals measurements in data_base

      const createANewMeasurementService = new CreateANewMeasurementService(
        patientId,
        stationId,
        measurement,
      );
      await createANewMeasurementService.run();

      return response.status(201).send();
    } catch (err) {
      return response.status(400).send({ error: err.message });
    }
  }
}

// {
// 	"patient_id" : 1,
// 	"station_id": 2,
// 	"measurement":
// 	{
// 			"value": 400,
// 			"type_id": 1,
// 			"type_name": "Temperatura",
// 			"date" : "2020-02-26T10:37:34.768Z",
// 			"timestamp": 1593454768
// 	}
// }
