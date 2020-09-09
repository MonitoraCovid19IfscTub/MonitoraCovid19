import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('occupation')
export default class Occupation {
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @Column()
  name: string;
}
