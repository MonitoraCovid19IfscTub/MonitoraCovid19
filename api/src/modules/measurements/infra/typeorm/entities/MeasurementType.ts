import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('measurementType')
export default class Measurement {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  type: string;
}
