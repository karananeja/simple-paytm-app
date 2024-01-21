import { config } from 'dotenv';
import { EnvironmentTypes, ErrMessagesType } from './types';

config();

export const environment: EnvironmentTypes = {
  DB_PASSWORD: process.env.NODE_DB_PASSWORD,
  DB_USERNAME: process.env.NODE_DB_USERNAME,
  APP_PORT: process.env.NODE_APP_PORT,
  JWT_SECRET: process.env.NODE_JWT_SECRET!,
  SALT_ROUNDS: 10,
};

export const errMessages: ErrMessagesType = {
  INTERNAL_SERVER_ERROR: {
    err: 'INTERNAL_SERVER_ERROR',
    errMessage: 'Exception has occurred',
  },
  BAD_REQUEST: {
    err: 'BAD_REQUEST',
    errMessage: 'Email already taken / Incorrect inputs',
  },
  LOGIN_ERROR: {
    err: 'LOGIN_ERROR',
    errMessage: 'Error while logging in',
  },
  UPDATE_ERROR: {
    err: 'UPDATE_ERROR',
    errMessage: 'Error while updating information',
  },
  INVALID_TOKEN: {
    err: 'INVALID_TOKEN',
    errMessage: `There's an issue with the token provided`,
  },
};
