import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,ManyToMany
} from 'typeorm';
import Measurement from '@modules/measurements/infra/typeorm/entities/Measurement';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import Professional from '@modules/professional/infra/typeorm/entities/Professional';

@Entity('patient')
export default class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  birthDate: Date;


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
  neighborhood: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column()
  profileId: string;

  @OneToOne(() => Profile, {
    cascade: true,
  })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;

  @OneToMany(type => Measurement, measurement => measurement.patient)
  measurements: Measurement[];

  @ManyToMany(type => Professional, professionals => professionals.patients,{nullable: false})
  professionals: Professional[];
}
