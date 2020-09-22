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
    try {
      const profile = await this.profileRepository.findProfileByEmail(
        this.email,
      );
      if (!profile) {
        return null;
      }
      const passwordIsValid = await bcrypt.compare(
        this.password,
        profile.password,
      );
      if (!passwordIsValid) {
        return null;
      }

      if (profile.profileType.name === 'Patient') {
        // retornar o paciente
        const returnPatientByProfileService = new ReturnPatientByProfileService(
          profile,
        );
        const patient = await returnPatientByProfileService.run();
        return patient;
      }

      if (profile.profileType.name === 'Professional') {
        // retornar o professional
        const returnProfessionalByProfileService = new ReturnProfessionalByProfileService(
          profile,
        );
        const professional = await returnProfessionalByProfileService.run();
        return professional;
      }

      return null;
    } catch (err) {
      throw new Error('Login failed');
    }
  }
}
