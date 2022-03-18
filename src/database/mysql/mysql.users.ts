import mysql from 'mysql';

import { IUsersDatabase } from '../interfaces/database.users';
import { CreateUser, UpdateUser, User } from '../models/user';

class Users implements IUsersDatabase {
	private _connection: mysql.Connection;

	constructor(conn: mysql.Connection) {
		this._connection = conn;
	}
	public async getUsers(): Promise<User[] | null> {
		return new Promise((resolve, reject) => {
			this._connection.query('select * from users', (err, results) => {
				if (err) {
					console.log(err); // TODO: transfer to a logger
					reject(new Error('Error retrieving users.'));
				}
				if (results) {
					resolve([...results] as User[]);
				}
			});
		});
	}
	public async getUserById(_id: string): Promise<User | null> {
		const id = parseInt(_id);
		if (isNaN(id) || _id.length > id.toString().length) {
			throw new Error('Invalid User ID.');
		}
		return new Promise((resolve, reject) => {
			this._connection.query(`select * from users where id = ${_id}`, (err, results) => {
				if (err) {
					console.error(err); // TODO: transfer to a logger
					reject(new Error(`Error retrieving user by ID: ${_id}`));
				} else {
					return resolve(results as User);
				}
			});
		});
	}
	public async createUser(user: CreateUser): Promise<User | null> {
		return new Promise((resolve, reject) => {
			const sql = 'INSERT INTO users (first, last) VALUES (?, ?)';
			this._connection.query(sql, Object.values(user), async (err, results) => {
				if (err) {
					console.error(err); // TODO: transfer to a logger
					reject(new Error('Error creating user.'));
				} else {
					const added = await this.getUserById(results.insertId);
					resolve(added);
				}
			});
		});
	}
	public async updateUserById(_id: string, user: UpdateUser): Promise<User | null> {
		const id = parseInt(_id);
		if (isNaN(id) || _id.length > id.toString().length) {
			throw new Error('Invalid User ID.');
		}
		return new Promise((resolve, reject) => {
			// TODO: convert this SQL generation to a re-usable function
			let set = '';
			let idx = 0;
			let prop: keyof UpdateUser;
			for (prop in user) {
				set += idx > 0 ? ', ' : '';
				switch (typeof (prop)) {
				case 'string':
					set += `${prop} = '${user[prop]}'`;
					break;
				default:
					set += `${prop} = ${user[prop]}`;
					break;
				}
				idx++;
			}
			const sql = `update users set ${set} where id = ${_id}`;
			this._connection.query(sql, async (err) => {
				if (err) {
					console.error(err); // TODO: transfer to a logger
					reject(new Error('Error updating user.'));
				} else {
					const updated = await this.getUserById(_id);
					resolve(updated);
				}
			});
		});
	}
	public async deleteUserById(_id: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this._connection.query(`delete from users where id = ${_id}`, (err) => {
				if (err) {
					console.error(err); // TODO: transfer to a logger
					reject(new Error('Error deleting user.'));
				} else {
					resolve();
				}
			});
		});
	}
}

export default Users;
