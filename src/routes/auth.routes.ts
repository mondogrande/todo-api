import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRegistration, validateLogin } from '../middleware/validation';

/**
 * Authentication routes
 */
const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 * Request body: { email, password, name }
 * Response: { success, data: { user, token } }
 */
router.post('/register', validateRegistration, AuthController.register);

/**
 * POST /api/auth/login
 * Login a user
 * Request body: { email, password }
 * Response: { success, data: { user, token } }
 */
router.post('/login', validateLogin, AuthController.login);

export default router;
