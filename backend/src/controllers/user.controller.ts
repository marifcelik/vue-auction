import { Request, Response } from 'express';
import { IUser } from '../models/User.model';
import User from '../models/User.model';
import jobHandler from '../utils/jobHandler';

// TODO: replace status codes with the jobHandler returns
class UserController {
  async createUser(req: Request, res: Response) {
    const data = req.body as IUser;
    const user = new User(data);

    const [result, err] = await jobHandler(user.save());
    if (err) return res.status(500).json({ err });

    return res.status(201).json({ result });
  }

  async getUser(req: Request, res: Response) {
    const userId = req.params.userId;

    const [result, err] = await jobHandler(User.findOne({ _id: userId }));
    if (err) return res.status(500).json({ err });

    return result
      ? res.status(200).json({ result })
      : res.status(404).json({ message: 'user not found' });
  }

  async getAllUsers(_req: Request, res: Response) {
    const [result, err] = await jobHandler(User.find().select('-password -createdAt -updatedAt'));
    if (err) return res.status(500).json({ err });

    return res.status(200).json({ result });
  }

  async updateUser(req: Request, res: Response) {
    const userId = req.params.userId;
    const data = req.body as IUser;

    const [_, err] = await jobHandler(User.findByIdAndUpdate(userId, data));
    if (err) return res.status(500).json({ err });

    return res.status(201).json({ message: 'update successfull' });
  }

  async deleteUser(req: Request, res: Response) {
    const userId = req.params.userId;

    const [_, err] = await jobHandler(User.findByIdAndDelete(userId));
    if (err) return res.status(500).json({ err });

    return res.status(202).json({ message: 'user deleted' });
  }
}

export default new UserController();
