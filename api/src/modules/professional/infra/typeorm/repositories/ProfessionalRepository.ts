import { Repository, getRepository } from 'typeorm';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import Professional from '../entities/Professional';
import IProfessionalRepository from '@modules/professional/repositories/IProfessionalRepository';
import Patient from '@modules/patient/infra/typeorm/entities/Patient';

export default class ProfessionalRepository implements IProfessionalRepository {
  private repository: Repository<Professional>;

  constructor() {
    this.repository = getRepository(Professional);
  }

  findById(professionalId: string): Promise<Professional> {
    return this.repository.findOne(professionalId);
  }

  findByProfileAndReturnRelations(profile: Profile): Promise<Professional> {
    return this.repository
      .createQueryBuilder('professional')
      .leftJoinAndSelect('professional.profile', 'profile')
      .where('professional.profile = :profileId', { profileId: profile.id })
      .getOne();
  }

  save(professional: Professional): Promise<Professional> {
    return this.repository.save(professional);
  }
  findPatientsRelations(professional: Professional){
    return this.repository.createQueryBuilder()
    .relation(Professional, "patients")
    .of(professional) // you can use just post id as well
    .loadMany();
  }
}
