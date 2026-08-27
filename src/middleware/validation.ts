import { Request, Response, NextFunction } from 'express';
import { RegisterRequest } from '../types/auth.types';

/**
 * Email validation regex
 * More robust pattern that checks:
 * - Local part: alphanumeric, dots, hyphens, underscores
 * - Domain part: alphanumeric, dots, hyphens
 * - TLD: at least 2 characters
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Maximum email length (standard database limit)
 */
const MAX_EMAIL_LENGTH = 255;

/**
 * Validation middleware for user registration
 * Validates email format, password length, and name length
 */
export function validateRegistration(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { email, password, name } = req.body as Partial<RegisterRequest>;

  const errors: string[] = [];

  // Validate email
  if (!email) {
    errors.push('Email is required');
  } else {
    // Normalize email: trim whitespace and convert to lowercase
    const normalizedEmail = email.trim().toLowerCase();

    // Update the request body with normalized email
    req.body.email = normalizedEmail;

    // Check email length
    if (normalizedEmail.length > MAX_EMAIL_LENGTH) {
      errors.push(`Email must not exceed ${MAX_EMAIL_LENGTH} characters`);
    }

    // Validate email format
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      errors.push('Email must be a valid email address');
    }
  }

  // Validate password
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  // Validate name
  if (!name) {
    errors.push('Name is required');
  } else if (name.length > 255) {
    errors.push('Name must not exceed 255 characters');
  }

  // If there are validation errors, return 400
  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors,
    });
    return;
  }

  next();
}
