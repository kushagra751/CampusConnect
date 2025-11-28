import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  university: { type: String, default: "" },
  semester: { type: String, default: "" },
  age: { type: Number, default: 20 },
  profilePicture: { type: String, default: "" },
  settings: {
    muteNotifications: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: false },
    twoFactor: { type: Boolean, default: false },
  },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
