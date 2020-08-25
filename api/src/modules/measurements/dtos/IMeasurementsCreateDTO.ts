export default interface IMeasurementsCreateDTO {
  measurement: number;
  registeredAt: Date;
  stationId: string;
  patientId: string;
  typeId: number;
}
