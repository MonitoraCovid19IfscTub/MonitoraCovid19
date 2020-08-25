import IPatientRepository from "../repositories/IPatientRepository";
import PatientRepository from "../infra/typeorm/repositories/PatientRepository";

export default class VerifyPatientExist {

	private patientId : string;

	private patientRepository : IPatientRepository;

	constructor (
		patientId: string,
	) {
		this.patientId = patientId;
		this.patientRepository = new PatientRepository();
	}

	async run(): Promise<boolean> {
		const patient = this.patientRepository.findById(this.patientId);
		return patient ? true : false;
	}
}