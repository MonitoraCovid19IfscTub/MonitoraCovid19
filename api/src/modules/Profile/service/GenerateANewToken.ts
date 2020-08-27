
import jwt from 'jsonwebtoken'
import {secret} from '@config/config.json'

export default class GenerateANewToken {

  private expireIn : number;
  private params : object;

  constructor(params : object){

    const THIRTY_DAYS  = 2592000;
    this.expireIn = THIRTY_DAYS;
    this.params = params;
  }

  async run(){
    return jwt.sign(this.params,secret,{
      expiresIn : this.expireIn
    })
  }
}
