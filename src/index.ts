import * as dotenv from 'dotenv';

import server from './api';
import { IPortfolioDatabase } from './database/interfaces/portfolio.database';
import PortfolioMongoose from './database/mongoose';

dotenv.config();

const database: IPortfolioDatabase = PortfolioMongoose;

(async () => {
	try {
		await database.connect();
		server.listen(process.env.PORT, () => {
			console.log(`The application is listening on port ${process.env.PORT}!`);
		});
	} catch (err: any) {
		console.error(err.message);
	}
})();
