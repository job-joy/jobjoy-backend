import kavenegar from 'kavenegar';

export const sendSMS = (message, mobileNumber) => {
  const SMSserver = kavenegar.KavenegarApi({ apikey: process.env.SMS_TOKEN });

  SMSserver.Send({
    message: message,
    sender: process.env.SMS_SENDER_NUMBER,
    receptor: mobileNumber,
  });
};
