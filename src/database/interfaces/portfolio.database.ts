/* eslint-disable no-unused-vars */
import { CreateUser, UpdateUser, User } from '../models/user';

export interface IPortfolioDatabase
{
    connect(): Promise<void>;
}
