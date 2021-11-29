import kavenegar from 'kavenegar';

/**
 * send sms with kavenegar API
 * @function sendSMS
 * @param {string} message
 * @param {string} mobileNumber
 * @returns {void}
 */
export const sendSMS = (message: string, mobileNumber: string): void => {
  const SMSserver = kavenegar.KavenegarApi({ apikey: process.env.SMS_TOKEN });

  SMSserver.Send({
    message: message,
    sender: process.env.SMS_SENDER_NUMBER,
    receptor: mobileNumber,
  });
};
