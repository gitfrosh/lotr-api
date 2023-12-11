import express, { Request, Response, Router } from 'express';
import request from 'supertest';

import { HttpCode } from '../helpers/constants';
import authLimiter from './auth.limiter';

const app = express();
const router = Router();

const rateLimit = 1;
const hourWindow = 60 * 60 * 1000;

router.route('/register').post([
	authLimiter({
		windowMs: hourWindow,
		max: rateLimit,
		message: {
			success: false,
			message: 'Too many requests, please try again later.'
		}
	}),
	(req: Request, res: Response) => res.sendStatus(200)
]);

app.use(express.json());
app.use('/auth', router);

const requestBody = { email: 'fake@email.com', password: 'P@$$1' };

describe('auth limiter', () => {
	it('should return 200 OK when the rate limit is not exceeded', async () => {
		const response = await request(app).post('/auth/register/').send(requestBody);
		expect(response.statusCode).toEqual(HttpCode.OK);
	});

	it('should respond with 429 Too Many Requests when the rate limit is exceeded', async () => {
		let response;
		for (let i = 0; i <= rateLimit; i++) {
			response = await request(app).post('/auth/register/').send(requestBody);
		}
		expect(response?.statusCode).toEqual(HttpCode.TOO_MANY_REQUESTS);
		expect(response?.body).toEqual({
			success: false,
			message: 'Too many requests, please try again later.'
		});
	});
});
