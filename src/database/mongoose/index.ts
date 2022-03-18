import mongoose from 'mongoose';

import { IUsersDatabase } from '../interfaces/database.users';
import { IPortfolioDatabase } from '../interfaces/portfolio.database';

import Users from './mongoose.users';

class MongooseConnection implements IPortfolioDatabase {
	public users: IUsersDatabase;

	constructor() {
		this.users = new Users();
	}

	public async connect(): Promise<void> {
		await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || '')
			.catch((err: any) => {
				if (err instanceof(mongoose.Error.MongooseServerSelectionError)) {
					console.error(err); // TODO: transfer to a logger
				} else {
					console.log(err); // TODO: transfer to a logger
				}
			});
	}
}

export default new MongooseConnection();
