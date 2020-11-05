import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('profileType')
export default class ProfileType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
