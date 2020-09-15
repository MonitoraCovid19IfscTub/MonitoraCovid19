import { Repository, getRepository } from 'typeorm';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import IPatientRepository from '../../../repositories/IPatientRepository';
import Patient from '../entities/Patient';
import IPatientCreateDTO from '@modules/patient/dtos/IPatientCreateDTO';

export default class PatientRepository implements IPatientRepository {
  private repository: Repository<Patient>;

  constructor() {
    this.repository = getRepository(Patient);
  }

  save(data : Patient){
    return this.repository.save(data);
  }

  findById(patientId: string): Promise<Patient> {
    return this.repository.findOne(patientId);
  }

  findByProfileAndReturnRelations(profile: Profile): Promise<Patient> {
    return this.repository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.profile', 'profile')
      .where('patient.profile = :profileId', { profileId: profile.id })
      .getOne();
  }
}
