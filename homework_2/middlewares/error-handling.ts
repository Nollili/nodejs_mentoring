import { Request, Response, NextFunction } from "express";

export const errorHandler = () => {
	return(err: Error, req: Request, res: Response, next: NextFunction) => {
		res.status(500).send('Something broke');
		next();
	}
}