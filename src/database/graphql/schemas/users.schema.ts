export const usersSchema: string = `
type Query {
    users: [User!]!
    user(id: String!): User
}
type Mutation {
    createUser(user: CreateUser!): User
    updateUser(id: String!, user: UpdateUser!): User
    deleteUser(id: String!): User
}
type User {
    id: String
    first: String
    last: String
    email: String
    username: String
}
input CreateUser {
    first: String!
    last: String!
    email: String!
    username: String!
    password: String!
}
input UpdateUser {
    first: String
    last: String
    email: String
    username: String
    password: String
}
`;
