import { Router } from 'express';
import todoRoutes from './todo.routes';
import authRoutes from './auth.routes';

/**
 * Main router - aggregates all route modules
 */
const router = Router();

/**
 * Mount authentication routes at /api/auth
 */
router.use('/auth', authRoutes);

/**
 * Mount todo routes at /api/todos
 */
router.use('/todos', todoRoutes);

export default router;
