import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { COOKIE_NAME } from '../config';

class AuthController {
  login(req: Request, res: Response) {
    const { username, password } = req.body;
    if (username === 'arif' && password === 'deneme') {
      const user = { username, role: 'admin' };
      req.session.user = user;
      return res.status(200).json({ msg: 'ok' });
    }
    res.status(400).send({ msg: 'username or password is incorrect' });
  }

  check(req: Request, res: Response) {
    res.status(206).json({ msg: 'auth okey' });
  }

  logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) logger.warn(err);
    });
    res.clearCookie(COOKIE_NAME);
    res.sendStatus(200);
  }
}

export default new AuthController();
