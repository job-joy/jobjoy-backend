import express from 'express';

import { iranMobileRegex } from '../helpers/regexHelper';
import { sendSMS } from '../helpers/SMSHelper';

import { signUpVerificationCode } from '../models/signUpVerificationCode';
import { user } from '../models/user';

const router = express.Router();

// getVerificationCode
router.post('/getVerificationCode', (req, res) => {
  const { mobileNumber } = req.body;

  if (iranMobileRegex.exec(mobileNumber)) {
    const randomVerificationCode = Math.floor(Math.random() * 90000) + 10000;
    const requestDate = new Date();

    signUpVerificationCode
      .remove({ mobileNumber })
      .then(status => {
        console.log('remove status: ', status);

        signUpVerificationCode
          .create({
            mobileNumber,
            requestDate,
            verificationCode: randomVerificationCode,
          })
          .then(status => {
            console.log('create status: ', status);

            try {
              const preparedSmsMessage = `کد احراز هویت شما در سامانه مرکز پیشرفت ${randomVerificationCode} میباشد`;
              // sendSMS(preparedSmsMessage, mobileNumber);

              res.send({
                message: 'verification code sent',
                debug: randomVerificationCode,
              });
            } catch (error) {
              console.log('send sms error: ', error);
              res.send({
                message: 'internal error',
              });
            }
          })
          .catch(error => {
            console.log('create user error: ', error);
          });
      })
      .catch(error => {
        console.log('remove user error: ', error);
      });
  } else {
    res.send({
      message: 'mobile format is not valid',
    });
  }
});

// confirmVerificationCode
router.post('/confirmVerificationCode', async (req, res) => {
  const { mobileNumber, verificationCode } = req.body;

  signUpVerificationCode
    .findOne({ mobileNumber })
    .then(value => {
      // todo: check timeout

      if (value && String(value.verificationCode) === String(verificationCode)) {
        res.send({
          message: 'success',
        });
      } else {
        res.send({
          message: 'verification code is not valid',
          debug: `${value.verificationCode} , ${verificationCode}`,
        });
      }
    })
    .catch(error => {
      console.log('read verification code from db error: ', error);
      res.send(error);
    });
});

// signUp
router.post('/signUp', async (req, res) => {
  const {
    mobileNumber,
    verificationCode,
    birthday,
    firstName,
    lastName,
    gender,
    password,
  } = req.body;

  signUpVerificationCode
    .findOne({ mobileNumber })
    .then(value => {
      console.log('value: ', value);
      if (value && String(value.verificationCode) === String(verificationCode)) {
        user
          .create({
            mobileNumber,
            signUpDate: value.requestDate,
            role: 'user',
            birthday,
            firstName,
            lastName,
            gender,
            password, // todo: hash it
          })
          .then(result => {
            res.send({
              message: 'success',
              debug: result,
            });
          })
          .catch(error => {
            res.send({
              message: 'fail',
              debug: error,
            });
          });
      } else {
        res.send({
          message: 'verification code is not valid',
          debug: `${value?.verificationCode} , ${verificationCode}`,
        });
      }
    })
    .catch(error => {
      console.log('read verification code from db error: ', error);
      res.send({ error });
    });
});

// logIn
router.post('/login', async (req, res) => {
  const { mobileNumber, password } = req.body;

    user
    .findOne({ mobileNumber })
    .then(value => {
      if (value && String(value.password) === String(password)) {
        res.send({
          message: 'success',
          token:'Hi, I am a fake token. ha ha ha'
        });
      } else {
        res.send({
          message: 'password is not valid',
        });
      }
    })
    .catch(error => {
      console.log('read user from db error: ', error);
      res.send(error);
    });
});


export default router;
