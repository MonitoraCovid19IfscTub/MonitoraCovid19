import ProfileType from '../infra/typeorm/entities/ProfileType';

export default interface IProfileTypeRepository {
  findTypeById(typeId: string): ProfileType;
}
