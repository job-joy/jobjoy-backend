import mongoose, { ObjectId } from 'mongoose';

const feedSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
  },
});

const feed = mongoose.model('feed', feedSchema);

export { feed };
