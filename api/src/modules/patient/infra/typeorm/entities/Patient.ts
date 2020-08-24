import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from 'typeorm';

@Entity('patient')
export default class Patient{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	birthDate: Date;

	@Column()
	contact: string;

	@Column()
	address: string;

	@Column()
	addressNumber: number;

	@Column()
	addressComplement: string;

	@Column()
	postalCode: string;

	@Column('timestamp')
	monitoringStart: Date;
	
	@Column()
	accompanyingPerson: string;

	@Column()
	accompanyingContact: string;

	@Column()
	active: boolean;

	@Column()
	professionalId: number;

	@Column()
	neighborhood: string;

	@Column()
	city: string;

	@Column()
	state: string;

	@Column()
  country: string;
    
}