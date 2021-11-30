import mongoose from 'mongoose';

const feedSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  createData:{
    type: Date,
    required: true,
  },
  updateData:{
    type: Date,
  },
  deleteData:{
    type: Date,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  likes: {
    type: Array,
  },
  images: {
    type: Array,
  },
  labels: {
    type: Array,
  },
});

const feed = mongoose.model('feed', feedSchema);

export { feed };
