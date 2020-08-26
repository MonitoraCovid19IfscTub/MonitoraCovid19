import IMeasurementCreateDTO from '@modules/measurements/dtos/IMeasurementsCreateDTO';
import StationRepository from '@modules/station/infra/typeorm/repositories/StationRepository';
import Station from '@modules/station/infra/typeorm/entities/Station';
import Patient from '@modeles/patient/infra/typeorm/entities/Patient';
import IPatientRepository from '@modules/patient/repositories/IPatientRepository';
import IStationRepository from '@modules/station/repository/IStationRepository';
import PatientRepository from '@modules/patient/infra/typeorm/repositories/PatientRepository';
import MeasurementsRepository from '../infra/typeorm/repositories/MeasurementsRepository';
import IMeasurementsRepository from '../repositories/IMeasurementsRepository';
import IMeasurementTypesRepository from '../repositories/IMeasurementTypesRepository';
import MeasurementTypesRepository from '../infra/typeorm/repositories/MeasurementTypes';

export default class CreateANewMeasurementService {
  private patientId: string;

  private stationId: string;

  private measurement: IMeasurementCreateDTO;

  constructor(
    patientId: string,
    stationId: string,
    measurement: IMeasurementCreateDTO,
  ) {
    this.measurement = measurement;
    this.patientId = patientId;
    this.stationId = stationId;
  }

  async run(): Promise<void> {
    // pega o tipo no banco

    // Patient Service return Patient
    const patientRepository: IPatientRepository = new PatientRepository();
    const patient = await patientRepository.findById(this.patientId);

    // Station Service Return Station
    const stationRepository: IStationRepository = new StationRepository();
    const station = await stationRepository.findById(this.stationId);

    const measuramentTypesRepository: IMeasurementTypesRepository = new MeasurementTypesRepository();

    const measuramentType = await measuramentTypesRepository.findById(
      this.measurement.typeId,
    );
    if (!measuramentType) {
      throw new Error('type measurament not exist');
    }
    const { value, registeredAt, typeId } = this.measurement;

    const measurementRepository: IMeasurementsRepository = new MeasurementsRepository();
    measurementRepository.create({
      value,
      patient,
      station,
      registeredAt,
      typeId,
    });
  }
}
