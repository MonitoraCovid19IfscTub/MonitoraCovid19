import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import bcrypt from 'bcrypt';
import ProfileType from './ProfileType';

const encryptPassword = {
  from(value: string): string {
    return value;
  },
  to(value: string): string {
    const hash = bcrypt.hashSync(value, 10);
    return hash;
  },
};
@Entity('profile')
export default class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false, transformer: [encryptPassword] })
  password: string;

  @Column()
  contact: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => ProfileType, profileType => profileType.id)
  profileType: ProfileType;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
