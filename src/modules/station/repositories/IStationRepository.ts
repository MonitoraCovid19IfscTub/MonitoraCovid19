import Station from '../infra/typeorm/entities/Station';

export default interface IStationRepository {
  findById(stationId: string): Promise<Station>;
}
