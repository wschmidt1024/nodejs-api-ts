import { IUsersDatabase } from '../interfaces/database.users';
import { CreateUser, UpdateUser, User } from '../models/user';

import { UserDocument2User } from './helpers/mappers';
import UserModel, { IUserDocument } from './schemas/user.schema';

class Users implements IUsersDatabase {
	public async getUsers(): Promise<User[] | null> {
		try {
			const userDocuments: IUserDocument[] = await UserModel.find();
			if (Array.isArray(userDocuments)) {
				const users: User[] = new Array();
				userDocuments.forEach((document: IUserDocument) => {
					const user = UserDocument2User(document);
					if (user) {
						users.push(user);
					}
				});

				return users;
			}
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error('Error occurred getting users.');
		}

		return null;
	}
	public async getUserById(_id: string): Promise<User | null> {
		const userDocument: IUserDocument | null = await UserModel.findOne({ _id });
		if (userDocument) {
			return UserDocument2User(userDocument);
		}

		return null;
	}
	public async getUserByUsername(username: string): Promise<User | null> {
		const userDocument: IUserDocument | null = await UserModel.findOne({ username });
		if (userDocument) {
			return UserDocument2User(userDocument);
		}

		return null;
	}
	public async createUser(user: CreateUser): Promise<User | null> {
		const userDocument: IUserDocument | void = await UserModel.create({ ...user });
		if (userDocument) {
			return UserDocument2User(userDocument);
		}

		return null;
	}
	public async updateUserById(_id: string, user: UpdateUser): Promise<User | null> {
		const currentUser: User | null = await this.getUserById(_id);
		if (!currentUser) {
			return null;
		}
		const updateResult = await UserModel.updateOne({ _id }, user);
		if (updateResult.matchedCount == 1) {
			return { ...currentUser, ...user };
		}

		return null;
	}
	public async updatePasswordByUserId(_id: string, password: string): Promise<boolean> {
		try {
			const updateResult = await UserModel.updateOne({ _id }, { password });
			if (updateResult) {
				return true;
			}
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error(err.message);
		}

		return false;
	}
	public async deleteUserById(_id: string): Promise<void> {
		await UserModel.deleteOne({ _id });

		return;
	}
}

export default Users;
