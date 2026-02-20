import { getUsers } from '@/controllers/userController';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', getUsers);
export default router;
