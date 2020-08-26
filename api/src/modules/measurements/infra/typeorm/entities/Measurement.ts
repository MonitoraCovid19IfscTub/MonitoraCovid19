import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import Patient from '@modules/patient/infra/typeorm/entities/Patient';
import Station from '@modules/station/infra/typeorm/entities/Station';

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

  @Column()
  typeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp')
  registeredAt: Date;
}
