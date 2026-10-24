import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../db/models/user.model.js';
import { cleanEmail, isString, validPassword } from '../../lib/validate.js';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Signup controller
export const admin_signupRoute = async (req, res) => {
  const { username, password } = req.body || {};
  const email = cleanEmail(req.body?.email);
  if (!isString(username) || !username.trim() || !email || !validPassword(password)) {
    return res.status(400).json({ message: 'Valid username, email and a password of 6+ characters are required' });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: username.trim(), email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login controller
export const admin_loginRoute = async (req, res) => {
  const email = cleanEmail(req.body?.email);
  const password = req.body?.password;
  if (!email || !isString(password)) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.status(200).json({ token, user: { id: user._id, username: user.username, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
  
};

// Logout controller
export const admin_logoutRoute = (req, res) => {
  // If you're using tokens, you can't truly "log out" on the server
  // But you can clear the token on the client
  res.status(200).json({ message: 'Logged out successfully' });
};
