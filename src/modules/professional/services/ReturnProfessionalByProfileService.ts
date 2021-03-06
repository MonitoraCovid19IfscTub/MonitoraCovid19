import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import ProfessionalRepository from '../infra/typeorm/repositories/ProfessionalRepository';
import IProfessionalRepository from '../repositories/IProfessionalRepository';
import Professional from '../infra/typeorm/entities/Professional';

export default class ReturnProfessionalByProfileService {
  private profile: Profile;

  private repository: IProfessionalRepository;

  constructor(profile: Profile) {
    this.profile = profile;

    this.repository = new ProfessionalRepository();
  }

  async run(): Promise<Professional> {
    return this.repository.findByProfileAndReturnRelations(this.profile);
  }
}
