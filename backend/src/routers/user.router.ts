import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/get', userController.getAllUsers);
router.get('/get/:userId', userController.getUser);
router.patch('/update/:userId', userController.updateUser);
router.delete('/delete/:userId', userController.deleteUser);

export default router;
