import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (userId: string, role: Role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ userId, role }, process.env.JWT_SECRET!, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: string) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
  }
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
};
