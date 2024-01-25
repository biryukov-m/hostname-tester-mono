import express from 'express';
import AppRouter from './routes';
import 'dotenv/config';

const app = express();
const router = new AppRouter(app);

app.set('port', process.env.PORT || 4000);

router.init();

const port = app.get('port');
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
  // eslint-disable-next-line no-console
  console.log(`Server location: http://localhost:${port}`);
});

export default server;
