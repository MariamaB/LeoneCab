import { Role } from '@prisma/client';
export interface IUser {
  id: string;
  email: string;
  password: string;
  phone: string;
  name: string;
  role: Role;
}
