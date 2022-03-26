import { Request, Response } from 'express';

import { InvalidDatabaseIdError } from '../../database/interfaces/errors';
import { CreateUser, UpdateUser, User } from '../../database/models/user';
import DatabaseConnection from '../../database/connection';
import authentication from '../../shared/authentication';

class UsersController {
	async getUsers(req: Request, res: Response): Promise<void> {
		try {
			let results: User[] = await DatabaseConnection.users.getUsers();
			results = results.map((user: User) => {
				return authentication.removeUserAuthenticationData(user);
			});
			res.status(200).json(results);
			return;
		} catch (err: any) {
			res.status(500).json({ error: err.message });
			return;
		}
	}
	async getUserById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			let result: User | null = await DatabaseConnection.users.getUserById(id);
			if (result) {
				result = authentication.removeUserAuthenticationData(result);
				res.status(200).json(result);
				return;
			} else {
				res.status(404).json({ error: `The user with ID '${id}' was not found.` });
				return;
			}
		} catch (err: any) {
			if (err instanceof InvalidDatabaseIdError) {
				res.status(400).json({ error: err.message });
				return;
			} else {
				res.status(500).json({ error: err.message });
				return;
			}
		}
	}
	async createUser(req: Request, res: Response): Promise<void> {
		try {
			// TODO: create a mapper function
			const user: CreateUser = req.body as CreateUser;
			if (!authentication.isPasswordStrengthSecure(user.password)) {
				res.status(400).json({ error: 'Password does not meet required strength.' });
				return;
			}
			user.password = await authentication.encryptPassword(user.password);
			let result: User | null = await DatabaseConnection.users.createUser(user);
			if (result) {
				result = authentication.removeUserAuthenticationData(result);
				res.status(201).json(result);
				return;
			}
		} catch (err: any) {
			res.status(500).json({ error: err.message });
			return;
		}
	}
	async updateUserById(req: Request, res: Response): Promise<void> {
		try {
			// TODO: create a mapper function
			const user: UpdateUser = req.body as UpdateUser;
			let result: User | null = await DatabaseConnection.users.updateUserById(req.params.id, user);
			if (result) {
				result = authentication.removeUserAuthenticationData(result);
				res.status(200).json(result);
				return;
			}
			res.status(404).json({ error: `The user with ID '${req.params.id}' was not found.` });
			return;
		} catch (err: any) {
			if (err instanceof InvalidDatabaseIdError) {
				res.status(400).json({ error: err.message });
				return;
			} else {
				res.status(500).json({ error: err.message });
				return;
			}
		}
	}
	async updatePasswordByUserId(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			let { password } = req.body;
			password = await authentication.encryptPassword(password);
			const response: boolean = await DatabaseConnection.users.updatePasswordByUserId(id, password);
			if (response) {
				res.status(200).json({ message: 'success' });
				return;
			}
		} catch (err: any) {
			if (err instanceof InvalidDatabaseIdError) {
				res.status(400).json({ error: err.message });
				return;
			} else {
				res.status(500).json({ error: err.message });
				return;
			}
		}
	}
	async deleteUserById(req: Request, res: Response): Promise<void> {
		try {
			await DatabaseConnection.users.deleteUserById(req.params.id);
			res.status(204).json();
			return;
		} catch (err: any) {
			if (err instanceof InvalidDatabaseIdError) {
				res.status(400).json({ error: err.message });
				return;
			} else {
				res.status(500).json({ error: err.message });
				return;
			}
		}
	}
}

export default new UsersController();
