import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { user } from '../models/user';

/**
 * generate a random 64 bit string key for use in jwt
 * @function generateNewJWTSecretToken
 * @returns {string} jwt key
 */
const generateNewJWTSecretToken = (): string => {
  return crypto.randomBytes(64).toString('hex');
};

/**
 * generate new jwt token
 * @function generateNewToken
 * @param {string} mobileNumber 
 * @returns {string} new token
 */
export const generateNewToken = (mobileNumber: string): string => {
  const newToken = jwt.sign({ mobileNumber }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: '3600s',
  });

  return newToken;
};

/**
 * validate token middleware
 * @function validateToken
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {void}
 */
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

/**
 * authentication middleware
 * @function getUserByToken
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {void}
 */
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
