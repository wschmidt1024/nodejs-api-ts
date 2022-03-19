import * as dotenv from 'dotenv';
dotenv.config();

import server from './api';
import { IPortfolioDatabase } from './database/interfaces/portfolio.database';
import DatabaseConnection from './database/connection';

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
