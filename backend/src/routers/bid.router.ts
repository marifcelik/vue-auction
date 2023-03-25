import express from 'express';
import bidController from '../controllers/bid.controller';
import authCheck from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authCheck);
router.post('/create', bidController.createBid);
router.get('/get/p/:productId', bidController.getBidsByProductId);
router.get('/get/u/:userId', bidController.getBidsByUserId);

export default router;
