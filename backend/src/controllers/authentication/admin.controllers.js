import jwt from 'jsonwebtoken';
import { User } from '../../db/models/user.model.js';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Signup controller
export const admin_signupRoute = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ token, user: { id: newUser._id, username, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login controller
export const admin_loginRoute = async (req, res) => {
  res.send('User base route is working');
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.status(200).json({ token, user: { id: user._id, username: user.username, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  
};

// Logout controller
export const admin_logoutRoute = (req, res) => {
  // If you're using tokens, you can't truly "log out" on the server
  // But you can clear the token on the client
  res.status(200).json({ message: 'Logged out successfully' });
};
