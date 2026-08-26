import { Router } from 'express';
import todoRoutes from './todo.routes';

/**
 * Main router - aggregates all route modules
 */
const router = Router();

/**
 * Mount todo routes at /api/todos
 */
router.use('/todos', todoRoutes);

export default router;
