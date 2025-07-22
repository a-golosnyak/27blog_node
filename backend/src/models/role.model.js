import mongoose from 'mongoose';

const roleScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

roleScheme.index({ name: 1 }, { unique: true });

export const Role = mongoose.model('role', roleScheme);
