import { Request, Response, Router } from 'express';
import { tryCatch } from '../../middleware/try-catch.middleware';
import authController from '../../controllers/auth.controller';

const router = Router();

// @route   POST api/register
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post('/register', async (_req: Request, res: Response) => {
  res.send('Add registration logic here');
});

// @route   POST api/auth/add
// @desc    Authorize user given their email and password, returns the token upon successful registration
// @access  Public
router.post('/add', tryCatch(authController.addPassword.bind(authController)));

// @route   POST api/auth/
// @desc    Authorize user given their email and password, returns the token upon successful registration
// @access  Public
router.get('', tryCatch(authController.getAllPasswords.bind(authController)));

// @route   POST api/auth/
// @desc    Authorize user given their email and password, returns the token upon successful registration
// @access  Public
router.post('', tryCatch(authController.auth.bind(authController)));

export default router;
