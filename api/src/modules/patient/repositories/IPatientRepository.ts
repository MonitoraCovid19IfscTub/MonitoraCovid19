import Patient from "../infra/typeorm/entities/Patient";


export default interface IPatientRepository {
	findById(patientId: string):Promise<Patient>;
}