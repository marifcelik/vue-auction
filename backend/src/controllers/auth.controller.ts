import { Request, Response } from 'express';
import { COOKIE_NAME } from '../config';
import { logger } from '../utils/logger';
import jobHandler from '../utils/jobHandler';
import { remainingTime } from '../utils/countdown'
import User from '../models/User.model';

class AuthController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const [result, err] = await jobHandler(User.login(username, password))

    if (err)
      return res.status(400).send({ msg: 'username or password is incorrect' });

    req.session.user = { username };
    return res.status(200).json({ msg: 'ok', coutdown: remainingTime(), result });
  }

  check(_: Request, res: Response) {
    console.log(remainingTime())
    res.status(200).json({ remainingTime: remainingTime() });
  }

  logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) logger.warn(err);
    });
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({ msg: 'ok' });
  }
}

export default new AuthController();
