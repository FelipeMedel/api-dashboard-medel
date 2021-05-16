import { Request, Response } from 'express';
import { ErrorHelper } from '../../helpers/errors.helper';
import { UserController } from '../../controllers';
import {ValidateData, StatusResponse} from '../../utils';

const _userController = new UserController();
const _error = new ErrorHelper();
const _utils = new ValidateData();
const _statusRes = new StatusResponse();

const getAll = async (req: Request, res: Response) => {
	try {
		const { search, page, pageSize } = req.query;

		const response = await _userController.getAll(search, Number(page), Number(pageSize));
		res.status(_utils.validateStatusCode(response)).json({ data: response });
	} catch (err) {
		_error.INTERNAL_SERVER_ERROR(res, err.message, 'READ');
	}
};

const getbyId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const response = await _userController.getById(Number(id));
		res.status(_utils.validateStatusCode(response)).json({ data: response });
	} catch (err) {
		console.log(err.message);
		_error.INTERNAL_SERVER_ERROR(res, err.message, 'READBYID');
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const response = await _userController.createUser(data);
		let status = _utils.validateStatusCode(response);
		if (status === 200) {
			status = 201;
		}
		res.status(status).json(_statusRes.typeResponseByStatus(status, response));
	} catch (err) {
		_error.INTERNAL_SERVER_ERROR(res, err.message, 'CREATE');
	}
};

const update = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = req.body;
		const response = await _userController.updateUser(Number(id), data);
		res.status(200).json({ data: response });
	} catch (err) {
		console.log(err.message);
		_error.INTERNAL_SERVER_ERROR(res, err.message, 'UPDATE');
	}
};

const changePassword = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { password } = req.body;
		const response = await _userController.updateUserPassword(Number(id), password);
		res.status(200).json({ data: response });
	} catch (err) {
		console.log(err.message);
		_error.INTERNAL_SERVER_ERROR(res, err.message, 'UPDATE');
	}
};

const deleteById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const response = await _userController.deleteUser(Number(id));
		res.status(200).json({ data: response });
	} catch (err) {
		console.log(err.message);
		_error.INTERNAL_SERVER_ERROR(res, err.message, 'DELETE');
	}
};

export default {
	getAll,
	getbyId,
	create,
	update,
	changePassword,
	deleteById
};
