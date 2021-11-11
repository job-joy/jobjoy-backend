import express from 'express';
import kavenegar from 'kavenegar';

import { iranMobileRegex } from '../helpers/regexHelper';

const router = express.Router();

// getVerificationCode
router.post('/getVerificationCode', async (req, res) => {
  const { mobileNumber } = req.body;

  if (iranMobileRegex.exec(mobileNumber)) {
    const randomVerificationCode = Math.floor(Math.random() * 90000) + 10000;
    const SMSserver = kavenegar.KavenegarApi({ apikey: process.env.SMS_TOKEN });

    try {
      await SMSserver.Send({
        message: randomVerificationCode,
        sender: '100047778',
        receptor: mobileNumber,
      });

      res.send({
        message: 'verification code sent',
      });
    } catch (error) {
      console.log('error: ', error);
      res.send({
        message: 'internal error',
      });
    }
  } else {
    res.send({
      message: 'mobile format is not valid',
    });
  }
});

export default router;
