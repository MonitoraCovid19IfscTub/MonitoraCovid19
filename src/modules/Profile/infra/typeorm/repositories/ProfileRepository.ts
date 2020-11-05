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
      relations: ['profileType'],
    });
  }

  findProfileByEmail(email: string): Promise<Profile> {
    return this.repository
      .createQueryBuilder('profile')
      .addSelect('profile.password')
      .leftJoinAndSelect('profile.profileType', 'profileType')
      .where('profile.email ILIKE :email', { email })
      .getOne();
  }
  save(profile: Profile): Promise<Profile> {
    return this.repository.save(profile);
  }
}
