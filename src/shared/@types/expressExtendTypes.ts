import { Request } from 'express';

export default interface RequestParams extends Request {
  profileId: string;
}
