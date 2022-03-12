/* eslint-disable no-unused-vars */
import { CreateUser, User, UpdateUser } from '../models/user';

export interface IUsersDatabase
{
    getUsers(): Promise<User[] | null>;
    getUserById(_id: string): Promise<User | null>;
    createUser(user: CreateUser): Promise<User | null>;
    updateUserById(_id: string, user: UpdateUser): Promise<User | null>;
    deleteUserById(_id: string): Promise<void>;
}
