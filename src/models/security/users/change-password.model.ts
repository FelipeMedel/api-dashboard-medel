import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('changes_password')
export class ChangePassword {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: 'varchar', length: 250, nullable: false, comment: 'dirección ip' })
	ip: string;

	@Column({ type: 'varchar', length: 250, nullable: false, comment: 'contraseña' })
	password: string;

	@Column({ nullable: false, comment: 'estado 1=Activo, 0=Inactivo' })
	status: number;

	@Column({ nullable: false, comment: 'id del usuario' })
	user_id: number;

	@Column({ nullable: false, comment: 'fecha de creación' })
	created_on: Date;

	@Column({ nullable: false, comment: 'fecha de actualización' })
	update_on: Date;
}
