import prisma from '@prismaClient';
import { Request, Response } from 'express';
import { getUserById } from '@/user/user.service';
import { userResponseSchema } from '@/schema/responseSchema';

export const getUser = async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // ❗ Passwort entfernen
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
  };

  // Optional: Validieren bevor senden
  userResponseSchema.parse(safeUser);

  return res.json(safeUser);
};

export const getUsers = async (req: any, res: any) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
