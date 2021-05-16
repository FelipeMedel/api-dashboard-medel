import { Session } from '../../models';


export class SessionInterface {
	importData(data: object): Session {
		const session = new Session();
        session.username = data['username'];
        session.instance = data['instance'];
        session.ip = data['ip'];
        session.token = data['token'];
        session.refresh_token = data['refreshToken'];
		return session;
	}

	importUpdateData(data: Object): Session {
		const session = new Session();
		if (data.hasOwnProperty('username')) {
			session.username = data['username'];
		}
		if (data.hasOwnProperty('instance')) {
			session.instance = data['instance'];
		}
		if (data.hasOwnProperty('ip')) {
			session.ip = data['ip'];
		}
		if (data.hasOwnProperty('token')) {
			session.token = data['token'];
		}
		if (data.hasOwnProperty('refreshToken')) {
			session.refresh_token = data['refreshToken'];
		}
		return session;
	}

	exportData(data: Session): object {
		return {
			id: data.id,
			username: data.username,
			token: data.token,
			refreshToken: data.refresh_token,
			ip: data.ip,
            instance: data.instance,
            createAt: data.created_on
		};
	}

	exportSimpleData(data: Session): object {
		return {
			id: data.id,
			username: data.username
		};
	}
}
