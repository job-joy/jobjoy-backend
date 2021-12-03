import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
});

const userActivity = mongoose.model('userActivity', userActivitySchema);
export { userActivity };
