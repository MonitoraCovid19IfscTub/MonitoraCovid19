import Profile from "@modules/Profile/infra/typeorm/entities/Profile";
import ProfileTypeRepository from "@modules/Profile/infra/typeorm/repositories/ProfiletypeRepository";
import IProfileTypeRepository from "@modules/Profile/repositories/IProfiletypeRepository";
import IPatientCreateDTO from "../dtos/IPatientCreateDTO";
import Patient from "../infra/typeorm/entities/Patient";
import PatientRepository from "../infra/typeorm/repositories/PatientRepository";
import IPatientRepository from "../repositories/IPatientRepository";



export default class CreateANewPatientService {

  private patient : IPatientCreateDTO;
  private profileTypeRepository: IProfileTypeRepository;
  private patientRepository : IPatientRepository;

  constructor( patient : IPatientCreateDTO){
    console.log(patient);
    this.patient = patient;
    this.patientRepository = new PatientRepository();
    this.profileTypeRepository = new ProfileTypeRepository();
  }

  async run(): Promise<Patient> {
    try{
        const profileType = await this.profileTypeRepository.findTypeByName(
          'Patient',
        );
        if (!profileType) {

          throw new Error('profile type not exist');
        }
    const profile = new Profile();
    profile.email = this.patient.email;
    profile.password = this.patient.password;
    profile.contact = this.patient.contact;
    profile.profileType = profileType;

    const patient = new Patient();

    if(this.patient.accompanying){
      patient.accompanyingPerson = this.patient.accompanying.name;
      patient.accompanyingContact = this.patient.accompanying.contact;
    }

    patient.active = true;
    patient.birthDate = new Date(this.patient.birthDate);
    patient.monitoringStart = new Date(this.patient.monitoringStart);
    patient.name = this.patient.name;


    patient.professionalId = this.patient.professionalId;

    patient.address = this.patient.address.street;
    patient.addressNumber = this.patient.address.number;
    patient.addressComplement = this.patient.address.complement;
    patient.postalCode = this.patient.address.postalCode;
    patient.neighborhood = this.patient.address.neighborhood;
    patient.city = this.patient.address.city;
    patient.state = this.patient.address.state;

    patient.profile = profile;


      const patientResponse =  await this.patientRepository.save(patient);
      return patientResponse;

    }catch(err){
      console.log(err);
      throw new Error('Error insert patient in database');
    }

  }


}
