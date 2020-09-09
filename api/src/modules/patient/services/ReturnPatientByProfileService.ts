import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import PatientRepository from '../infra/typeorm/repositories/PatientRepository';
import IPatientRepository from '../repositories/IPatientRepository';
import Patient from '../infra/typeorm/entities/Patient';

export default class ReturnPatientByProfileService {
  private profile: Profile;

  private repository: IPatientRepository;

  constructor(profile: Profile) {
    this.profile = profile;

    this.repository = new PatientRepository();
  }

  async run(): Promise<Patient> {
    return this.repository.findByProfileAndReturnRelations(this.profile);
  }
}
