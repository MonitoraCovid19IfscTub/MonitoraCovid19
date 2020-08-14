import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('measurements')
export default class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  measurement: number;

  @Column()
  stationId: string;

  @Column()
  patientId: string;

  @Column()
  typeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp')
  registeredAt: Date;
}
