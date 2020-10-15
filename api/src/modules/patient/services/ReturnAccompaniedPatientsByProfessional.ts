import Professional from "@modules/professional/infra/typeorm/entities/Professional";
import PatientRepository from "../infra/typeorm/repositories/PatientRepository";
import IPatientRepository from "../repositories/IPatientRepository";

export default class ReturnAccompaniedPatientsByProfessional {

  private professional: Professional ;

  private repository: IPatientRepository;

  constructor(professional: Professional) {
    this.professional = professional;

    this.repository = new PatientRepository();
  }

  async run(professional : Professional ){

  }

}
