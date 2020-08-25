import IMeasurementCreateDTO from '@modules/measurements/dtos/IMeasurementsCreateDTO';
import IMeasurementsRepository from '@modules/measurements/repositories/IMeasurementsRepository';
import { getRepository, Repository } from 'typeorm';
import Measurement from '../entities/Measurement';

export default class MeasurementsRepository implements IMeasurementsRepository {
  private repository: Repository<Measurement>;

  constructor() {
    this.repository = getRepository(Measurement);
  }

  create({
    value,
    patientId,
    registeredAt,
    stationId,
    typeId,
  }: IMeasurementCreateDTO): Promise<Measurement> {
    const entityMeasurement = new Measurement();

    Object.assign(entityMeasurement, {
      measurement: value,
      patientId,
      registeredAt,
      stationId,
      typeId,
    });

    return this.repository.save(entityMeasurement);
  }
}
