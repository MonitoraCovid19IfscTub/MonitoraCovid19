import { Response, NextFunction } from 'express';
import { RequestParams } from '@shared/@types/expressExtendTypes';
import IProfileRepository from '@modules/Profile/repositories/IProfileRepository';
import ProfileRepository from '../../typeorm/repositories/ProfileRepository';

const authenticationProfessional = (
  request: RequestParams,
  response: Response,
  next: NextFunction,
): void => {
  const { profileId } = request;
  if (!profileId) {
    response.status(401).send({ error: 'Not logged' });
  }
  const profileRepository: IProfileRepository = new ProfileRepository();
  profileRepository
    .findProfileAndTypeProfileById(profileId)
    .then(profile => {
      if (!profile) {
        return response.status(403).send({ error: 'profile not exist' });
      }

      if (profile.profileType.name === 'Patient') {
        return response.status(403).send({ error: 'accesses denied' });
      }
      if (profile.profileType.name === 'Professional') {
        return next();
      }
      return response.status(403).send({ error: 'accesses denied' });
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch(err => {
      console.log(err);
      response
        .status(500)
        .send({ error: 'error in processes profile, try again' });
    });
};

export default authenticationProfessional;
