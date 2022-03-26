import { IUsersDatabase } from '../../interfaces/database.users';
import { User } from '../../models/user';
import Users from '../../mongoose/mongoose.users';

import authentication from '../../../shared/authentication';

const usersDatabase: IUsersDatabase = new Users();

export const usersResolvers = {
	users: async (): Promise<User[]> => {
		try {
			return await usersDatabase.getUsers();
		} catch (err: any) {
			throw new Error(err.message);
		}
	},
	user: async ({ id }: any): Promise<User | null> => {
		try {
			const user: User | null = await usersDatabase.getUserById(id);
			if (!user) {
				throw new Error(`The user with ID '${id}' was not found.`);
			}
			return user;
		} catch (err: any) {
			throw new Error(err.message);
		}
	},
	createUser: async ({ user }: any): Promise<User | null> => {
		try {
			if (!authentication.isPasswordStrengthSecure(user.password)) {
				throw new Error('Password does not meet required strength.');
			}
			return await usersDatabase.createUser(user);
		} catch (err: any) {
			throw new Error(err.message);
		}
	},
	updateUser: async ({ id, user }: any): Promise<User | null> => {
		try {
			const updated: User | null = await usersDatabase.updateUserById(id, user);
			if (!updated) {
				throw new Error(`The user with ID '${id}' was not found.`);
			}
			return updated;
		} catch (err: any) {
			throw new Error(err.message);
		}
	},
	deleteUser: async ({ id }: any): Promise<void> => {
		try {
			return await usersDatabase.deleteUserById(id);
		} catch (err: any) {
			throw new Error(err.message);
		}
	}
};
