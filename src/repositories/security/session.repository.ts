import { Connection, createConnection, Repository, getConnectionManager, Like } from 'typeorm';
import { Session } from '../../models';
import { ErrorHelper } from '../../helpers/errors.helper';

let _repoSession: Repository<Session> = null;
let _error: ErrorHelper = new ErrorHelper();
let connectionManager = getConnectionManager();
let connection: Connection;

export class SessionRepository {
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
			_repoSession = connection.getRepository(Session);
			const response = await _repoSession.find({
				where: [ { username: username } ]
			});
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async getByToken(token: string) {
		try {
			_repoSession = connection.getRepository(Session);
			const response = await _repoSession.find({
				where: [ { token: token } ]
			});
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async getCount() {
		try {
			_repoSession = connection.getRepository(Session);
			const response = await _repoSession.count();
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async create(data: Session) {
		try {
			_repoSession = connection.getRepository(Session);
			const response = await _repoSession.save(data);
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async readAll(search: string, page: number, pageSize: number) {
		try {
			_repoSession = connection.getRepository(Session);

			const result = await _repoSession
				.createQueryBuilder('sessions')
				.where(
					"username like :sessionSearch",
					{ sessionSearch: `%${search}%` }
				)
				.skip((page - 1) * pageSize)
				.take(pageSize)
				.getMany();

			const count = await _repoSession
				.createQueryBuilder('sessions')
				.where(
					"username like :sessionSearch",
					{ sessionSearch: `%${search}%` }
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

	async readById(id: number) {
		try {
			_repoSession = connection.getRepository(Session);
			const response = await _repoSession.findOne(id);
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async updateById(id: number, data: Session) {
		try {
			_repoSession = connection.getRepository(Session);
			const response = await _repoSession.update({ id: id }, data);
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}

	async deleteById(id: number) {
		try {
			_repoSession = connection.getRepository(Session);
			const response = await _repoSession.delete({ id: id });
			return response;
		} catch (err) {
			console.log(err.message);
			let error = new Error();
			error.message = err.message;
			throw error;
		}
	}
}
