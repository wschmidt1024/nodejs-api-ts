import mongoose from 'mongoose';

import { IPortfolioDatabase } from '../interfaces/portfolio.database';

import Users from './mongoose.users';

class PortfolioMongoose implements IPortfolioDatabase {
	public users = Users;

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

export default new PortfolioMongoose();