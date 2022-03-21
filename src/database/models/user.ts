export interface User {
    id: string;
    first: string;
    last: string;
    email: string;
    username: string;
    password?: string;
}

export interface CreateUser {
    first: string;
    last: string;
    email: string;
    username: string;
    password: string;
}
export interface UpdateUser {
    first: string;
    last: string;
}
