import Profile from '../infra/typeorm/entities/Profile';

export default interface IProfileRepository {
  findById(profileId: string): Promise<Profile>;
}
