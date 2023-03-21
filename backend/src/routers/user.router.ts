import express from 'express';
import userController from '../controllers/user.controller';
import authCheck from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/create', userController.createUser);

router.use(authCheck);

router.get('/get', userController.getAllUsers);
router.get('/get/:userId', userController.getUser);
router.patch('/update/:userId', userController.updateUser);
router.delete('/delete/:userId', userController.deleteUser);

export default router;
