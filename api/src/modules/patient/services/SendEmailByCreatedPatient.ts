import HasProfileByEmailService from "@modules/Profile/service/HasProfileByEmailService";
import { getEmailService } from "@shared/services/EmailService/getEmailService";
import IEmailService from "@shared/services/EmailService/IEmailService";
import Patient from "../infra/typeorm/entities/Patient";


export default class SendEmailByCreatedPatient{
  private sendEmail : IEmailService;
  private patient : Patient;

  constructor(patient : Patient){
     this.patient = patient;
     this.sendEmail = getEmailService();
  }

}
