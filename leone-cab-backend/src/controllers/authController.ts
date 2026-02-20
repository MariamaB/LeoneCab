import { Request, Response } from 'express';
import prisma from '@prismaClient';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

// Registrieren
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, phone, name, role } = req.body;

    // Prüfen, ob Nutzer schon existiert
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash
    const hashedPassword = await argon2.hash(password);

    // User in DB speichern
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        phone,
        name,
      },
    });

    // res.status(201).json({
    //   message: 'User registered successfully',
    //   token,
    // });
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      },
    );

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// export const register: any = (user: any) => {
//   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
//     expiresIn: '1h',
//   });

//   const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//   return decoded;
// };
