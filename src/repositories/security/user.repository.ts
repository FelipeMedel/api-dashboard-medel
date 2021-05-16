import { Connection, createConnection, Repository, getConnectionManager, Like } from 'typeorm';
import { User } from '../../models';
import { ErrorHelper } from '../../helpers/errors.helper';

let _repoUser: Repository<User> = null;
let _error: ErrorHelper = new ErrorHelper();
let connectionManager = getConnectionManager();
let connection: Connection;

export  class UserRepository {
	constructor() {
		(async () => {
			if (!connectionManager.has('default')) {
				connection = await createConnection();
			} else {
				connection = connectionManager.get();
			}
		})();
	}

	async getUsername(username: string) {
		try {
			_repoUser = connection.getRepository(User);
			const user = await _repoUser.find({
				where: [ { email: username }, { username: username } ]
			});
			return user;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async getCount() {
		try {
			_repoUser = connection.getRepository(User);
			const response = await _repoUser.count();
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async createUser(data: User) {
		try {
			_repoUser = connection.getRepository(User);
			const response = await _repoUser.save(data);
			return response;
		} catch (err) {
			// console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async readUserAll(search: string, page: number, pageSize: number) {
		try {
			_repoUser = connection.getRepository(User);

			const result = await _repoUser
				.createQueryBuilder('users')
				.where(
					"concat(first_name, ' ', second_name, ' ', last_name, ' ', maiden_name , ' ', email, ' ', username, ' ', phone) like :userSearch",
					{ userSearch: `%${search}%` }
				)
				.skip((page - 1) * pageSize)
				.take(pageSize)
				.getMany();

			const count = await _repoUser
				.createQueryBuilder('users')
				.where(
					"concat(first_name, ' ', second_name, ' ', last_name, ' ', maiden_name , ' ', email, ' ', username, ' ', phone) like :userSearch",
					{ userSearch: `%${search}%` }
				)
				.getCount();

			return {
				count: count,
				data: result
			};
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async readUserById(id: number) {
		try {
			_repoUser = connection.getRepository(User);
			const response = await _repoUser.findOne(id);
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async updateUserById(id: number, data: User) {
		try {
			_repoUser = connection.getRepository(User);
			const response = await _repoUser.update({ id: id }, data);
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async deleteUserById(id: number) {
		try {
			_repoUser = connection.getRepository(User);
			const response = await _repoUser.delete({ id: id });
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}
}
