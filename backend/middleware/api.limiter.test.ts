import express, { Request, Response, Router } from 'express';
import request from 'supertest';

import { HttpCode } from '../helpers/constants';
import { apiLimiter } from './api.limiter';

const app = express();
const router = Router();

router.route('/book/').get((req: Request, res: Response) => res.sendStatus(HttpCode.OK));

app.use('/v2/', apiLimiter);
app.use('/v2', router);

describe('api limiter', () => {
	it('should return 200 OK when the rate limit is not exceeded', async () => {
		const response = await request(app).get('/v2/book/');
		expect(response.statusCode).toEqual(HttpCode.OK);
	});

	it('should respond with 429 Too Many Requests when the rate limit is exceeded', async () => {
		const rateLimit = 100;

		let response;
		for (let i = 0; i <= rateLimit; i++) {
			response = await request(app).get('/v2/book/');
		}
		expect(response?.statusCode).toEqual(HttpCode.TOO_MANY_REQUESTS);
		expect(response?.body).toEqual({
			success: false,
			message: 'Too many requests, please try again later.'
		});
	});
});
