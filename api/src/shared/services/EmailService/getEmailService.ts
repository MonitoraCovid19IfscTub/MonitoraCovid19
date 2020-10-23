import IEmailService from "./IEmailService"
export const getEmailService = (): IEmailService =>{
  return {
    send : (to, templateDir , context)=>true
  }
}
