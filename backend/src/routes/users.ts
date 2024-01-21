import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import zod from 'zod';
import bcrypt from 'bcrypt';
import { environment, errMessages } from '../utils/constants';
import { isEmailUnique } from '../middlewares/usersMiddleware';
import { User } from '../models/userModels';
import { responseStructure } from '../utils/helpers';

const router = Router();

router.post(
  '/signup',
  (req: Request, res: Response, next: NextFunction) =>
    isEmailUnique(req, res, next, errMessages.BAD_REQUEST),
  async (req: Request, res: Response, next: NextFunction) => {
    const signUpSchema = zod.object({
      firstName: zod.string(),
      lastName: zod.string(),
      password: zod.string(),
      username: zod.string().email(),
    });

    const { success } = signUpSchema.safeParse(req.body);

    if (!success) {
      return responseStructure({
        res,
        statusCode: 411,
        data: errMessages.BAD_REQUEST,
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(
        req.body.password,
        environment.SALT_ROUNDS
      );
      const user = await User.create({ ...req.body, password: hashedPassword });
      const userToken = jwt.sign({ userId: user._id }, environment.JWT_SECRET);
      responseStructure({
        res,
        data: {
          msg: 'User created successfully',
          info: { token: userToken },
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/signin',
  async (req: Request, res: Response, next: NextFunction) => {
    const signInSchema = zod.object({
      password: zod.string(),
      username: zod.string().email(),
    });

    const { success } = signInSchema.safeParse(req.body);

    if (!success) {
      return responseStructure({
        res,
        statusCode: 411,
        data: errMessages.BAD_REQUEST,
      });
    }

    const username = req.body.username;
    const password = req.body.password;
    const userFound = await User.findOne({ username, password });

    if (userFound) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        userFound.password
      );

      if (isPasswordCorrect) {
        const userToken = jwt.sign(
          { userId: userFound._id },
          environment.JWT_SECRET
        );

        responseStructure({
          res,
          data: {
            msg: 'User created successfully',
            info: { token: userToken },
          },
        });
      }
    }

    responseStructure({ res, statusCode: 411, data: errMessages.LOGIN_ERROR });
  }
);

router.post('/update-profile', () => {});

export default router;
