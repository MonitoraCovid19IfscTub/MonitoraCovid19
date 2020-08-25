import MeasurementType from '@modules/measurements/infra/typeorm/entities/MeasurementType';

export default interface IMeasurementTypesRepository {
  findById(typeId: number): Promise<MeasurementType>;
}
