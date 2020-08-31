import { Request, Response } from 'express';
import GenerateANewToken from '@modules/Profile/service/GenerateANewToken';
import ProfileLogin from '@modules/Profile/service/ProfileLogin';

export default class ProfileController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    try {
      /// criar um service que retorna Profile
      const profileLogin = new ProfileLogin(email, password);
      const profile = await profileLogin.run();
      if (!profile) {
        return response.status(400).send({ error: 'invalid password' });
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
        profileId: profile.profile.id,
        profile,
      });
      const token = await generateToken.run();

      return response.status(200).send({ profile, token });
    } catch (err) {
      return response.status(400).send({ err });
    }
  }
}
