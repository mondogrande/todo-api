import { Request, Response, NextFunction } from 'express';
import { TodoModel } from '../models/todo.model';
import { ApiResponse, Todo } from '../types/todo.types';

/**
 * TodoController - HTTP request handlers for todo endpoints
 */
export class TodoController {
  /**
   * Get all todos
   * GET /api/todos
   */
  static async getTodos(
    _req: Request,
    res: Response<ApiResponse<Todo[]>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const todos = await TodoModel.getAllTodos();

      res.status(200).json({
        success: true,
        data: todos,
        count: todos.length,
      });
    } catch (error) {
      next(error);
    }
  }
}
