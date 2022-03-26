# Portfolio Node.js API with TypeScript

## Overview

This is a sample API project built with multiple technologies behind it. The API server uses ```express``` for routing. The API can be setup to use MongoDB (via ```mongoose```), GraphQL (via ```graphql```), or MySQL (via ```mysql```).

Some basic security has been implemented with password encryption (via ```bcrypt```) and API route protection by requiring a basic JWT (via ```jsonwebtoken```).

## Environment Variables

This table describes the environment variables used to run the API.

General environment variables.

| Key | Purpose |
| ----- | ----- |
| PORT | Sets the port for the express API server. |
| SECRET_KEY | The secret key used to encrypt passwords. |

MongoDB environment variables.

| Key | Purpose |
| ----- | ----- |
| MONGODB_CONNECTION_STRING | The connection string to the MongoDB. |
| MONGODB_DATABASE_NAME | The MongoDB database name used to store data. |

MySQL environment variables.

| Key | Purpose |
| ----- | ----- |
| MYSQL_HOST | The host for MySQL. |
| MYSQL_USER | The user to sign in with into MySQL. |
| MYSQL_PASSWORD | The MySQL user's password. |
| MYSQL_DATABASE | The MySQL database used to store data. |

## Database

The database uses the basic structure below.

### Users

Users data structure.

| Column | Data Type |
| ----- | ----- |
| id | Database Generated |
| first | VARCHAR / String |
| last | VARCHAR / String |
| email | VARCHAR / String |
| username | VARCHAR / String |
| password | VARCHAR / String |
