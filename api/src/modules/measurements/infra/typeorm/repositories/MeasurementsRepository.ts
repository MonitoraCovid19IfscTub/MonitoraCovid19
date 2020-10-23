import IMeasurementCreateDTO from '@modules/measurements/dtos/IMeasurementsCreateDTO';
import IMeasurementsRepository from '@modules/measurements/repositories/IMeasurementsRepository';
import { getRepository, Repository } from 'typeorm';
import Measurement from '../entities/Measurement';
import MeasurementType from '../entities/MeasurementType';

export default class MeasurementsRepository implements IMeasurementsRepository {
  private repository: Repository<Measurement>;

  constructor() {
    this.repository = getRepository(Measurement);
  }

  create({
    value,
    patient,
    registeredAt,
    station,
    typeId,
  }: IMeasurementCreateDTO): Promise<Measurement> {
    const entityMeasurement = new Measurement();
    const type = new MeasurementType();
    type.id = typeId;

    Object.assign(entityMeasurement, {
      measurement: value,
      patient,
      registeredAt,
      station,
    });
    entityMeasurement.type = type;

    return this.repository.save(entityMeasurement);
  }
  findManyByPatientId(patientId : string){
    return this.repository.find({
      where: {patient : patientId}
    })
  }
}
