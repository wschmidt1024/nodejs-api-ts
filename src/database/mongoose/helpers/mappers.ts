import { User } from '../../models/user';

import { IUserDocument } from '../schemas/user.schema';

export function UserDocument2User(model: IUserDocument): User {
	const user: User = {
		id: model._id.toString(),
		first: model.first,
		last: model.last
	};

	return user;
}
