import { NextFunction, Request, Response } from 'express';
import { HttpCode, errorResponse } from '../helpers/constants';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	res.status(HttpCode.SERVER_ERROR).send(errorResponse);
};
