import {
	Entity,
	Column,
	PrimaryColumn,
	CreateDateColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ocupation')
export default class Ocupation {
	@PrimaryGeneratedColumn('rowid')
	id: string;

  @Column()
  name: string;
}
