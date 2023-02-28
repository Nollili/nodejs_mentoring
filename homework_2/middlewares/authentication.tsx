import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authLogin = () => {
  return (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null )return res.status(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) =>{
      if (error) return res.status(403)
      req.user = user
      next()
    })
  }
}