
import PatientRepository from '../infra/typeorm/repositories/PatientRepository';
import IPatientRepository from '../repositories/IPatientRepository';
import Patient from '../infra/typeorm/entities/Patient';

export default class ReturnPatientByIdService {
  private patientId: string;

  private repository: IPatientRepository;

  constructor(patientId: string) {
    this.patientId = patientId;

    this.repository = new PatientRepository();
  }

  async run(): Promise<Patient> {
    return this.repository.findById(this.patientId);
  }
}
