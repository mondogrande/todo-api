import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRegistration } from '../middleware/validation';

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

export default router;
