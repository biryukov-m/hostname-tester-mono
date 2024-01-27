import { Router } from 'express';
import { tryCatch } from '../../middleware/try-catch.middleware';
import authController from '../../controllers/auth.controller';

const router = Router();

// @route   POST api/auth
// @desc    Authorize user given their email and password, returns the token upon successful registration
// @access  Public
router.post('', tryCatch(authController.auth.bind(authController)));

export default router;
