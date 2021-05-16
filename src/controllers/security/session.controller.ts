import { Session } from '../../models';
import {SessionInterface} from '../../interfaces';
import {SessionRepository} from '../../repositories';

const _sessionData = new SessionInterface();
const dateTime = require('node-datetime');

const _sessionRepo = new SessionRepository();
let dt = dateTime.create();

export class SessionController {
	constructor() {}

	async getAll(search: any, page: number, pageSize: number) {
		const result = await _sessionRepo.readAll(search, page, pageSize);
		let response: any = [];
		if (result.count > 0) {
			result.data.forEach((user) => {
				response.push(_sessionData.exportData(user));
			});
		}
		return {
			count: result.count,
			users: response
		};
	}

	async getById(id: number) {
		const result = await _sessionRepo.readById(id);
		let response: any = [];
		if (result !== undefined) {
			response = _sessionData.exportData(result);
		}
		return response;
    }
    
    async getByUsername(username: string) {
		const result = await _sessionRepo.getUsername(username);
		let response: any = [];
		if (result !== undefined && result.length > 0) {
            result.forEach(item => {
                response.push(_sessionData.exportData(item));
            });
		}
		return response;
	}

	async getSessionByToken(token: string) {
		const result = await _sessionRepo.getByToken(token);
		let response: boolean = false;
		if (result !== undefined && result.length > 0) {
            response = true;
		}
		return response;
	}

	async createSession(data: object) {
		let now = dt.format('Y-m-d H:M:S');
		const payload = _sessionData.importData(data);
		payload.created_on = now;
		payload.update_on = now;
		const response = await _sessionRepo.create(payload);
		return _sessionData.exportSimpleData(response);
	}

	async updateSession(id: number, data: []) {
		let now = dt.format('Y-m-d H:M:S');
		const payload = _sessionData.importUpdateData(data);
		payload.update_on = now;
		const result = await _sessionRepo.updateById(id, payload);
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

	async deleteSession(id: number) {
		const result = await _sessionRepo.deleteById(id);
		const response: any = {};
		if (result['affected']) {
			response.ok = true;
			response.message = 'La sessión se eliminó correctamente.';
		} else {
			response.ok = false;
			response.message = 'No fue posible eliminar la sesión.';
		}
		return response;
	}
}
