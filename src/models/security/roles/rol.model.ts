import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class Rol {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: 'varchar', length: 15, nullable: false })
	name: string;

	@Column({ type: 'varchar', length: 25, nullable: false })
	description: string;

	@Column({ nullable: false })
	status: number;

	@Column({ nullable: false })
	created_on: Date;

	@Column({ nullable: false })
	update_on: Date;
}
