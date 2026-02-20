import { Interface } from 'node:readline';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  phone: string;
  name: string;
  role: string;
}
