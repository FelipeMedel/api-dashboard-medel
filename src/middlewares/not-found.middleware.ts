export default class NotFoundMiddleware {
	notFound(req, res, next) {
		return res.status(404).send({
			errors: {
				status: 404,
				type: 'Resource not found!',
				message: 'La ruta no se encuentra!.'
			}
		});
	}
}
