

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: String,             // OTP stored temporarily
  otpExpires: Date,        // Expiration time for OTP
  isVerified: { type: Boolean, default: false },  // Verification status
});

const User = mongoose.model('User', userSchema);

export default User;

