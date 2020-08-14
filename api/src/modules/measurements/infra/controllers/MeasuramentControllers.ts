
import {Request, Response} from 'express';
import CreateANewMeasurementService from '@modules/measurements/services/CreateANewMeasurementService';

interface IMeasurement{
  
}

export default class MeasurementControllers{

    async create(request: Request, response: Response): Promise<Response>{

        const {
            patientId,
            stationId,
            measurements
        } = request.body;

        const createANewMeasurementService = new CreateANewMeasurementService(patientId,
          stationId,measurements
          );
        await createANewMeasurementService.run();

        //identificar se o patiente existe


        //quardar os dados do patiente no banco de dados.
        try {
            const trx = await knex.transaction();
            //identificar se o nó existe e se está ativo.


            if (selectedNode == null) {
                return response.json({ error: "node not registered." })
            } else if (selectedNode.active == 0) {
                return response.json({ error: "node not active." })
            }
            //check if there is a patient
            const selectedPatient = await trx('patient').where(patient).select('id', 'active').first();
            if (selectedPatient == null) {
                //insert id in database? to get the api information ? for now return errror.
                return response.json({ error: "patient not registered." })
            } else if (selectedPatient.active == 0) {
                return response.json({ error: "patient not active." })
            }


            //insert clinical mensuaraments in database
            // // select the mensuarament_type_id correct
            const selectedMeasurement_type = await knex('measurement_type').select('measurement_type', 'id');
            const measurement_types = selectedMeasurement_type.map((m) => ({
                id: m.id,
                name: m.measurement_type
            }));

            /// preciso verificar se o id esta em measuremern_types
            const validedTypeMensurement = ArrayOfMeasurement.filter(
                (m) => measurement_types.filter(
                    (m_type) => m_type.id == m.type_id)
                    .length == 1);
            //error of type
            const errorTypeMensurement = ArrayOfMeasurement.filter(
                (m) =>
                    measurement_types.filter(
                        (m_type) => m_type.id == m.type_id)
                        .length == 0);
            if (errorTypeMensurement.length != 0) {
                reponseJson.error.push({
                    name: "mensurement type don't exist",
                    values: errorTypeMensurement,
                })
            }
            // insert clinical_signals measurements in data_base
            const clinicalSignalsMeasurements = validedTypeMensurement.map((m) => ({
                measurement: m.value,
                date_time: m.date, //pode dar problema deve ser feita   //YYYY-MM-DD HH-MM-SS
                node_id: node.id,
                patient_id: patient.id,
                measurement_type_id: m.type_id
            }));
            const insertedids = await trx('clinical_signals_measurements').insert(clinicalSignalsMeasurements);

            trx.commit();

            responseJson.success.push({
                values: clinicalSignalsMeasurements
            });
            return response.json(reponseJson);

        } catch (error) {
            console.log(error)
            const responseJson = { "OK": false };
            return response.json(responseJson);
        }

    }
}

/ {
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
