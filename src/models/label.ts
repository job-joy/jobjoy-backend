import mongoose from 'mongoose';

const labelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  color:{
    type: Date,
    required: true,
  },
  icon:{
    type: Date,
  },
});

const label = mongoose.model('label', labelSchema);

export { label };
