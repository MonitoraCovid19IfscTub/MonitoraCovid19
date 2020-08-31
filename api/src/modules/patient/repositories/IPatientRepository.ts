import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import Patient from '../infra/typeorm/entities/Patient';

export default interface IPatientRepository {
  findById(patientId: string): Promise<Patient>;
  findByProfileAndReturnRelations(profile: Profile): Promise<Patient>;
}
