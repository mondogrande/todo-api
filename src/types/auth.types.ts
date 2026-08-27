/**
 * User object (camelCase for API responses)
 */
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * User database row (snake_case from PostgreSQL)
 */
export interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * User registration request body
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

/**
 * Authentication response with user and token
 */
export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * JWT payload structure
 */
export interface JwtPayload {
  userId: number;
  email: string;
}
