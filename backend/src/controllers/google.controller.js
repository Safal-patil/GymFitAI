import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js'; // adjust based on your structure
import { generateAccessAndRefereshTokens } from './user.controller.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'Google token missing' });
    }

    // Verify token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture, sub: googleId } = payload;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create user if not exists
      user = await User.create({
        name,
        email,
        avatar: picture,
        googleId,
        password: 'randomPass', // Optional: or a random string
        provider: 'google'
      });
    }

     const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    // Optional: store refresh token in DB or secure HTTP-only cookie
    user.refreshToken = refreshToken;
    await user.save();
    console.log('user', user);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        accessToken,
        refreshToken
      }
    });
  } catch (err) {
    console.error('Google Login Error:', err);
    res.status(500).json({
      success: false,
      message: 'Google login failed',
      error: err.message
    });
  }
};
