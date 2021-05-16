import { Request, Response } from 'express';
import AuthController from '../../controllers/security/auth.controller';
import { ErrorHelper } from '../../helpers/errors.helper';
import {ValidateData, StatusResponse} from '../../utils';

const _authController = new AuthController();
const _error = new ErrorHelper();
const _utils = new ValidateData();
const _status = new StatusResponse();

const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const response = await _authController.login(username, password);
		const status = _utils.validateStatusCode(response);
		res.status(status).json(_status.typeResponseByStatus(status, response));
	} catch (err) {
		_error.INTERNAL_SERVER_ERROR(res, err.message, 'LOGIN');
	}
};

const tokenRefresh = async (req: Request, res: Response) => {
	try {
		const { username, refreshToken } = req.body;
		const response = await _authController.tokenRefresh(username, refreshToken);
		const status = _utils.validateStatusCode(response);
		res.status(status).json(_status.typeResponseByStatus(status, response));
	} catch (err) {
		_error.INTERNAL_SERVER_ERROR(res, err.message, 'LOGIN');
	}
}

const recoveryPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.params;
		const response = await _authController.recoveryPassword(email);
		// const status = _utils.validateStatusCode(response);
		// res.status(status).json(_status.typeResponseByStatus(status, response));
		res.status(200).json({});
	} catch (err) {
		_error.INTERNAL_SERVER_ERROR(res, err.message, 'RECOVERYPASS');
	}
};

const updatePassword = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const response = await _authController.updatePassword(email, password);
		//const status = _utils.validateStatusCode(response);
		//res.status(status).json(_status.typeResponseByStatus(status, response));
		res.status(200).json({});
	} catch (err) {
		_error.INTERNAL_SERVER_ERROR(res, err.message, 'UPDATEPASS');
	}
};

const logout = async (req: Request, res: Response) => {
	try {
		const { username } = req.body;
		const response = await _authController.logout(username);
		const status = _utils.validateStatusCode(response);
		res.status(status).json(_status.typeResponseByStatus(status, response));
	} catch (err) {
		_error.INTERNAL_SERVER_ERROR(res, err.message, 'LOGOUT');
	}
};

export default {
	login,
	tokenRefresh,
	recoveryPassword,
	updatePassword,
	logout
	
}
