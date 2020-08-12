import IMeasurementCreateDTO from '@modules/measurements/dtos/IMeasurementsCreateDTO';
import IMeasurementsRepository from '@modules/measurements/repositories/IMeasurementsRepository';
import Measurement from '../entities/Measurement';

export default class MeasurementsRepository implements IMeasurementsRepository {
  create({
    measurement,
    patientId,
    registeredAt,
    stationId,
    typeId,
  }: IMeasurementCreateDTO): Promise<Measurement> {}
}
