import { SessionController, UserController } from '../controllers';
const jwt = require('jsonwebtoken');
require('express-async-errors');

const _sessionCtrl = new SessionController();
const _userCtrl = new UserController();

export default class AuthMiddleware {
	getToken(req, res, next) {
		let token = req.headers['authorization'];
		
		if (!token) {
			const error = new Error();
			error['status'] = 403;
			error.message = 'Se debe enviar el token.';
			throw error;
		}

		token = token.replace('Bearer ', '');
		token = token.replace('bearer ', '');
		
		jwt.verify(token, 'F3lip3K3y', (err, decodedToken) => {
			if (err) {
				const error = {
					status: 401,
					type: 'Unauthorized',
				 	message: 'Token no valido.'
				}
				res.status(error.status).send({error: error})
				return
			}
			
			// validamos que el token este agregado en la session
			_sessionCtrl.getSessionByToken(token)
			.then((data: any) => {
				if (data === false) {
					const error = {
						status: 403,
						type: 'Forbidden',
						message: 'No tienes permisos para realizar esta petición.'
					}
					res.status(error.status).send({error: error})
					return
				} else {
					req.user = decodedToken.user;
					next();
				}
			}).catch((err: any) => {
				const error = {
					status: 403,
					type: 'Forbidden',
					message: err.message
				}
				res.status(error.status).send({error: error})
				return
			})
		});
	}
}
