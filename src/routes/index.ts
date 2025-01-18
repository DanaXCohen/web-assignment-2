import express from 'express';
import { isAuthorized } from '../middleware/auth';
import postRoutes from './posts_routes';
import userRoutes from './users_routes';
import authRoutes from './auth_routes'

const router = express.Router();

router.use('/posts', isAuthorized, postRoutes);
router.use('/users', isAuthorized, userRoutes);
router.use('/auth', authRoutes);

export default router;
