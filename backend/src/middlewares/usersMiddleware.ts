import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload, ResponseStructureType } from '../utils/types';
import { responseStructure } from '../utils/helpers';
import { User } from '../models/userModels';
import { environment } from '../utils/constants';

export const isEmailUnique = async (
  req: Request,
  res: Response,
  next: NextFunction,
  data: ResponseStructureType['data']
) => {
  const username = req.body.username;
  const existingUser = await User.findOne({ username });

  if (existingUser) return responseStructure({ res, statusCode: 411, data });

  next();
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  data: ResponseStructureType['data']
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return responseStructure({ res, statusCode: 403, data });

  const token = authHeader.split(' ')[1];

  try {
    const decodedData = jwt.verify(
      token!,
      environment.JWT_SECRET
    ) as JwtPayload;
    req.body.userId = decodedData.userId;
    next();
  } catch (err) {
    return responseStructure({ res, statusCode: 403, data });
  }
};
