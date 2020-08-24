import IPatientRepository from "../../../repositories/IPatientRepository";
import Patient from "../entities/Patient";
import { Repository, getRepository } from "typeorm";


export default class PatientRepository implements IPatientRepository {
	
	private repository : Repository<Patient>;

	constructor() {
		this.repository = getRepository(Patient);
	}
  
	findById(patientId: string):Promise<Patient> {
		return this.repository.findOne(patientId);
	}
}

