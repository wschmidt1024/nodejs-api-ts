/* eslint-disable no-undef */
const mongoose = require('mongoose');

import { UserDocument2User } from '../../../../src/database/mongoose/helpers/mappers';

describe('UserDocument2User function', () => {
	it('returns an object with the correct data when the provided object has complete data.', () => {
		const entity: any = {
			_id: mongoose.Types.ObjectId('5ced2388dbbbe124d8671067'),
			first: 'First',
			last: 'Last',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		};

		const result = UserDocument2User(entity);

		expect(result).not.toBeNull();
		expect(result.id).toEqual('5ced2388dbbbe124d8671067');
		expect(result.first).toEqual('First');
		expect(result.last).toEqual('Last');
		expect(result.email).toEqual('test@test.com');
		expect(result.username).toEqual('username');
		expect(result.password).toEqual('password');
	});
});
