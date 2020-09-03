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
    const hash = bcrypt.hashSync(value, 20);
    return hash;
  },
};
@Entity('profile')
export default class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ select: false, transformer: [encryptPassword] })
  password: string;

  @Column()
  contact: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => ProfileType)
  type: ProfileType;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
