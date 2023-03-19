import { Request, Response } from 'express';
import { COOKIE_NAME } from '../config';
import { logger } from '../utils/logger';

class AuthController {
  login(req: Request, res: Response) {
    const { username, password } = req.body;
    if (username === 'arif' && password === 'deneme') {
      const user = { username, role: 'admin' };
      req.session.user = user;
      return res.sendStatus(200);
    }
    res.status(400).send({ msg: 'username or password is incorrect' });
  }

  check(req: Request, res: Response) {
    logger.warn(req.session.id);
    res.status(206).send('its okey');
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
