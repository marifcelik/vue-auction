import express from 'express';
import offerController from '../controllers/offer.controller';
import authCheck from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authCheck)
router.post('/create', offerController.createOffer)
router.get('/get/p/:productId', offerController.getOffersByProductId)
router.get('/get/u/:userId', offerController.getOffersByUserId)

export default router;
