import jwt from 'jsonwebtoken';
import { secret } from '@config/config.json';

export interface CodedParams {
  profileId: string;
  professionalId?: string;
  patientId?: string;
}
export default class GenerateANewToken {
  private expireIn: number;

  private params: CodedParams;

  constructor(params: CodedParams) {
    const THIRTY_DAYS = 2592000;
    this.expireIn = THIRTY_DAYS;
    this.params = params;
  }

  async run(): Promise<string> {
    return jwt.sign(this.params, secret, {
      expiresIn: this.expireIn,
    });
  }
}
