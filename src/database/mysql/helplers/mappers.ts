import { User } from '../../models/user';

export function MySqlDocument2User(document: any): User {
	return {
		id: document.id,
		first: document.first,
		last: document.last,
		email: document.email,
		username: document.username,
		password: document.password
	};
}
