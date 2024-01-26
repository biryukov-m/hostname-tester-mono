import { Application } from 'express';
import authRouter from './api/auth.route';
import passwordRouter from './api/password.route';

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/auth', authRouter);
    this.app.use('/api/password', passwordRouter);
  }
}

export default AppRouter;
