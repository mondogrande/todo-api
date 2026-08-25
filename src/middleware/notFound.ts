import { Request, Response } from 'express';
import { ApiResponse } from '../types/todo.types';

/**
 * 404 Not Found middleware
 * Handles requests to non-existent routes
 */
export function notFound(req: Request, res: Response<ApiResponse<never>>): void {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.path} not found`,
  });
}
