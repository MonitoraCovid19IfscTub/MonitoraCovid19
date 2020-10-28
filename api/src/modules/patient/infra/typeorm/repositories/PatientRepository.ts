import { Repository, getRepository } from 'typeorm';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import IPatientRepository from '../../../repositories/IPatientRepository';
import Patient from '../entities/Patient';
import IPatientCreateDTO from '@modules/patient/dtos/IPatientCreateDTO';
import Professional from '@modules/professional/infra/typeorm/entities/Professional';

export default class PatientRepository implements IPatientRepository {
  private repository: Repository<Patient>;

  constructor() {
    this.repository = getRepository(Patient);
  }

  save(data : Patient){
    return this.repository.save(data);
  }

  findById(patientId: string): Promise<Patient>{
    return this.repository.findOne({id : patientId});
  }
  findByIdAndReturnPatientMeasurementsAndProfessionals(patientId: string): Promise<Patient> {
    return this.repository.createQueryBuilder('patient')
    .leftJoinAndSelect('patient.profile', 'profile')
    .leftJoinAndSelect('patient.measurements','measurement')
    .leftJoinAndSelect('measurement.type','measurementType')
    .leftJoinAndSelect('patient.professionals','professional')
    .where('patient.id = :id', { id: patientId })
    .getOne();
  }

  findByProfileAndReturnRelations(profile: Profile): Promise<Patient> {
    return this.repository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.profile', 'profile')
      .where('patient.profile = :profileId', { profileId: profile.id })
      .getOne();
  }

}
