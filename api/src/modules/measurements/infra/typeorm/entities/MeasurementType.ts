import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('measurementType')
export default class MeasurementType {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  type: string;
}
