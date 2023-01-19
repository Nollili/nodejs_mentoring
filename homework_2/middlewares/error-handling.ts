import { Request, Response, NextFunction } from "express";

export const errorHandler = () => {
	return(err: Error, req: Request, res: Response, next: NextFunction) => {
		console.log(err.stack);
		res.status(500).send('Something broke');
		next();
	}
}