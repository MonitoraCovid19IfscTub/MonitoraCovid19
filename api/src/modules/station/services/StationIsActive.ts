import IStationRepository from '../repository/IStationRepository';
import StationRepository from '../infra/typeorm/repositories/StationRepository';

export default class StationIsActive {
  private stationRepository : IStationRepository;
  private stationId : string;

  constructor(stationId : string) {
    this.stationRepository = new StationRepository();
    this.stationId = stationId;
  }

  async run(): Promise<Boolean>{

    const station = await this.stationRepository.findById(this.stationId);
    
    if(!station){
      return false;
    }
    return new Boolean(station.active);
  }
}
