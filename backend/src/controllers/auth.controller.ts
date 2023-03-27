import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { COOKIE_NAME } from '../config';

class AuthController {
  login(req: Request, res: Response) {
    const { username, password } = req.body;
    if (username === 'arif' && password === 'deneme') {
      const user = { username, role: 'admin' };
      req.session.user = user;
      return res.status(200).json({ msg: 'ok', id: 1 });
    }
    res.status(400).send({ msg: 'username or password is incorrect' });
  }

  check(_: Request, res: Response) {
    res.sendStatus(200);
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
