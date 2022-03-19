import { Request, Response } from 'express';

import { CreateUser, UpdateUser, User } from '../../database/models/user';
import DatabaseConnection from '../../database/mongoose';
// import DatabaseConnection from '../../database/mysql';

class UsersController {
	async getUsers(req: Request, res: Response): Promise<void> {
		try {
			const result = await DatabaseConnection.users.getUsers();
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
		try {
			const result: User | null = await DatabaseConnection.users.getUserById(req.params.id);
			if (result) {
				res.status(200).json(result);
				return;
			} else {
				res.status(404).json({ error: `The user with ID '${req.params.id}' was not found.` });
				return;
			}
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
	async createUser(req: Request, res: Response): Promise<void> {
		try {
			const user: CreateUser = req.body as CreateUser;
			const result: User | null = await DatabaseConnection.users.createUser(user);
			res.status(201).json(result);
			return;
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
	async updateUserById(req: Request, res: Response): Promise<void> {
		try {
			const user: UpdateUser = req.body as UpdateUser;
			const result: User | null = await DatabaseConnection.users.updateUserById(req.params.id, user);
			res.status(200).json(result);
			return;
		} catch (err: any) {
			res.status(500).json({ error: err.message });
			return;
		}
	}
	async deleteUserById(req: Request, res: Response): Promise<void> {
		try {
			await DatabaseConnection.users.deleteUserById(req.params.id);
			res.status(204).json({});
			return;
		} catch (err: any) {
			res.status(500).json({ error: err.message });
			return;
		}
	}
}

export default new UsersController();
