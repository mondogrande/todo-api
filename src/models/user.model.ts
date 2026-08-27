import { pool } from '../database/pool';
import { User, UserRow } from '../types/auth.types';

/**
 * Convert database row (snake_case) to User object (camelCase)
 * Never expose password_hash in User object
 */
function rowToUser(row: Omit<UserRow, 'password_hash'>): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * UserModel - Data access layer for users
 */
export class UserModel {
  /**
   * Create a new user in the database
   * @param email - User email (must be unique)
   * @param passwordHash - Bcrypt hashed password
   * @param name - User name
   * @returns Promise<User> - Created user (without password_hash)
   */
  static async createUser(
    email: string,
    passwordHash: string,
    name: string
  ): Promise<User> {
    const query = `
      INSERT INTO users (email, password_hash, name)
      VALUES ($1, $2, $3)
      RETURNING id, email, name, created_at, updated_at
    `;

    const result = await pool.query<Omit<UserRow, 'password_hash'>>(query, [
      email,
      passwordHash,
      name,
    ]);

    return rowToUser(result.rows[0]);
  }

  /**
   * Find a user by email (includes password_hash for authentication)
   * @param email - User email
   * @returns Promise<UserRow | null> - User row with password_hash, or null if not found
   */
  static async findByEmail(email: string): Promise<UserRow | null> {
    const query = `
      SELECT id, email, password_hash, name, created_at, updated_at
      FROM users
      WHERE email = $1
    `;

    const result = await pool.query<UserRow>(query, [email]);

    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Check if an email already exists in the database
   * @param email - User email
   * @returns Promise<boolean> - True if email exists
   */
  static async emailExists(email: string): Promise<boolean> {
    const query = `
      SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)
    `;

    const result = await pool.query<{ exists: boolean }>(query, [email]);

    return result.rows[0].exists;
  }
}
