import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { swaggerOptions } from './swaggerConfig';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import userRoutes from '@/user/user.routes';

import { errorHandler } from '@/error/errorHandler';
import { notFound } from '@/error/notFound';
import healthRoutes from '@/health/health.routes';
import authRoutes from '@/auth/auth.routes';
import { authenticate } from '@/auth/auth.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.json({ message: 'Leone Cab API running 🚖' });
});

// Define your routes and controllers here
app.use('/user', authenticate, userRoutes);

// Auth Routen
app.use('/auth', authRoutes);

// Beispiel: geschützte Route
// app.use('/protected', authMiddleware, (req, res) => {
//   res.json({ message: 'You are authenticated!' });
// });

// app.use('POST /rides/accept', requireDriver);

// Health check endpoint
app.use('/health', healthRoutes);

// 404
app.use(notFound);

// error handler (immer ganz unten!)
app.use(errorHandler);
export default app;
