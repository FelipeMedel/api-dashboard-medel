import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('permissions')
export class Permission {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: 'int', nullable: false })
	option_id: number;

	@Column({ type: 'int', nullable: true })
	parent_id: number;

	@Column({ type: 'varchar', length: 50, nullable: false })
	name_permit: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	description: string;

	@Column({ nullable: false })
	status: number;

	@Column({ nullable: false })
	created_on: Date;

	@Column({ nullable: false })
	update_on: Date;
}
