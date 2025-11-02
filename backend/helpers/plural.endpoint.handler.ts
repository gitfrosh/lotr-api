import { Request, Response } from 'express';
import { HttpCode, notFoundResponse } from './constants';

export const pluralEndpointHandler = (req: Request, res: Response) => {
        if (req.path.toLowerCase().endsWith('s')) {
        return res.status(HttpCode.NOT_FOUND).send({
            success: false,
            message: `Not found. Did you mean to use the singular version of the endpoint, ${req.path.substring(0, req.path.length - 1)}?`
        });
    }

    return res.status(HttpCode.NOT_FOUND).send(notFoundResponse);
};