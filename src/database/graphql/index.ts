import { buildSchema } from 'graphql';

import { usersResolvers } from './resolvers/users.resolvers';
import { usersSchema } from './schemas/users.schema';

const schemas: string = '';

export const graphSchemas = buildSchema(schemas.concat(
	usersSchema
));

export const graphResolvers = {
	...usersResolvers
};
