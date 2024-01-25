import { Request, Response, Router } from 'express';

const router = Router();

// @route   POST api/register
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post('/register', async (_req: Request, res: Response) => {
  res.send('Add registration logic here');
});

// @route   POST api/auth
// @desc    Authorize user given their email and password, returns the token upon successful registration
// @access  Public
router.post('/auth', async (_req: Request, res: Response) => {
  res.send('Add auth logic here');
});

export default router;
