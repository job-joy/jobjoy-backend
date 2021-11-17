import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11,
    unique: true,
  },
  signUpDate: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
    maxlength: 120,
  },
  birthday: {
    type: Date,
    // required: true, //todo : make it require
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 240,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 240,
  },
  gender: {
    type: String,
    required: true,
    maxlength: 50,
  },
  password:{
    type: String,
    required: true,
    maxlength: 2048,
  }
});

const user = mongoose.model('user', userSchema);
export { user };
