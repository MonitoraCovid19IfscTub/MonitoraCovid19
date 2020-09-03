import ProfileType from '../infra/typeorm/entities/ProfileType';

export default interface IProfileTypeRepository {
  findTypeByName(name: string): Promise<ProfileType>;
}
