import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import Professional from '../infra/typeorm/entities/Professional';

export default interface IProfessionalRepository {
  findById(patientId: string): Promise<Professional>;
  findByProfileAndReturnRelations(profile: Profile): Promise<Professional>;
}
