import { Router } from 'express';
import { tryCatch } from '../../middleware/try-catch.middleware';
import passwordController from '../../controllers/password.controller';

const router = Router();

// @route   POST api/password/add
// @desc    Authorize user given their email and password, returns the token upon successful registration
// @access  Public
router.post('/add', tryCatch(passwordController.addPassword.bind(passwordController)));

// @route   GET api/password
// @desc    Get all passwords
// @access  Public
router.get('', tryCatch(passwordController.getAllPasswords.bind(passwordController)));

export default router;
