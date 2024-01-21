import { NextFunction, Request, Response } from 'express';
import { ResponseStructureType } from '../utils/types';
import { responseStructure } from '../utils/helpers';
import { User } from '../models/userModels';

export const isEmailUnique = async (
  req: Request,
  res: Response,
  next: NextFunction,
  data: ResponseStructureType['data']
) => {
  const username = req.body.username;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return responseStructure({ res, statusCode: 411, data });
  }

  next();
};
