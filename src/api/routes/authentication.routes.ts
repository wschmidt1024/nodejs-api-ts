import express from 'express';

import authenticationController from '../controllers/authentication.controller';

class AuthenticationRoutes {
	public router = express.Router();

	constructor() {
		this.router.post('/login', authenticationController.login);
	}
}

export default new AuthenticationRoutes().router;
