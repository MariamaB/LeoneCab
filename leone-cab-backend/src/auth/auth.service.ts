import prisma from '@prismaClient';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '@/utils/token';
import { IUser } from '@/models/user';
import dotenv from 'dotenv';
dotenv.config();

export const registerUser = async (data: any) => {
  const { email, password, phone, name, role }: IUser = data.body;

  console.log(
    `Registering user with email: ${email}, phone: ${phone}, name: ${name}, role: ${role}`,
  );
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phone }],
    },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await argon2.hash(password);

  const user: IUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      phone,
      name,
    },
  });

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id);

  return { accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error('Invalid credentials');

  const valid = await argon2.verify(user.password, password);
  if (!valid) throw new Error('Invalid credentials');

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id);

  return { accessToken, refreshToken };
};

export const refreshAccessToken = (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;

  return generateAccessToken(decoded.userId, decoded.role);
};
