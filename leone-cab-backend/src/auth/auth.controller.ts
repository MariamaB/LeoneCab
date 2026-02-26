import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser } from '@/auth/auth.service';
import { generateAccessToken } from '@/utils/token';
import dotenv from 'dotenv';
import { loginValidate } from '@/utils/validator';

dotenv.config();

export const register = async (req: Request, res: Response) => {
  try {
    const validation = loginValidate(req, res);
    if (validation) {
      return validation;
    }

    const tokens = await registerUser(req);
    return res.status(201).json(tokens);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validation = loginValidate(req, res);
    if (validation) {
      return validation;
    }
    const tokens = await loginUser(req.body.email, req.body.password);
    return res.status(200).json(tokens);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const validation = loginValidate(req, res);
  if (validation) {
    return validation;
  }
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token' });
  }

  try {
    const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

    const newAccessToken = generateAccessToken(decoded.userId, decoded.role);

    return res.status(200).json({ accessToken: newAccessToken });
  } catch {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};
