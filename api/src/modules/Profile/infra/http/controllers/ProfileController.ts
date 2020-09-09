import { Request, Response } from 'express';
import GenerateANewToken from '@modules/Profile/service/GenerateANewToken';
import ProfileLogin from '@modules/Profile/service/ProfileLogin';
import IProfileTypeRepository from '@modules/Profile/repositories/IProfiletypeRepository';
import Professional from '@modules/professional/infra/typeorm/entities/Professional';
import ProfessionalRepository from '@modules/professional/infra/typeorm/repositories/ProfessionalRepository';
import ProfileTypeRepository from '../../typeorm/repositories/ProfiletypeRepository';
import Profile from '../../typeorm/entities/Profile';
import ProfileRepository from '../../typeorm/repositories/ProfileRepository';

export default class ProfileController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    try {
      /// criar um service que retorna Profile
      const profileLogin = new ProfileLogin(email, password);
      const user = await profileLogin.run();
      if (!user) {
        return response
          .status(400)
          .send({ error: 'invalid password or email' });
      }

      /**
       * ProfileID
       * nome
       * email
       * type
       *
       * SE for um paciente
       * Retorna os dados do paciente
       *
       * SE FOR um profissional
       * RETorna os dados do profissional
       */

      const generateToken = new GenerateANewToken({
        profileId: user.profile.id,
      });
      const token = await generateToken.run();

      user.profile.id = undefined;
      user.id = undefined;

      return response.status(200).send({ user, token });
    } catch (err) {
      return response.status(400).send({ error: err });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { email, password, contact } = request.body;

    try {
      const profileTypeRepository: IProfileTypeRepository = new ProfileTypeRepository();
      const profileType = await profileTypeRepository.findTypeByName(
        'Professional',
      );
      if (!profileType) {
        throw new Error('profile type not exist');
      }
      const profile = new Profile();
      profile.email = email;
      profile.password = password;
      profile.contact = contact;
      profile.profileType = profileType;

      const professional = new Professional();
      professional.profile = profile;
      const professionalRepository = new ProfessionalRepository();
      await professionalRepository.save(professional);
      return response.status(201).send();
    } catch (err) {
      return response
        .status(500)
        .send({ error: 'error in register, try again' });
    }
  }
}
