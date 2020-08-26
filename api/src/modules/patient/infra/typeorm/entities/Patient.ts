import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Measurement from '@modules/measurements/infra/typeorm/entities/Measurement';

@Entity('patient')
export default class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  addressNumber: number;

  @Column({ nullable: true })
  addressComplement: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column({ type: 'timestamp', nullable: true })
  monitoringStart: Date;

  @Column({ nullable: true })
  accompanyingPerson: string;

  @Column({ nullable: true })
  accompanyingContact: string;

  @Column({ nullable: true })
  active: boolean;

  @Column({ nullable: true })
  professionalId: number;

  @Column({ nullable: true })
  neighborhood: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Measurement, measurement => measurement.patient)
  measurements: Measurement[];
}
