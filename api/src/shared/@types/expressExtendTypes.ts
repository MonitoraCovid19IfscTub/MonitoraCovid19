import { Request } from 'express';

export interface RequestParams extends Request {
  profileId: string;
}
