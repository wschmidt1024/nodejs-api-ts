import mongoose from 'mongoose';

import { IUsersDatabase } from '../interfaces/database.users';
import { InvalidDatabaseIdError } from '../interfaces/errors';
import { CreateUser, UpdateUser, User } from '../models/user';

import { UserDocument2User } from './helpers/mappers';
import UserModel, { IUserDocument } from './schemas/user.schema';

class Users implements IUsersDatabase {
	public async getUsers(): Promise<User[]> {
		try {
			const userDocuments: IUserDocument[] = await UserModel.find();
			const users: User[] = userDocuments.map((doc: IUserDocument) => {
				return UserDocument2User(doc);
			});

			return users;
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error('Error retrieving users.');
		}
	}
	public async getUserById(_id: string): Promise<User | null> {
		if (!mongoose.isValidObjectId(_id)) {
			throw new InvalidDatabaseIdError('Invalid User ID.');
		}
		try {
			const userDocument: IUserDocument | null = await UserModel.findOne({ _id });
			if (userDocument) {
				return UserDocument2User(userDocument);
			}
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			new Error(`Error retrieving user by ID: ${_id}.`);
		}

		return null;
	}
	public async getUserByUsername(username: string): Promise<User | null> {
		try {
			const userDocument: IUserDocument | null = await UserModel.findOne({ username });
			if (userDocument) {
				return UserDocument2User(userDocument);
			}
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error(`Error retrieving user by username: ${username}`);
		}

		return null;
	}
	public async createUser(user: CreateUser): Promise<User | null> {
		try {
			const userDocument: IUserDocument = await UserModel.create({ ...user });
			if (userDocument) {
				return UserDocument2User(userDocument);
			}
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error('Error creating user.');
		}

		return null;
	}
	public async updateUserById(_id: string, user: UpdateUser): Promise<User | null> {
		if (!mongoose.isValidObjectId(_id)) {
			throw new InvalidDatabaseIdError('Invalid User ID.');
		}
		try {
			const currentUser: User | null = await this.getUserById(_id);
			if (!currentUser) {
				return null;
			}
			const updateResult = await UserModel.updateOne({ _id }, user);
			if (updateResult.matchedCount == 1) {
				return { ...currentUser, ...user };
			}
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error('Error updating user.');
		}

		return null;
	}
	public async updatePasswordByUserId(_id: string, password: string): Promise<boolean> {
		if (!mongoose.isValidObjectId(_id)) {
			throw new InvalidDatabaseIdError('Invalid User ID.');
		}
		try {
			const updateResult = await UserModel.updateOne({ _id }, { password });
			if (updateResult) {
				return true;
			}
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error('Error updating user password.');
		}

		return false;
	}
	public async deleteUserById(_id: string): Promise<void> {
		if (!mongoose.isValidObjectId(_id)) {
			throw new InvalidDatabaseIdError('Invalid User ID.');
		}
		try {
			await UserModel.deleteOne({ _id });
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			throw new Error('Error deleting user.');
		}

		return;
	}
}

export default Users;
