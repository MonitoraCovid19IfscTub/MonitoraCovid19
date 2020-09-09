import { Request, Response } from 'express';

export default class PatientController {
  async create(request: Request, response: Response) {
    /// professional authenticate
    /// const {professionalId} = response.professionalId;
    return response.status(301).send();
  }
}
