import express from 'express';

import usersController from '../controllers/users.controller';

class UsersRoutes {
	public router = express.Router();

	constructor() {
		this.router.get('/', usersController.getUsers);
		this.router.get('/:id', usersController.getUserById);
		this.router.post('/', usersController.createUser);
		this.router.put('/:id', usersController.updateUserById);
		this.router.delete('/:id', usersController.deleteUserById);
	}
}

export default new UsersRoutes().router;
