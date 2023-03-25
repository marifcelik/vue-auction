import express from 'express'
import authCheck from '../middlewares/auth.middleware'
import products from '../utils/products'

const router = express.Router()

router.use(authCheck)
router.get('/', (_, res) => {
  res.json(products)
})

export default router
