import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { user } from '../models/user';

const generateNewJWTSecretToken = (): string => {
  return crypto.randomBytes(64).toString('hex');
};

export const generateNewToken = (mobileNumber: string): string => {
  const newToken = jwt.sign({ mobileNumber }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: '3600s',
  });

  return newToken;
};

export const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.JWT_SECRET_TOKEN as string,
    (err: any, user: any) => {
      console.log(err);

      if (err) return res.sendStatus(403);
      // todo: it can throw error if token has been changed with compare from db here

      req.user = user;

      next();
    },
  );
};

export const getUserByToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (error, mobileNumber) => {
    if (error) {
      console.log('error: ', error);
      next();
    }
    const _user = await user.findOne({ mobileNumber: mobileNumber?.mobileNumber });
    req.user = _user;

    next();
  });
};
