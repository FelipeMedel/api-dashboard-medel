import { ChangePassword } from '../../models';


export class ChangePasswordInterface {
	importData(data: object): ChangePassword {
		const session = new ChangePassword();
        session.ip = data['ip'];
        session.user_id = data['userId'];
        session.password = data['password'];
        session.status = data['status'];
		return session;
	}

	exportData(data: ChangePassword): object {
		return {
			id: data.id,
			userId: data.user_id,
			password: data.password,
            ip: data.ip,
            status: data.status,
            creationDate: data.created_on
		};
	}

	exportSimpleData(data: ChangePassword): object {
		return {
			id: data.id,
			userId: data.user_id,
			password: data.password,
		};
	}
}
