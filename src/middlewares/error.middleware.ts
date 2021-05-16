import { Request, Response } from 'express';
require('express-async-errors');
export default class ErrorMiddleware {
	errors(err: any, req: Request, res: Response) {
		let httpStatus = 500;
		if (err.hasOwnProperty('status')) {
			httpStatus = err.status;
		}

		return res.status(httpStatus).send({
			errors: {
				status: httpStatus,
				message: err.message || 'Internal Server Error'
			}
		});
	}
}
