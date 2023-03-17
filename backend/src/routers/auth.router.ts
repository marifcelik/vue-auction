import express from 'express';
import authController from '../controllers/auth.controller';
import authCheck from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/login', authController.login);
router.get('/check', authCheck, authController.check);

export default router;
