import Measurement from '../infra/typeorm/entities/Measurement';

import IMeasurementCreateDto from '../dtos/IMeasurementsCreateDTO';

export default interface IMeasurementsRepository {
  create(data :IMeasurementCreateDto): Promise<Measurement>;
}