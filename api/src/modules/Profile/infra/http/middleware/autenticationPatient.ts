import { Response, NextFunction } from 'express';
import { RequestParams } from '@shared/@types/expressExtendTypes';

const authenticationPatient = (
  request: RequestParams,
  response: Response,
  next: NextFunction,
): void => {
  const { profileId, professionalId, patientId } = request;
  if (!profileId) {
    response.status(401).send({ error: 'Not logged' });
  }
  if (professionalId) {
    response.status(403).send({ error: 'accesses denied' });
  }

  if (!patientId) {
    response.status(401).send({ error: 'accesses denied' });
  }

  next();
};

export default authenticationPatient;
