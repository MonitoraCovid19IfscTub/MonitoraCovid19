import { IMeasurementCreateDTO } from '@modules/measurements/dtos/IMeasurementsCreateDTO';

export default class CreateANewMeasurementService {
  private patientId: string;

  private stationId: string;

  private measurements: IMeasurementCreateDTO[];

  constructor(
    patientId: string,
    stationId: string,
    measurements: IMeasurementCreateDTO[],
  ) {
    this.measurements = measurements;
    this.patientId = patientId;
    this.stationId = stationId;
  }

  async run(): Promise<void> {
    // pega o tipo no banco 

    //utilizar o repository create ;
  }
}
