import IStationRepository from '../repositories/IStationRepository';
import StationRepository from '../infra/typeorm/repositories/StationRepository';

export default class StationIsActive {
  private stationRepository: IStationRepository;

  private stationId: string;

  constructor(stationId: string) {
    this.stationRepository = new StationRepository();
    this.stationId = stationId;
  }

  async run(): Promise<boolean> {
    const station = await this.stationRepository.findById(this.stationId);

    if (!station) {
      return false;
    }

    return !!station.active;
  }
}
