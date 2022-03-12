export interface User {
    id: string;
    first: string;
    last: string;
}

export type CreateUser = Omit<User, 'id'>;
export type UpdateUser = Omit<User, 'id'>;
