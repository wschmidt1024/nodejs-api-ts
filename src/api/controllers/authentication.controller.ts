import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authentication from '../../shared/authentication';

import DatabaseConnection from '../../database/connection';

export class AuthenticationController {
	public async login(req: Request, res: Response): Promise<void> {
		try {
			const { username, password } = req.body;
			let user = await DatabaseConnection.users.getUserByUsername(username);
			if (!user) {
				res.status(401).json({ error: 'Invalid credentials.' });
				return;
			} else {
				const valid = await authentication.isPasswordValid(password, user.password || '');
				if (!valid) {
					res.status(401).json({ error: 'Invalid credentials.' });
					return;
				}
				user = authentication.removeUserAuthenticationData(user);
				const token = jwt.sign({ first: user.first, last: user.last }, process.env.SECRET_KEY || '', {}); // TODO: add to a new module
				res.status(200).json({ user, token });
				return;
			}
		} catch (err: any) {
			console.error(err); // TODO: transfer to a logger
			res.status(500).json({ error: err.message });
			return;
		}
	}
}

export default new AuthenticationController();
