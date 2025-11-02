import express from 'express';
import { Request, Response } from 'express';
import request from 'supertest';
import { describe, expect } from '@jest/globals';

import { pluralEndpointHandler } from './plural.endpoint.handler';
import { HttpCode } from './constants';

const app = express();
const router = express.Router();

router.route('/book').get((req: Request, res: Response) => {
    return res.status(HttpCode.OK).send();
});

router.route('*').get((req, res) => {
	return pluralEndpointHandler(req, res);
});

app.use(router)

describe('plural endpoint handler', () => {
    it('should return 200 when the path does not end with s', async () => {
        const response = await request(app).get('/book');
        expect(response.statusCode).toEqual(HttpCode.OK);
    });

    it('should return 404 when the path ends with s', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toEqual(HttpCode.NOT_FOUND);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Not found. Did you mean to use the singular version of the endpoint, /book?");
    });
});