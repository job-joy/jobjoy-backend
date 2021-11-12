import mongoose from 'mongoose';

const signUpVerificationCodeSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11,
    unique: true,
  },
  requestDate: {
    type: Date,
    required: true,
  },
  verificationCode: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 5,
  },
});

const signUpVerificationCode = mongoose.model(
  'signUpVerificationCode',
  signUpVerificationCodeSchema,
);

export { signUpVerificationCode };
