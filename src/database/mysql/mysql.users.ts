import mysql from 'mysql';

import { IUsersDatabase } from '../interfaces/database.users';
import { InvalidDatabaseIdError } from '../interfaces/errors';
import { CreateUser, UpdateUser, User } from '../models/user';

import { MySqlDocument2User } from './helplers/mappers';

class Users implements IUsersDatabase {
	private _connection: mysql.Connection;

	constructor(conn: mysql.Connection) {
		this._connection = conn;
	}
	public async getUsers(): Promise<User[]> {
		return new Promise((resolve, reject) => {
			this._connection.query(
				'SELECT * FROM users',
				(err: mysql.MysqlError, results: any) => {
					if (err) {
						console.error(err); // TODO: transfer to a logger
						reject(new Error('Error retrieving users.'));
						return;
					}
					if (Array.isArray(results)) {
						const users: User[] = results.map((doc: any) => MySqlDocument2User(doc));
						resolve(users);
						return;
					}
					console.warn('Failed to get users. Instead received:', results); // TODO: transfer to a logger
					resolve(new Array());
				}
			);
		});
	}
	public async getUserById(_id: string): Promise<User | null> {
		if (isNaN(+_id)) {
			throw new InvalidDatabaseIdError('Invalid User ID.');
		}
		return new Promise((resolve, reject) => {
			this._connection.query(
				'SELECT * FROM users WHERE id = ?',
				[_id],
				(err: mysql.MysqlError | null, results: any) => {
					if (err) {
						console.error(err); // TODO: transfer to a logger
						reject(new Error(`Error retrieving user by ID: ${_id}.`));
						return;
					}
					if (Array.isArray(results) && results[0]) {
						resolve(MySqlDocument2User(results[0]));
						return;
					}
					console.warn('Failed to get user by ID. Instead received:', results); // TODO: transfer to a logger
					resolve(null);
				}
			);
		});
	}
	public async getUserByUsername(username: string): Promise<User | null> {
		return new Promise((resolve, reject) => {
			this._connection.query(
				// Documentation: https://github.com/mysqljs/mysql#escaping-query-values
				`SELECT * FROM users WHERE username = ${this._connection.escape(username)}`,
				(err: mysql.MysqlError, results: any) => {
					if (err) {
						console.error(err); // TODO: transfer to a logger
						reject(new Error(`Error retrieving user by username: ${username}`));
						return;
					}
					if (Array.isArray(results) && results[0]) {
						resolve(MySqlDocument2User(results[0]));
						return;
					}
					console.warn('Failed to user by username. Instead received:', results); // TODO: transfer to a logger
					resolve(null);
				}
			);
		});
	}
	public async createUser(user: CreateUser): Promise<User | null> {
		return new Promise((resolve, reject) => {
			this._connection.query(
				'INSERT INTO users (first, last, email, username, password) VALUES (?, ?, ?, ?, ?)',
				Object.values(user),
				async (err: mysql.MysqlError | null, results: any) => {
					if (err) {
						console.error(err); // TODO: transfer to a logger
						reject(new Error('Error creating user.'));
						return;
					} else {
						try {
							const added = await this.getUserById(results.insertId);
							if (added) {
								resolve(MySqlDocument2User(added));
								return;
							}
							resolve(null);
							return;
						} catch (err: any) {
							console.error(err); // TODO: transfer to a logger
							reject(new Error(`User was created but was unable to retrieve the new user (ID: ${results.insertId}).`));
							return;
						}
					}
				}
			);
		});
	}
	public async updateUserById(_id: string, user: UpdateUser): Promise<User | null> {
		if (isNaN(+_id)) {
			throw new InvalidDatabaseIdError('Invalid User ID.');
		}
		return new Promise((resolve, reject) => {
			this._connection.query(
				'UPDATE users SET ? WHERE id = ?',
				[user, _id],
				async (err: mysql.MysqlError | null, results: any) => {
					if (err) {
						console.error(err); // TODO: transfer to a logger
						reject(new Error('Error updating user.'));
					} else {
						try {
							const updated = await this.getUserById(_id);
							if (updated) {
								resolve(MySqlDocument2User(updated));
								return;
							}
							resolve(null);
							return;
						} catch (err: any) {
							console.error(err); // TODO: transfer to a logger
							reject(new Error(`User was updated but was unable to retrieve the updated user (ID: ${results.insertId}).`));
							return;
						}
					}
				}
			);
		});
	}
	public async updatePasswordByUserId(_id: string, password: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._connection.query(
				'UPDATE users SET password = ? WHERE id = ?',
				[password, _id],
				(err: mysql.MysqlError | null, results: any) => {
					if (err) {
						console.error(err); // TODO: transfer to a logger
						reject(new Error('Error updating user password.'));
						return;
					} else {
						resolve(true);
						return;
					}
				}
			);
		});
	}
	public async deleteUserById(_id: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this._connection.query(
				'DELETE FROM users WHERE id = ?',
				_id,
				(err: mysql.MysqlError | null, results: any) => {
					if (err) {
						console.error(err); // TODO: transfer to a logger
						reject(new Error('Error deleting user.'));
						return;
					} else {
						resolve();
						return;
					}
				}
			);
		});
	}
}

export default Users;
