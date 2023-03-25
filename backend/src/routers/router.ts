import express from 'express';
import userRouter from './user.router';
import authRouter from './auth.router';
import bidRouter from './bid.router';
import productRouter from './product.router';

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/bid', bidRouter);
router.use('/products', productRouter)

router.get('/healthcheck', (req, res) => {
  console.log(req.session.user)
  res.sendStatus(200);
});

export default router;
