import { NextFunction, Request, Response } from 'express';

function authCheck(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) return res.sendStatus(401);

  req.session.user.dd = true;
  next();
}

export default authCheck;
