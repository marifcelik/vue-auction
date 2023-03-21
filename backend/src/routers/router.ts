import express from 'express';
import userRouter from './user.router';
import authRouter from './auth.router';
import offerRouter from './offer.router';

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/offer', offerRouter);

router.get('/healthcheck', (req, res) => {
  console.log(req.session.user)
  res.sendStatus(200);
});

export default router;
