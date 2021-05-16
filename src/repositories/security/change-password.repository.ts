import { Connection, createConnection, Repository, getConnectionManager, Like } from 'typeorm';
import { ChangePassword } from '../../models';
import { ErrorHelper } from '../../helpers/errors.helper';

let _repoChangePass: Repository<ChangePassword> = null;
let _error: ErrorHelper = new ErrorHelper();
let connectionManager = getConnectionManager();
let connection: Connection;

export class ChangePasswordRepository {
	constructor() {
		(async () => {
			if (!connectionManager.has('default')) {
				connection = await createConnection();
			} else {
				connection = connectionManager.get();
			}
		})();
	}

	async createUser(data: ChangePassword) {
		try {
			_repoChangePass = connection.getRepository(ChangePassword);
			const response = await _repoChangePass.save(data);
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async readAllByUserId(userId: number, quantity: number) {
		try {
			_repoChangePass = connection.getRepository(ChangePassword);

			const result = await _repoChangePass
				.createQueryBuilder('changes_password')
				.where(
					{ user_id:  userId}
				)
				.skip((1 - 1) * quantity)
				.take(quantity)
				.getMany();

			return {
				data: result
			};
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async readById(id: number) {
		try {
			_repoChangePass = connection.getRepository(ChangePassword);
			const response = await _repoChangePass.findOne(id);
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async updateUserById(userId: number, data: ChangePassword) {
		try {
			_repoChangePass = connection.getRepository(ChangePassword);
			const response = await _repoChangePass.update({ user_id: userId, status: 1 }, data);
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async deleteId(id: number) {
		try {
			_repoChangePass = connection.getRepository(ChangePassword);
			const response = await _repoChangePass.delete({ id: id });
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}
}
