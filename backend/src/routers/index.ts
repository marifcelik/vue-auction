import express from 'express';
import userRouter from './user.router';
import authRouter from './auth.router';

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);

router.get('/healthcheck', (_req, res) => {
  res.sendStatus(200);
});

export default router;
