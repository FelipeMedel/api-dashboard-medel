import { ChangePasswordRepository } from '../../repositories';
import { ChangePassword } from '../../models';
import {ChangePasswordInterface} from '../../interfaces';

const dateTime = require('node-datetime');

const _changePassRepo = new ChangePasswordRepository();
const _changePassInt = new ChangePasswordInterface();
let dt = dateTime.create();

export class ChangePasswordController {
	constructor() {}

	async getAll(userId: number, quantity: number) {
		const result = await _changePassRepo.readAllByUserId(userId, quantity);
		let response: any = [];
		return result
	}

	async getById(id: number) {
		const result = await _changePassRepo.readById(id);
		let response: any = {};
		if (result !== undefined) {
			response = _changePassInt.exportData(result);
		}
		return response;
	}

	async createChangePass(data: object) {
        let now = dt.format('Y-m-d H:M:S');
        /* TODO: pendiente consultar todos los anteriores cambios 
            validar que la contraseña no sea igual a las 3 anteriores
            inactivar los registros que esten activos
        */
        data['status'] = 1;
		const payload = _changePassInt.importData(data);
		payload.created_on = now;
		payload.update_on = now;
		const response = await _changePassRepo.createUser(payload);
		return _changePassInt.exportSimpleData(response);
	}

	async updateByUserId(userId: number, data: ChangePassword) {
		let now = dt.format('Y-m-d H:M:S');
		data.update_on = now;
		const result = await _changePassRepo.updateUserById(userId, data);
		const response: any = {};
		if (result['raw'].affectedRows) {
			response.ok = true;
			response.message = 'Registro actualizado correctamente.';
		} else {
			response.ok = false;
			response.message = 'No fue posible actualizar el registro.';
		}
		return response;
	}

	async deleteUser(id: number) {
		const result = await _changePassRepo.deleteId(id);
		const response: any = {};
		if (result['affected']) {
			response.ok = true;
			response.message = 'Registro eliminado correctamente.';
		} else {
			response.ok = false;
			response.message = 'No fue posible eliminar el registro.';
		}
		return response;
	}
}
