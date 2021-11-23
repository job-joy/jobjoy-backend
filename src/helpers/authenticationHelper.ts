import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { user } from '../models/user';

const generateNewJWTSecretToken = (): string => {
  return crypto.randomBytes(64).toString('hex');
};

export const generateNewToken = (username: string): string => {
  const newToken = jwt.sign({ username }, process.env.JWT_SECRET_TOKEN, {
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

      req.user = user;

      next();
    },
  );
};

export const getUserByToken = async token => {
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, mobileNumber) => {
    if (error) throw error;

    user
      .findOne({ mobileNumber })
      .then(user => {
        return user;
      })
      .catch(error => {
        throw error;
      });
  });
};
