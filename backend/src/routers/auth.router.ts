import express from 'express';
import authController from '../controllers/auth.controller';
import authCheck from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/check', authCheck, authController.check);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;
