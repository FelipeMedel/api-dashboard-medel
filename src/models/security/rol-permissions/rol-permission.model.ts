import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rol_permissions')
export class RolPermission {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: 'int', nullable: false })
	option_id: number;

	@Column({ type: 'int', nullable: false })
	rol_id: number;

	@Column({ type: 'int', nullable: false })
	create: number;

	@Column({ type: 'int', nullable: false })
	read: number;

	@Column({ type: 'int', nullable: false })
	update: number;

	@Column({ type: 'int', nullable: false })
	delete: number;

	@Column({ nullable: false })
	created_on: Date;

	@Column({ nullable: false })
	update_on: Date;
}
