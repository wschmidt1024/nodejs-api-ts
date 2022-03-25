export class InvalidDatabaseIdError implements Error {
	constructor(message: string) {
		this.name = 'InvalidDatabaseIdError';
		this.message = message;
	}
	name: string;
	message: string;
	stack?: string | undefined;
}
