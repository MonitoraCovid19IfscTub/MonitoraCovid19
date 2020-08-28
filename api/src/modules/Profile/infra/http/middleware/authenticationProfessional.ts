import { Response, NextFunction } from 'express';
import { RequestParams } from '@shared/@types/expressExtendTypes';

const authenticationProfessional = (
  request: RequestParams,
  response: Response,
  next: NextFunction,
): void => {
  const { profileId, professionalId, patientId } = request;
  if (!profileId) {
    response.status(401).send({ error: 'Not logged' });
  }
  if (patientId) {
    response.status(403).send({ error: 'accesses denied' });
  }

  if (!professionalId) {
    response.status(401).send({ error: 'accesses denied' });
  }

  next();
};

export default authenticationProfessional;
