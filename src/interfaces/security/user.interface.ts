import { User } from '../../models';

export  class UserInterface {
	importData(data: object): User {
		const user = new User();
		user.first_name = data['firstName'];
		user.second_name = data['secondName'];
		user.last_name = data['lastName'];
		user.maiden_name = data['maidenName'];
		user.email = data['email'];
		user.username = data['username'];
		user.photo = data['photo'];
		user.phone = data['phone'];
		user.status = data['status'] ? 1 : 0;
		user.password = data['password'];
		user.rol_id = data['rolId'];
		return user;
	}

	importDataUpdate(user: User, data: Object): User {
		user.first_name = data['firstName'];
		user.second_name = data['secondName'];
		user.last_name = data['lastName'];
		user.maiden_name = data['maidenName'];
		user.email = data['email'];
		user.username = data['username'];
		user.photo = data['photo'];
		user.phone = data['phone'];
		user.status = data['status'] ? 1 : 0;
		user.password = data['password'];
		user.rol_id = data['rolId'];
		return user;
	}

	exportData(data: User): object {
		return {
			id: data.id,
			firstName: data.first_name,
			secondName: data.second_name,
			lastName: data.last_name,
			maidenName: data.maiden_name,
			email: data.email,
			username: data.username,
			photo: data.photo,
			phone: data.phone,
			status: data.status ? true : false,
			rolId: data.rol_id
		};
	}

	exportSimpleData(data: User): object {
		return {
			id: data.id,
			firstName: data.first_name,
			secondName: data.second_name,
			lastName: data.last_name,
			maidenName: data.maiden_name,
			email: data.email,
			username: data.username,
			status: data.status ? true : false,
			rolId: data.rol_id
		};
	}
}
