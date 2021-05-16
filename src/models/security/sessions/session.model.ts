import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('sessions')
export class Session {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: 'varchar', length: 20, unique: true, comment: 'Usuario logueado' })
	username: string;

	@Column({ type: 'varchar', length: 40, default: '', nullable: true, comment: 'IP de acceso' })
	ip: string;

	@Column({ type: 'varchar', length: 25, nullable: true, comment: 'identificador de la instancia del cliente' })
	instance: string;

	@Column({ type: 'varchar', length: 250, nullable: false, comment: 'Token de sesión' })
	token: string;

	@Column({ type: 'varchar', length: 250, nullable: false, comment: 'Token para refrescar el token de sesión' })
	refresh_token: string;

	@Column({ nullable: false, comment: 'Fecha de creación' })
	created_on: Date;

	@Column({ nullable: false, comment: 'Fecha de actualización' })
	update_on: Date;
}
