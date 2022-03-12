import { Request, Response } from 'express';

import { CreateUser, UpdateUser, User } from '../../database/models/user';
import mongooseUsersDatabase from '../../database/mongoose/mongoose.users';

class UsersController {
	async getUsers(req: Request, res: Response): Promise<void> {
		try {
			const result = await mongooseUsersDatabase.getUsers();
			if (result) {
				res.status(200).json(result);
				return;
			} else {
				res.status(404).json({ error: 'No users found.' });
				return;
			}
		} catch (err: any) {
			res.status(500).json({ error: err.message });
			return;
		}
	}
	async getUserById(req: Request, res: Response): Promise<void> {
		const result: User | null = await mongooseUsersDatabase.getUserById(req.params.id);
		if (result) {
			res.status(200).json(result);
			return;
		} else {
			res.status(404).json({ error: `The user with ID '${req.params.id}' was not found.` });
			return;
		}
	}
	async createUser(req: Request, res: Response): Promise<void> {
		const user: CreateUser = req.body as CreateUser;
		const result: User | null = await mongooseUsersDatabase.createUser(user);
		res.status(201).json(result);
		return;
	}
	async updateUserById(req: Request, res: Response): Promise<void> {
		const user: UpdateUser = req.body as UpdateUser;
		const result: User | null = await mongooseUsersDatabase.updateUserById(req.params.id, user);
		res.status(200).json(result);
		return;
	}
	async deleteUserById(req: Request, res: Response): Promise<void> {
		await mongooseUsersDatabase.deleteUserById(req.params.id);
		res.status(204).json({});
		return;
	}
}

export default new UsersController();
