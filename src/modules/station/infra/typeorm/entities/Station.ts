import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Station')
export default class Station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  active: number;

  @Column()
  measurementInterval: number;
}
