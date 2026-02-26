import { getUser, getUsers } from '@/user/user.controller';
import express from 'express';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Returns a user by ID
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "dbf49f13-5ab4-419d-b833-9d5c460b8536"
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
router.get('/:id', getUser);

/**
 * @swagger
 * /user/users:
 *   get:
 *     summary: Returns a list of users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/users', getUsers);
export default router;
