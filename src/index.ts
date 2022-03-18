import * as dotenv from 'dotenv';

import server from './api';
import { IPortfolioDatabase } from './database/interfaces/portfolio.database';
// import DatabaseConnection from './database/mongoose';
import DatabaseConnection from './database/mysql';

dotenv.config();

(async () => {
	try {
		const connection: IPortfolioDatabase = DatabaseConnection;
		await connection.connect();

		server.listen(process.env.PORT, () => {
			console.log(`The application is listening on port ${process.env.PORT}!`);
		});
	} catch (err: any) {
		console.error(err.message);
	}
})();
