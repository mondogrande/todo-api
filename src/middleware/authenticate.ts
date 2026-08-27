import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt';
import { ApiResponse } from '../types/todo.types';

/**
 * JWT authentication middleware
 * Verifies Bearer token from Authorization header and sets req.user
 * Returns 401 with appropriate error message on failure
 */
export function authenticate(
  req: Request,
  res: Response<ApiResponse<never>>,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader) {
    res.status(401).json({
      success: false,
      error: 'Missing authorization token',
    });
    return;
  }

  // Check for valid "Bearer <token>" format (case-insensitive)
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    res.status(401).json({
      success: false,
      error: 'Invalid authorization header format',
    });
    return;
  }

  const token = parts[1].trim();

  try {
    // Verify and decode the token
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    // Handle specific error types
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        error: 'Token has expired',
      });
      return;
    }

    // All other JWT errors (invalid signature, malformed, etc.)
    res.status(401).json({
      success: false,
      error: 'Invalid token',
    });
  }
}
