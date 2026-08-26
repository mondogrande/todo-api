import bcrypt from 'bcrypt';

/**
 * Salt rounds for bcrypt hashing (10 is secure and performs well)
 */
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password using bcrypt
 * @param password - Plain text password
 * @returns Promise<string> - Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plain text password with a hashed password
 * @param password - Plain text password
 * @param hash - Hashed password from database
 * @returns Promise<boolean> - True if passwords match
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
