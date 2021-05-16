export class ValidateData {
	validateStatusCode(data: object): number {
		/*
            Description: Valida si existe un statusCode en el objecto
            Return: number - el status code de la petición
        */
		let status = 200;
		if (data && data.hasOwnProperty('statusCode')) {
			status = data['statusCode'];
		}
		return status;
	}
}
