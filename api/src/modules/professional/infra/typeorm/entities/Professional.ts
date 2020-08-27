import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Profile from '@modules/Profile/infra/typeorm/entities/Profile';

@Entity('professional')
export default class Professional {
	@PrimaryGeneratedColumn('uuid')
	id: string;

  @OneToOne(type => Profile,{
    cascade: true
  })
  @JoinColumn()
  perfil: Profile;
}
