import { User } from '../../models/user';

import { IUserDocument } from '../schemas/user.schema';

export function UserDocument2User(model: IUserDocument): User {
	return {
		id: model._id.toString(),
		first: model.first,
		last: model.last,
		email: model.email,
		username: model.username,
		password: model.password
	};
}
