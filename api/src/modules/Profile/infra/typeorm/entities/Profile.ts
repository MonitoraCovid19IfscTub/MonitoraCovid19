import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity('profile')
export default class Profile {

  @PrimaryGeneratedColumn('uuid')
  id : string;

  @Column()
  email:string;

  @Column()
  password: string

  @Column()
  contact : string;

  @CreateDateColumn()
  creatAt : Date;

  @UpdateDateColumn()
  updateAt :Date;

}

