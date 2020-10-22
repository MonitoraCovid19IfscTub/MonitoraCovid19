import Professional from '@modules/professional/infra/typeorm/entities/Professional';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import Patient from '../infra/typeorm/entities/Patient';

export default interface IPatientRepository {
  save(data : Patient): Promise<Patient>
  findById(patientId: string): Promise<Patient>;
  findByProfileAndReturnRelations(profile: Profile): Promise<Patient>;
}
