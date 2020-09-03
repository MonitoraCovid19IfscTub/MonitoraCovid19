import IProfileTypeRepository from '@modules/Profile/repositories/IProfiletypeRepository';
import { getRepository, Repository } from 'typeorm';
import ProfileType from '../entities/ProfileType';

export default class ProfileTypeRepository implements IProfileTypeRepository {
  private repository: Repository<ProfileType>;

  constructor() {
    this.repository = getRepository(ProfileType);
  }

  findTypeByName(name: string): Promise<ProfileType> {
    return this.repository.findOne(name);
  }
}
