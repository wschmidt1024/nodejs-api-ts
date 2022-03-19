export const usersSchema: string = `
type Query {
    users: [User]
    user(id: String!): User
}
type Mutation {
    createUser(user: UpsertUser!): User
    updateUser(id: String!, user: UpsertUser!): User
    deleteUser(id: String!): User
}
type User {
    id: String
    first: String
    last: String
}
input UpsertUser {
    first: String
    last: String
}
`;
