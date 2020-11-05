import MeasurementsRepository from "../infra/typeorm/repositories/MeasurementsRepository";
import IMeasurementsRepository from "../repositories/IMeasurementsRepository";

export default class ReturnMeasurementsForPatientId {
  private repository : IMeasurementsRepository;
  private patientId : string;

  constructor(patientId : string){
    this.patientId = patientId;
    this.repository = new MeasurementsRepository();
  }

  run(){
    return this.repository.findManyByPatientId(this.patientId);
  }
}
