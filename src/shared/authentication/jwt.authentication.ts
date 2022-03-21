import { NextFunction, Request, Response } from 'express';

export default function () {
	return async function (request: Request, response: Response, next: NextFunction) {
		if (!request.headers.authorization || request.headers.authorization.indexOf('Bearer ') === -1) {
			return response.status(401).json({ error: 'Missing Authentication Header' });
		}

		// TODO: Implement JWT Validation
		const jwtIsValid: boolean = true;
		if (jwtIsValid) {
			return next();
		}

		return response.status(401).json({ error: 'Unauthorized' });
	};
}
