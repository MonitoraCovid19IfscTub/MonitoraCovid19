import Profile from '../infra/typeorm/entities/Profile';

export default interface IProfileRepository {
  findProfileAndTypeProfileById(profileId: string): Promise<Profile>;
  findProfileByEmail(email: string): Promise<Profile>;
}
