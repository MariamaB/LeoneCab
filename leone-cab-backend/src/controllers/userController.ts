import prisma from '@prismaClient';

export const getUsers = async (req: any, res: any) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
