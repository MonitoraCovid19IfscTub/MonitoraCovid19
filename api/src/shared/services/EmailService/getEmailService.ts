import { json } from "express"
import { stringify } from "querystring"
import IEmailService from "./IEmailService"
export const getEmailService = (): IEmailService =>{
  return {
    send : (to, templateDir , context)=>{
      console.log(`Email enviado para ${to} com os dados  ${stringify(context)}`);
      return true}
  }
}
