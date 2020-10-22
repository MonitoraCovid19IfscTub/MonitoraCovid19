import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import Patient from '@modules/patient/infra/typeorm/entities/Patient';
import Station from '@modules/station/infra/typeorm/entities/Station';
import MeasurementType from './MeasurementType';

@Entity('measurements')
export default class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  measurement: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => Station, stationId => stationId.id, {})
  station: Station;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => Patient, patientId => patientId.measurements, {})
  patient: Patient;

  @ManyToOne(type => MeasurementType, measurementType => measurementType.id)
  type: MeasurementType;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp')
  registeredAt: Date;
}
