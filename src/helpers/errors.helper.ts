import { Request, response, Response, Express } from 'express';

export class ErrorHelper {
	INTERNAL_SERVER_ERROR_RES(res: Response, err: any) {
		console.log(err);
		
		res.status(500).json({
			error: 'InternalServerError',
			status: 500,
			message: err.message
		});
	}

	INTERNAL_SERVER_ERROR(res: Response,message: string, type?: string) {
		let status = type ? 400 : 500;
		res.status(status).json({
			error: type ? type : 'InternalServerError',
			status: status,
			message: message
		});
	}
}
