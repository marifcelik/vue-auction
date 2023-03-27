import { Request, Response } from "express";
import products from "../utils/products";

class ProdController {
  getAll(_: Request, res: Response) {
    res.status(200).json(products)
  }

  getProdById(req: Request, res: Response) {
    const prodId = parseInt(req.params.prodId)
    const prod = products.find(prod => prod.id === prodId)
    if (!prod)
      return res.sendStatus(404);

    res.status(200).json(prod)
  }
}

export default new ProdController()
