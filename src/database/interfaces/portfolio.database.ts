import { IUsersDatabase } from './database.users';

export interface IPortfolioDatabase
{
    users: IUsersDatabase;
    connect(): Promise<void>;
}
