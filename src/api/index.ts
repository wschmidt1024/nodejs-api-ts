import express, { Request, Response } from 'express';

import usersRouter from './routes/users.routes';

class App {
	public server: any = express();

	constructor() {
		this.middleware();
		this.routes();
	}

	private middleware() {
		this.server.use(express.json());
	}

	private routes() {
		this.server.get('/', (req: Request, res: Response) => {
			res.send('Portfolio API Home');
		});
		this.server.use('/users', usersRouter);
	}
}

export default new App().server;
