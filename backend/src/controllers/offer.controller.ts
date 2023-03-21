import { Request, Response } from 'express';
import Offer, { IOffer } from '../models/Offer.model';
import jobHandler from '../utils/jobHandler';

class OfferController {
  async createOffer(req: Request, res: Response) {
    const data = req.body as IOffer;
    const offer = new Offer(data);

    const [result, err] = await jobHandler(offer.save());
    if (err) return res.status(500).json({ err });

    return res.status(201).json({ result });
  }

  async getOffersByProductId(req: Request, res: Response) {
    const productId = req.params.productId;

    const [result, err] = await jobHandler(
      Offer.find({ _id: productId }, undefined, { sort: { offer: -1 } })
    );
    if (err) return res.status(500).json({ err });

    return result
      ? res.status(200).json({ result })
      : res.status(404).json({ message: 'Offer not found' });
  }

  async getOffersByUserId(req: Request, res: Response) {
    const userId = req.params.userId;

    const [result, err] = await jobHandler(Offer.find({ userId }));
    if (err) return res.status(500).json({ err });

    return result
      ? res.status(200).json({ result })
      : res.status(404).json({ message: 'Offer not found' });
  }
}

export default new OfferController();
