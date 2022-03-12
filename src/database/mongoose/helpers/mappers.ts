import { User } from '../../models/user';

import { IUserDocument } from '../schemas/user.schema';

export function UserDocument2User(model: IUserDocument): User | null {
	return model ? {
		id: model._id.toString(),
		first: model.first,
		last: model.last
	} : null;
}
