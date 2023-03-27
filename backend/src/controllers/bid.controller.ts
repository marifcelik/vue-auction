import { Request, Response } from 'express';
import Bid, { IBid } from '../models/Bid.model';
import { wsBroadcast } from '../services/ws';
import jobHandler from '../utils/jobHandler';

class BidController {
  async createBid(req: Request, res: Response) {
    const data = req.body as IBid;

    const [result, err] = await jobHandler(Bid.create(data));
    if (err) return res.status(500).json({ err });

    wsBroadcast(data)
    return res.status(201).json({ result });
  }

  async getBidsByProductId(req: Request, res: Response) {
    const productId = req.params.productId;

    const [result, err] = await jobHandler(
      Bid.find({ _id: productId }, undefined, { sort: { bid: -1 } })
    );
    if (err) return res.status(500).json({ err });

    return result
      ? res.status(200).json({ result })
      : res.status(404).json({ message: 'Bid not found' });
  }

  async getBidsByUserId(req: Request, res: Response) {
    const userId = req.params.userId;

    const [result, err] = await jobHandler(Bid.find({ userId }));
    if (err) return res.status(500).json({ err });

    return result
      ? res.status(200).json({ result })
      : res.status(404).json({ message: 'Bid not found' });
  }
}

export default new BidController();
