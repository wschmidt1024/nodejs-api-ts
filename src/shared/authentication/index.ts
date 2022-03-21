import bcrypt from 'bcrypt';

import { User } from '../../database/models/user';

const saltRounds = 10;

const encryptPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, saltRounds);
};

const isPasswordStrengthSecure = (password: string): boolean => {
	return true;
};

const isPasswordValid = async (givenPassword: string, encryptedPassword: string): Promise<boolean> => {
	let valid = false;
	try {
		valid = await bcrypt.compare(givenPassword, encryptedPassword);
	} catch(err: any) {
		console.error(err);
		throw new Error('Error validating credentials.');
	}

	return valid;
};

const removeUserAuthenticationData = (user: User): User => {
	delete user.password;
	return user;
};

export default {
	encryptPassword,
	isPasswordStrengthSecure,
	isPasswordValid,
	removeUserAuthenticationData
};