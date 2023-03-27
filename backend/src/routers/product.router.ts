import express from 'express'
import productController from '../controllers/product.controller'
import authCheck from '../middlewares/auth.middleware'

const router = express.Router()

router.use(authCheck)
router.get('/', productController.getAll)
router.get('/:prodId', productController.getProdById)

export default router
