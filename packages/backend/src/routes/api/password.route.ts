import { Router } from 'express';
import { tryCatch } from '../../middleware/try-catch.middleware';
import passwordController from '../../controllers/password.controller';

const router = Router();

// @route   POST api/password
// @desc    Create new password
// @access  Public
router.post('', tryCatch(passwordController.add.bind(passwordController)));

// @route   PUT api/password
// @desc    Update existing password by id
// @access  Public
router.put('', tryCatch(passwordController.update.bind(passwordController)));

// @route   DELETE api/password
// @desc    Delete password by id
// @access  Public
router.delete('', tryCatch(passwordController.delete.bind(passwordController)));

// @route   GET api/password
// @desc    Get all passwords
// @access  Public
router.get('', tryCatch(passwordController.getAll.bind(passwordController)));

export default router;
