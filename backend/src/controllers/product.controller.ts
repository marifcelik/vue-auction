import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product.model';
import jobHandler from '../utils/jobHandler';

class ProductController {
  async createProduct(req: Request, res: Response) {
    const data = req.body as IProduct;
    const prod = new Product(data);

    const [result, err] = await jobHandler(prod.save());
    if (err) return res.status(500).json({ err });

    return res.status(201).json({ result });
  }

  async getProductById(req: Request, res: Response) {
    const productId = req.params.id;

    const [result, err] = await jobHandler(Product.findOne({ _id: productId }));
    if (err) return res.status(500).json({ err });

    return result
      ? res.status(200).json({ result })
      : res.status(404).json({ message: 'product not found' });
  }

  async getProductsByUserId(req: Request, res: Response) {
    const userId = req.params.userId;

    const [result, err] = await jobHandler(Product.find({ userId }));
    if (err) return res.status(500).json({ err });

    return result
      ? res.status(200).json({ result })
      : res.status(404).json({ message: 'Product not found' });
  }
}

export default new ProductController();
