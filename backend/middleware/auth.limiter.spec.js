const express = require('express');
const request = require('supertest');

const app = express();
const router = express.Router();
const authLimiter = require('../middleware/auth.limiter');

const rateLimit = 1;
const hourWindow = 60 * 60 * 1000;

router.route('/register').post([authLimiter({ windowMs: hourWindow, max: rateLimit }), (req, res) => res.sendStatus(200)]);

app.use(express.json());
app.use('/auth', router);

const requestBody = { email: 'fake@email.com', password: 'P@$$1' };

describe('auth limiter', () => {

    it('should return 200 OK when rate limit not exceeded', async () => {
        const response = await request(app).post('/auth/register/').send(requestBody);
        expect(response.statusCode).toEqual(200);
    });

    it('should respond with 429 Too Many Requests when rate limit exceeded', async () => {
        let response;
        for (let i = 0; i <= rateLimit; i++) {
            response = await request(app).post('/auth/register/').send(requestBody);
        }
        expect(response.statusCode).toEqual(429);
        expect(response.text).toEqual('Too many requests, please try again later.');
    });
});