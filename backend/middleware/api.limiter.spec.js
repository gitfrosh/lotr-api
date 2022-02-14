const express = require('express');
const request = require('supertest');

const app = express();
const router = express.Router();
const apiLimiter = require('../middleware/api.limiter');

router.route('/book/').get((req, res) => res.sendStatus(200));

app.use("/v2/", apiLimiter);
app.use("/v2", router);

describe('api  limiter', () => {

    it('should return 200 OK when rate limit not exceeded', async () => {
        const response = await request(app).get('/v2/book/');
        expect(response.statusCode).toEqual(200);
    });

    it('should respond with 429 Too Many Requests when rate limit exceeded', async () => {
        const rateLimit = 100;

        let response;
        for (let i = 0; i <= rateLimit; i++) {
            response = await request(app).get('/v2/book/');
        }
        expect(response.statusCode).toEqual(429);
        expect(response.text).toEqual('Too many requests, please try again later.');
    });
});