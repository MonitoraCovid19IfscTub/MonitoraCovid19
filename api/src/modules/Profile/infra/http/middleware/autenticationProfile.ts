import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestParams } from '@shared/@types/expressExtendTypes';
import { secret } from '@config/config.json';

import {} from ''

const authenticationProfile = (
  request: RequestParams,
  response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(401).send({ error: 'No Token Provided' });
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    response.status(401).send({ error: 'Header invalid' });
    return;
  }

  const [schema, token] = parts;
  if (/^Bearer$/i.test(schema)) {
    response.status(401).send({ error: 'Token malformed' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      response.status(401).send({ error: 'Token invalid' });
      return;
    }
    const {profileId,professionalId,patientId} = decoded;

    request.profileId = profileId;
    request.professionalId = professionalId;
    request.patientId = patientId;

    next();
  });
};

export default authenticationProfile;
