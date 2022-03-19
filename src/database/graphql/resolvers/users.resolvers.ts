import { IUsersDatabase } from '../../interfaces/database.users';
import { User } from '../../models/user';
import Users from '../../mongoose/mongoose.users';

const usersDatabase: IUsersDatabase = new Users();

export const usersResolvers = {
	users: async (): Promise<User[] | null> => {
		try {
			return await usersDatabase.getUsers();
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error(err.message);
		}
	},
	user: async ({ id }: any): Promise<User | null> => {
		try {
			return await usersDatabase.getUserById(id);
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error(err.message);
		}
	},
	createUser: async ({ user }: any): Promise<User | null> => {
		try {
			return await usersDatabase.createUser(user);
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error(err.message);
		}
	},
	updateUser: async ({ id, user }: any): Promise<User | null> => {
		try {
			return await usersDatabase.updateUserById(id, user);
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error(err.message);
		}
	},
	deleteUser: async({ id }: any): Promise<void> => {
		try {
			return await usersDatabase.deleteUserById(id);
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error(err.message);
		}
	}
};
