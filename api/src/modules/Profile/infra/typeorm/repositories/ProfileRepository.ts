import { Repository, getRepository } from 'typeorm';
import IProfileRepository from '@modules/profile/repositories/IProfileRepository';
import Profile from '../entities/Profile';

export default class ProfileRepository implements IProfileRepository {
  private repository: Repository<Profile>;

  constructor() {
    this.repository = getRepository(Profile);
  }

  findById(profileId: string): Promise<Profile> {
    return this.repository.findOne(profileId);
  }
}
