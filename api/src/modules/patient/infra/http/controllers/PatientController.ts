import { Request, Response } from 'express';

export default class PatientControllers {
  async create(request: Request, response: Response) {
    return response.status(503).send();
  }
}
