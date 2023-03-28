import { Request, Response } from 'express';
import { IUser, IUserModal } from '../models/User.model';
import User from '../models/User.model';
import jobHandler from '../utils/jobHandler';
import { Schema } from 'mongoose';

class UserController {
  async createUser(req: Request, res: Response) {
    const data = req.body as IUser;

    const [result, err] = await jobHandler(User.create(data));
    if (err) return res.status(500).json({ err });

    req.session.user = { username: result.user }

    return res.status(201).json({ result });
  }

  async getUser(username: string, password: string): Promise<IUserModal | null> {
    const [result, err] = await jobHandler(User.findOne({ username, password }));
    if (err || !result) return null;

    return result
  }

  async getUserById(id: Schema.Types.ObjectId): Promise<IUserModal> {
    const [result, err] = await jobHandler(User.findOne({ _id: id }))
    if (err) throw err

    return result
  }

  async getAllUsers(_req: Request, res: Response) {
    const [result, err] = await jobHandler(
      User.find().select('-password -createdAt -updatedAt')
    );
    if (err) return res.status(500).json({ err });

    return res.status(200).json({ result });
  }
}

export default new UserController();
