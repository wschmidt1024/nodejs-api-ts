import mysql, { Connection } from 'mysql';

import { IUsersDatabase } from '../interfaces/database.users';
import { IPortfolioDatabase } from '../interfaces/portfolio.database';

import Users from './mysql.users';

class MySqlConnection implements IPortfolioDatabase {
	private connection: mysql.Connection = mysql.createConnection({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE
	});

	public users: IUsersDatabase;

	constructor() {
		this.users = new Users(this.connection);
	}
	public async connect(): Promise<void> {
		((conn: Connection) => {
			this.connection.connect(function (err) {
				if (err) {
					console.error('Error connecting to MySQL: ' + err.message);
					throw new Error('Failed to connect to database.');
				}
				console.log('Connected to MySQL as ID: ' + conn.threadId);
				return;
			});
		})(this.connection);
	}
}

export default new MySqlConnection();
