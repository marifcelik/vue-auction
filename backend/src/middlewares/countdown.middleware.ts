import { NextFunction, Request, Response } from "express";
import { remainingTime } from "../utils/countdown";

function countDownCheck(_: Request, res: Response, next: NextFunction) {
  if (!(remainingTime() > 0))
    return res.status(400).json({ msg: 'auction completed' })
    
  next()
}

export default countDownCheck
