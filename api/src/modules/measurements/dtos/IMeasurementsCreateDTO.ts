import Station from '@modules/station/infra/typeorm/entities/Station';
import Patient from '@modules/patient/infra/typeorm/entities/Patient';

export default interface IMeasurementsCreateDTO {
  value: number;
  registeredAt: Date;
  stationId: Station;
  patientId: Patient;
  typeId: number;
}
