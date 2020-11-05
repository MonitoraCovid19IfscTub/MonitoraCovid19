import IMeasurementTypesRepository from '@modules/measurements/repositories/IMeasurementTypesRepository';
import { getRepository, Repository } from 'typeorm';
import MeasurementType from '../entities/MeasurementType';

export default class MeasurementTypesRepository
  implements IMeasurementTypesRepository {
  private repository: Repository<MeasurementType>;

  constructor() {
    this.repository = getRepository(MeasurementType);
  }

  findById(typeId: number): Promise<MeasurementType> {
    return this.repository.findOne({ id: typeId });
  }

  create(): boolean {
    return false;
  }
}
