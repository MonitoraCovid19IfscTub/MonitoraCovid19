import { Request, Response } from 'express';
import GenerateANewToken from '@modules/Profile/service/GenerateANewToken';

export default class ProfileController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    /// criar um service que retorna Profile

    const generateToken = new GenerateANewToken({ profileId, type });
    const token = await generateToken.run();

    return response.status(200).send({ token });
  }
}
