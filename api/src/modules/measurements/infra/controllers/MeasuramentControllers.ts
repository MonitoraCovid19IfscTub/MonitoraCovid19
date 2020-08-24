import { Request, Response } from 'express';
import CreateANewMeasurementService from '@modules/measurements/services/CreateANewMeasurementService';

interface IMeasurement {}

export default class MeasurementControllers {
  async create(request: Request, response: Response): Promise<Response> {
    const { patientId, stationId, measurements } = request.body;

    // identificar se a Estação  existe e se está ativo.

    // caso sim continue senão retorne erro

    // identificar se o patiente existe

    // Caso não existir retorna erro caso sim continue

    /// /insert clinical mensuaraments in database

    // // select the mensuarament_type_id correct

    /// preciso verificar se o id esta em measuremern_types

    // insert clinical_signals measurements in data_base

    const createANewMeasurementService = new CreateANewMeasurementService(
      patientId,
      stationId,
      measurements,
    );
    await createANewMeasurementService.run();
  }
}

// {
// 	"patient_id" : 1,
// 	"station_id": 2,
// 	"measurements":
// 	[
// 		{
// 			"measurement": 400,
// 			"type_id": 1,
// 			"type_name": "Temperatura",
// 			"date" : "2020-02-26T10:37:34.768Z",
// 			"timestamp": 1593454768
// 	},
// 			{
// 			"measurement": 400,
// 			"type_id": 1,
// 			"type_name": "Temperatura",
// 			"date" : "2020-02-26T10:37:34.768Z",
// 			"timestamp": 1593454768
// 			}

// ]
