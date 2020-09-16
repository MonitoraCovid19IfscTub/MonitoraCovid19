import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';
import Patient from '@modules/patient/infra/typeorm/entities/Patient';

@Entity('professional')
export default class Professional {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne(type => Profile, {
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;

  @ManyToMany(type => Patient, patients => patients.professionals)
  @JoinTable()
  patients: Patient[];
}
