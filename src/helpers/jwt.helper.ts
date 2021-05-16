const { sign } = require('jsonwebtoken');
const JWT_SECRET = 'F3lip3K3y';
const JWT_REFRESH_SECRET = 'F3lip3K3yR3fR3SH';

export default class JWToken {
	generateToken(user) {
		return sign(
			{
				user
			},
			JWT_SECRET,
			{
				expiresIn: '3h'
			}
		);
	}

	generateRefreshToken(user) {
		return sign(
			{
				user
			},
			JWT_REFRESH_SECRET,
			{
				expiresIn: '3h'
			}
		);
	}
}
