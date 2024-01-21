import { config } from 'dotenv';
import { EnvironmentTypes, ErrMessagesType } from './types';

config();

export const environment: EnvironmentTypes = {
  DB_PASSWORD: process.env.NODE_DB_PASSWORD,
  DB_USERNAME: process.env.NODE_DB_USERNAME,
  DB_NAME: process.env.NODE_DB_NAME,
  APP_PORT: process.env.NODE_APP_PORT,
  JWT_SECRET: process.env.NODE_JWT_SECRET,
};

export const errMessages: ErrMessagesType = {
  INTERNAL_SERVER_ERROR: {
    err: 'INTERNAL_SERVER_ERROR',
    errMessage: 'Exception has occurred',
  },
  BAD_REQUEST: {
    err: 'BAD_REQUEST',
    errMessage: 'Send all required fields: title, author, publishYear',
  },
};
