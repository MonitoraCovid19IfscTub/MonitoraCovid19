import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';

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
}
