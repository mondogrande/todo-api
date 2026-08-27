import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';
import { RegisterRequest, AuthResponse } from '../types/auth.types';
import { hashPassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { ApiResponse } from '../types/todo.types';

/**
 * AuthController - HTTP request handlers for authentication endpoints
 */
export class AuthController {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  static async register(
    req: Request,
    res: Response<ApiResponse<AuthResponse>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password, name } = req.body as RegisterRequest;

      // Check if email already exists
      const emailExists = await UserModel.emailExists(email);
      if (emailExists) {
        res.status(409).json({
          success: false,
          error: 'Email already registered',
        });
        return;
      }

      // Hash password
      const passwordHash = await hashPassword(password);

      // Create user
      const user = await UserModel.createUser(email, passwordHash, name);

      // Generate JWT token
      const token = generateToken({
        userId: user.id,
        email: user.email,
      });

      // Return success response with user and token
      res.status(201).json({
        success: true,
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
