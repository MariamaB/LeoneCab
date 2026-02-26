import { prisma } from '@prismaClient';

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};
