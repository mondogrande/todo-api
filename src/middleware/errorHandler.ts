import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/todo.types';

/**
 * Global error handler middleware
 * Catches all errors and returns a consistent JSON response
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ApiResponse<never>>,
  _next: NextFunction
): void {
  // Log error for debugging (in production, use proper logging service)
  console.error('Error:', err);

  // Don't expose internal error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  const errorMessage = isDevelopment ? err.message : 'Internal server error';

  res.status(500).json({
    success: false,
    error: errorMessage,
  });
}
