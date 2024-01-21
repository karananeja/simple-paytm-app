import { Response } from 'express';
import { Document } from 'mongoose';

export type EnvironmentTypes = {
  DB_PASSWORD?: string;
  DB_USERNAME?: string;
  DB_NAME?: string;
  APP_PORT?: string;
  JWT_SECRET: string;
  SALT_ROUNDS: 10;
};

type ErrType = { err: string; errMessage: string };

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>
  | Document
  | Array<Document>
  | null;

type SuccessType = { msg: string; info?: JSONValue };

export type ResponseStructureType = {
  data: ErrType | SuccessType;
  res: Response;
  statusCode?: number;
};

export type ErrMessagesType = {
  [x: string]: { err: string; errMessage: string };
};

export type UserType = {
  firstName: string;
  lastName: string;
  password: string;
  username: string;
};

export type JwtPayload = {
  userId: string;
};
