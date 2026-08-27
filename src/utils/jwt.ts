import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { JwtPayload } from '../types/auth.types';

/**
 * Get JWT secret from environment
 * Throws error if not configured (fail fast in development)
 */
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      'JWT_SECRET environment variable is not configured. ' +
        'Please generate a strong secret (e.g., using: ' +
        'node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))")'
    );
  }
  return secret;
}

/**
 * Get JWT expiration time from environment (default: 7d)
 */
function getJwtExpiresIn(): StringValue | number {
  return (process.env.JWT_EXPIRES_IN || '7d') as StringValue | number;
}

/**
 * Generate a JWT token for a user
 * @param payload - JWT payload containing user information
 * @returns string - Signed JWT token
 */
export function generateToken(payload: JwtPayload): string {
  const expiresIn = getJwtExpiresIn();
  // jwt.sign accepts both string and number for expiresIn
  // string format: '7d', '24h', '60m', etc.
  // number format: seconds as integer
  return jwt.sign(payload, getJwtSecret(), { expiresIn });
}

/**
 * Verify and decode a JWT token
 * @param token - JWT token to verify
 * @returns JwtPayload - Decoded payload if valid
 * @throws Error if token is invalid or expired
 */
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
}
