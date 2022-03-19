import express, { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';

import { graphResolvers, graphSchemas } from '../database/graphql/';

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
		this.server.use('/graphql', graphqlHTTP((request, response) => ({
			schema: graphSchemas,
			rootValue: graphResolvers,
			graphiql: true,
			context: {
				request,
				response,
			}
		})));
	}
}

export default new App().server;
