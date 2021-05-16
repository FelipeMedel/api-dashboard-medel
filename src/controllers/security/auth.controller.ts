import {UserRepository} from '../../repositories';
import JWToken from '../../helpers/jwt.helper';
import { SessionController } from './session.controller';

const _userRepo = new UserRepository();
const jwToken = new JWToken();
const _sessionCtrl = new SessionController();

export default class AuthController {
	constructor() {}

	async login(username: string, password: string) {
		const resp = await _userRepo.getUsername(username);
		if (resp.length === 0) {
			const result = {
				message: 'Las credenciales ingresadas no son correctas.',
				statusCode: 200,
				ok: false
			};
			return result;
		}

		// consultamos si exite una sessión de usuario creada
		const isLogin = await _sessionCtrl.getByUsername(resp[0].username);
		
		let response: any = {};
		if (isLogin.length >= 1) {
			response = {
				isLogin: true,
				error: 'isLogin',
				message: 'El usuario ya inicio sesión en la aplicación.',
				statusCode: 200
			};
		} else {
			const userToEncode = {
				email: resp[0].email,
				id: resp[0].id
			};
			
			const token = jwToken.generateToken(userToEncode);
			const refreshToken = jwToken.generateRefreshToken(userToEncode);
			const payload = {
				username: resp[0].username,
				token: refreshToken,
				refreshToken: refreshToken,
				ip: '',
				instance: '12345678'
			};
			// creamos la session para el usuario que se loguea
			const session = await _sessionCtrl.createSession(payload);
			response = {
				token,
				refreshToken,
				type: 'Bearer',
				expireInMin: 180,
				user: {
					id: resp[0].id,
					fullName: resp[0].first_name + ' ' + resp[0].last_name,
					username: resp[0].username,
					email: resp[0].email,
					state: resp[0].status ? true : false
				}
			};
		}
		
		return response;
	}

	async tokenRefresh(username: string, tokenRefresh: string){
		// validamos que exista el usuario
		const resp = await _userRepo.getUsername(username);
		if (resp.length === 0) {
			const result = {
				message: `El usuario ${username} no existe.`,
				statusCode: 200,
				ok: false
			};
			return result;
		}
		// validamos que exista una sesión
		const isLogin = await _sessionCtrl.getByUsername(username);
		if (isLogin.length === 0) {
			const result = {
				message: `No fue posible refrescar el token para el usuario ${username}, no cuenta con una sesión activa.`,
				statusCode: 200,
				ok: false
			};
			return result;
		}
		let session = isLogin[0]
		
		if(tokenRefresh !== session.refreshToken){
			const result = {
				message: `Credenciales no validas`,
				statusCode: 200,
				ok: false
			};
			return result;
		}

		const userToEncode = {
			email: resp[0].email,
			id: resp[0].id
		};
		
		const token = jwToken.generateToken(userToEncode);
		const refreshToken = jwToken.generateRefreshToken(userToEncode);
		session.token = token;
		session.refreshToken = refreshToken;
		const sessionUpdate = await _sessionCtrl.updateSession(session.id, session);

		let response = {
			token,
			refreshToken,
			type: 'Bearer',
			expireInMin: 180,
			user: {
				id: resp[0].id,
				fullName: resp[0].first_name + ' ' + resp[0].last_name,
				username: resp[0].username,
				email: resp[0].email,
				state: resp[0].status ? true : false
			}
		};
		return response;

	}

	async recoveryPassword(email: string) {}

	async updatePassword(email: string, newPassword: string) {}

	async logout(username: string) {
		const result = await _sessionCtrl.getByUsername(username);
		let response: any = {};
		if (result.length >= 1) {
			response = await _sessionCtrl.deleteSession(result[0].id);
		} else {
			response = {
				ok: false,
				message: `El usuario ${username}, no tiene sesiones iniciadas.`,
				statusCode: 200
			}
		}
		return response;
		
	}
}
