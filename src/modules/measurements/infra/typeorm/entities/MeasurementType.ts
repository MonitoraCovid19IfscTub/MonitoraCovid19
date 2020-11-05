import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Measurement from './Measurement';

@Entity('measurementType')
export default class MeasurementType {

  @PrimaryGeneratedColumn('rowid')
  @OneToMany(type => Measurement,measurement=> measurement.type,{cascade: true})
  @JoinColumn()
  id: number;

  @Column()
  name: string;
}
