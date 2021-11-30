import mongoose from 'mongoose';

const labelSchema = new mongoose.Schema({

});

const label = mongoose.model('label', labelSchema);

export { label };
