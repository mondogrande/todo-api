import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';

/**
 * Todo routes
 */
const router = Router();

/**
 * GET /api/todos - Get all todos
 */
router.get('/', TodoController.getTodos);

export default router;
