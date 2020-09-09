import { Request, Response } from 'express';
import CreateANewMeasurementService from '@modules/measurements/services/CreateANewMeasurementService';
import StationIsActive from '@modules/station/services/StationIsActive';
import VerifyPatientExist from '@modules/patient/services/VerifyPatientExist';

export default class MeasurementControllers {
  async create(requenst: Request, response: Response): Promise<Response> {
    const { patientId, stationId, measurement } = request.body;

    // identificar se a Estação  existe e se está ativo.
    try {
      const stationIsActiveService = new StationIsActive(stationId);
      const stationIsActive = await stationIsActiveService.run();

      if (!stationIsActive) {
        return response.status(400).send({ error: 'Station not Active' });
      }

      // identificar se o patiente existe
      const verifyPaitientExist = new VerifyPatientExist(patientId);
      const patientExist = await verifyPaitientExist.run();
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
      return response.status(400).send({ err });
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
