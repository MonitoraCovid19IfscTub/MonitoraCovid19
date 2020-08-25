import IMeasurementCreateDTO from '@modules/measurements/dtos/IMeasurementsCreateDTO';
import MeasurementTypesRepository from '../infra/typeorm/repositories/MeasurementTypes';
import IMeasurementTypesRepository from '../repositories/IMeasurementTypesRepository';
import IMeasurementsRepository from '../repositories/IMeasurementsRepository';
import MeasurementsRepository from '../infra/typeorm/repositories/MeasurementsRepository';

export default class CreateANewMeasurementService {
  private patientId: string;

  private stationId: string;

  private measurement: IMeasurementCreateDTO;

  constructor(
    patientId: string,
    stationId: string,
    measurement: IMeasurementCreateDTO,
  ) {
    this.measurement = measurement;
    this.patientId = patientId;
    this.stationId = stationId;
  }

  async run(): Promise<void> {
    // pega o tipo no banco

    const measuramentTypesRepository: IMeasurementTypesRepository = new MeasurementTypesRepository();

    const measuramentType = measuramentTypesRepository.findById(
      this.measurement.typeId,
    );
    if (!measuramentType) {
      throw new Error('type measurament not exist');
    }
    const {
      value,
      patientId,
      registeredAt,
      stationId,
      typeId,
    } = this.measurement;

    const measurementRepository: IMeasurementsRepository = new MeasurementsRepository();
    measurementRepository.create({
      value,
      patientId,
      registeredAt,
      stationId,
      typeId,
    });
  }
}
