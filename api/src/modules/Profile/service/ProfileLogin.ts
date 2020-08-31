import bcrypt from 'bcrypt';
import Professional from '@modules/professional/infra/typeorm/entities/Professional';
import Patient from '@modules/patient/infra/typeorm/entities/Patient';
import ReturnPatientByProfileService from '@modules/patient/services/ReturnPatientByProfileService';
import ReturnProfessionalByProfileService from '@modules/professional/services/ReturnProfessionalByProfileService';
import IProfileRepository from '../repositories/IProfileRepository';
import ProfileRepository from '../infra/typeorm/repositories/ProfileRepository';

export default class ProfileLogin {
  private profileRepository: IProfileRepository;

  private email: string;

  private password: string;

  constructor(email: string, password: string) {
    this.profileRepository = new ProfileRepository();
    this.email = email;
    this.password = password;
  }

  async run(): Promise<Patient | Professional> {
    const profile = await this.profileRepository.findProfileByEmail(this.email);

    if (!(await bcrypt.compare(this.password, profile.password))) {
      return null;
    }

    if (profile.type.name === 'patient') {
      // retornar o professional
      const returnPatientByProfileService = new ReturnPatientByProfileService(
        profile,
      );
      const patient = await returnPatientByProfileService.run();
      patient.profile.password = undefined;
      return patient;
    }

    if (profile.type.name === 'professional') {
      // retornar o professional
      const returnProfessionalByProfileService = new ReturnProfessionalByProfileService(
        profile,
      );
      const professional = returnProfessionalByProfileService.run();
      professional.profile.password = undefined;
      return professional;
    }

    return null;
  }
}
