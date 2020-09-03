import { Repository, getRepository } from 'typeorm';

import IProfileRepository from '@modules/Profile/repositories/IProfileRepository';
import Profile from '../entities/Profile';

export default class ProfileRepository implements IProfileRepository {
  private repository: Repository<Profile>;

  constructor() {
    this.repository = getRepository(Profile);
  }

  findProfileAndTypeProfileById(profileId: string): Promise<Profile> {
    return this.repository.findOne(profileId, {
      relations: ['type'],
    });
  }

  findProfileByEmail(email: string): Promise<Profile> {
    return this.repository
      .createQueryBuilder('profile')
      .addSelect('password')
      .where('profile.email = :email', { email })
      .getOne();
  }
  save(profile: Profile): Promise<Profile> {
    return this.repository.save(profile);
  }
}
