import Professional from "@modules/professional/infra/typeorm/entities/Professional";
import PatientRepository from "../../patient/infra/typeorm/repositories/PatientRepository";
import IPatientRepository from "../../patient/repositories/IPatientRepository";
import ProfessionalRepository from "../infra/typeorm/repositories/ProfessionalRepository";
import IProfessionalRepository from "../repositories/IProfessionalRepository";

export default class ReturnAccompaniedPatientsByProfessional {

  private professional: Professional;

  private repository: IProfessionalRepository;

  constructor(professional: Professional) {
    this.professional = professional;

    this.repository = new ProfessionalRepository();
  }


  async run(){
    return this.repository.findPatientsRelations(this.professional)
  }

}
