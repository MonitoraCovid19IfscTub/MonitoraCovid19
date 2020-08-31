import { repository } from 'typeorm';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import Professional from '../infra/typeorm/entities/Professional';
import IProfessionalRepository from '../repositories/IProfessionalRepository';
import ProfessionalRepository from '../infra/typeorm/repositories/ProfessionalRepository';

export default class ReturnProfessionalByProfileService {
  private profile: Profile;

  private repository: IProfessionalRepository;

  constructor(profile: Profile) {
    this.profile = profile;

    this.repository = new ProfessionalRepository();
  }

  async run(): Promise<Professional> {}
}
