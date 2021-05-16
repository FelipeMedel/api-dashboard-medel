import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: 'varchar', length: 20, nullable: false })
	first_name: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	second_name: string;

	@Column({ type: 'varchar', length: 20, nullable: false })
	last_name: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	maiden_name: string;

	@Column({ type: 'varchar', length: 50, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 10, nullable: true })
	phone: string;

	@Column({ type: 'longtext', nullable: true })
	photo: string;

	@Column({ type: 'varchar', length: 20, unique: true })
	username: string;

	@Column({ type: 'varchar', length: 250, nullable: false })
	password: string;

	@Column({ nullable: false })
	status: number;

	@Column({ nullable: false })
	rol_id: number;

	@Column({ nullable: false })
	created_on: Date;

	@Column({ nullable: false })
	update_on: Date;
}
