import express from 'express';
import kavenegar from 'kavenegar';

import { iranMobileRegex } from '../helpers/regexHelper';
import { signUpVerificationCode } from '../models/signUpVerificationCode';

const router = express.Router();

// getVerificationCode
router.post('/getVerificationCode', (req, res) => {
  const { mobileNumber } = req.body;

  if (iranMobileRegex.exec(mobileNumber)) {
    const randomVerificationCode = Math.floor(Math.random() * 90000) + 10000;
    const SMSserver = kavenegar.KavenegarApi({ apikey: process.env.SMS_TOKEN });
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
              SMSserver.Send({
                message: `کد احراز هویت شما در سامانه مرکز پیشرفت ${randomVerificationCode} میباشد`,
                sender: process.env.SMS_SENDER_NUMBER,
                receptor: mobileNumber,
              });

              res.send({
                message: 'verification code sent',
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

  const userVerificationCode = signUpVerificationCode
    .findOne({ mobileNumber })
    .then(value => {
      console.log('value: ', value);
      // todo: check timeout

      if (String(value.verificationCode) === String(verificationCode)) {
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

export default router;
