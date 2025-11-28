import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {sendOtpEmail} from '../../lib/email_generator.js';
import { User } from '../../db/models/user.model.js';
import OTPModel from '../../db/models/otp.model.js';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// ================== SIGNUP ==================
export const user_signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ 
      token, 
      user: { id: newUser._id, username, email } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ================== LOGIN ==================
export const user_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.status(200).json({ 
      token, 
      user: { id: user._id, username: user.username, email: user.email } 
    });
    
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ================== LOGOUT ==================
export const user_logout = (req, res) => {
  // With JWT, logout is handled client-side by deleting the token
  // But we can still return a message from the server
  res.status(200).json({ message: 'Logged out successfully' });
};

// ================== FORGET PASSWORD ==================

export const forget_user_pass = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found with this email!" 
      });
    }

    // Send OTP email
    const result = await sendOtpEmail(email);
    
    if (!result.success) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to send OTP email!" 
      });
    }

    // Save OTP to database
    await OTPModel.findOneAndDelete({ userId: user._id }); // Delete old OTP if exists
    const otpRecord = new OTPModel({
      userId: user._id,
      otp: result.otp.toString()
    });
    await otpRecord.save();

    return res.status(200).json({ 
      success: true, 
      message: `OTP has been sent successfully to ${email}!`
    });  
  
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send OTP email!", 
      error: error.message 
    });  
  }
};

// ================== VERIFY OTP ==================

export const verify_otp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found!" 
      });
    }

    const otpRecord = await OTPModel.findOne({ 
      userId: user._id, 
      otp: otp.toString() 
    });

    if (!otpRecord) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired OTP!" 
      });
    }

    // OTP is valid
    return res.status(200).json({ 
      success: true, 
      message: "OTP verified successfully!",
      email: email
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Failed to verify OTP!", 
      error: error.message 
    });
  }
};

// ================== RESET PASSWORD ==================

export const reset_password = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found!" 
      });
    }

    // Verify OTP
    const otpRecord = await OTPModel.findOne({ 
      userId: user._id, 
      otp: otp.toString() 
    });

    if (!otpRecord) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired OTP!" 
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Delete OTP after successful password reset
    await OTPModel.findByIdAndDelete(otpRecord._id);

    return res.status(200).json({ 
      success: true, 
      message: "Password reset successfully!" 
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Failed to reset password!", 
      error: error.message 
    });
  }
};

// ================== GET PROFILE ==================

export const get_profile = async (req, res) => {
  try {
    const userId = req.user?.id; // From JWT middleware

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized" 
      });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    return res.status(200).json({ 
      success: true, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email,
        university: user.university || "",
        semester: user.semester || "",
        age: user.age || 20,
        profilePicture: user.profilePicture || "",
        settings: user.settings || {
          muteNotifications: false,
          darkMode: false,
          twoFactor: false,
        }
      }
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Failed to get profile!", 
      error: error.message 
    });
  }
};

// ================== UPDATE PROFILE ==================

export const update_profile = async (req, res) => {
  try {
    const userId = req.user?.id; // From JWT middleware
    const { username, university, semester, age, profilePicture, settings } = req.body;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized" 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Update user fields
    if (username) user.username = username;
    if (university !== undefined) user.university = university;
    if (semester !== undefined) user.semester = semester;
    if (age !== undefined) user.age = age;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;
    if (settings) {
      if (settings.muteNotifications !== undefined) user.settings.muteNotifications = settings.muteNotifications;
      if (settings.darkMode !== undefined) user.settings.darkMode = settings.darkMode;
      if (settings.twoFactor !== undefined) user.settings.twoFactor = settings.twoFactor;
    }

    await user.save();

    return res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully!",
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email,
        university: user.university,
        semester: user.semester,
        age: user.age,
        profilePicture: user.profilePicture,
        settings: user.settings
      }
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Failed to update profile!", 
      error: error.message 
    });
  }
};
