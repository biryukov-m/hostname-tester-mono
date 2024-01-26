import { Application } from 'express';
import authRouter from './auth/auth.route';
import passwordRouter from './api/password.route';

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/password', passwordRouter);
    this.app.use('/auth', authRouter);
  }
}

export default AppRouter;
