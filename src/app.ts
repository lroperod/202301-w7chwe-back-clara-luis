import express from 'express';
import apiRouter from './api/api-router.js';
import authRouter from './api/auth/auth-router.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.disable('x-powered-by');
app.get('/', (req, res) => {
  res.json('Server is working!!');
});

app.use(express.json());
app.use('/auth', authRouter);
app.use('/api/v1', apiRouter);

export default app;
