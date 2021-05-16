import {UserRepository} from '../../repositories';
import { User } from '../../models';
import {UserInterface} from '../../interfaces';

const dateTime = require('node-datetime');
const bcrypt = require('bcrypt');

const _userRepo = new UserRepository();
const _userData = new UserInterface();
let dt = dateTime.create();

export class UserController {
	constructor() {}

	async getAll(search: any, page: number, pageSize: number) {
		const result = await _userRepo.readUserAll(search, page, pageSize);
		let response: any = [];
		if (result.count > 0) {
			result.data.forEach((user) => {
				response.push(_userData.exportData(user));
			});
		}
		return {
			count: result.count,
			users: response
		};
	}

	async getById(id: number) {
		const result = await _userRepo.readUserById(id);
		let response: any = {};
		if (result !== undefined) {
			response = _userData.exportData(result);
		}
		return response;
	}

	async createUser(data: object) {
		let now = dt.format('Y-m-d H:M:S');
		const hash = bcrypt.hashSync(data['password'], 10);
		const payload = _userData.importData(data);
		payload.password = hash;
		payload.created_on = now;
		payload.update_on = now;
		const response: any = await _userRepo.createUser(payload);
		if (response && response.hasOwnProperty('error')) {
			return response;
		} 
		return _userData.exportSimpleData(response);
	}

	comparePassword(password: string, passDb: string): boolean {
		let response: boolean = false;
		if(bcrypt.compareSync(password, passDb)) {
			response = true;
		} 
		return response;
	}

	async updateUser(id: number, data: Object) {
		let now = dt.format('Y-m-d H:M:S');
		const user = await _userRepo.readUserById(id);
		const payload = _userData.importDataUpdate(user, data);
		//  validar que exista un password para actualizar
		if (data && data.hasOwnProperty('password')) {
			const hash = bcrypt.hashSync(data['password'], 10);
			payload.password = hash;
		}
		payload.update_on = now;
		const result = await _userRepo.updateUserById(id, payload);
		const response: any = {};
		if (result['raw'].affectedRows) {
			response.ok = true;
			response.message = 'Registro actualizado correctamente.';
		} else {
			response.ok = false;
			response.message = 'No fue posible actualizar el registro.';
			response.statusCode = 400;
		}
		return response;
	}

	async updateUserPassword(id: number, password: string) {
		/* TODO: pendiente validar que la contrasela no sea igual a las ultimas
			3 contraseñas utilizadas
		*/

		let now = dt.format('Y-m-d H:M:S');
		const user = await _userRepo.readUserById(id);
		const hash = bcrypt.hashSync(password, 10);
		user.password = hash;
		user.update_on = now;
		const result = await _userRepo.updateUserById(id, user);
		const response: any = {};
		if (result['raw'].affectedRows) {
			response.ok = true;
			response.message = 'Contraseña actualizada correctamente.';
		} else {
			response.ok = false;
			response.message = 'No fue posible actualizar la Contraseña.';
			response.statusCode = 400;
		}
		return response;
	}

	async deleteUser(id: number) {
		const result = await _userRepo.deleteUserById(id);
		const response: any = {};
		if (result['affected']) {
			response.ok = true;
			response.message = 'Registro eliminado correctamente.';
		} else {
			response.ok = false;
			response.message = 'No fue posible eliminar el registro.';
			response.statusCode = 400;
		}
		return response;
	}
}
