import { Repository, getRepository } from 'typeorm';
import IStationRepository from '@modules/station/repository/IStationRepository';
import Station from '../entities/Station';

export default class StationRepository implements IStationRepository {
  private repository: Repository<Station>;

  constructor() {
    this.repository = getRepository(Station);
  }

  findById(stationId: string): Promise<Station> {
    return this.repository.findOne(stationId);
  }
}
