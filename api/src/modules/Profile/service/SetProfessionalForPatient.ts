import Patient from "@modules/patient/infra/typeorm/entities/Patient";
import Professional from "@modules/professional/infra/typeorm/entities/Professional";

export default class SetProfessionalForPatient{

  private professional : Professional;
  private patient : Patient;
  constructor(professional: Professional,patient: Patient){
    this.professional = professional;
    this.patient = patient;

  }
  async run():Promise<boolean>{


  }
}
