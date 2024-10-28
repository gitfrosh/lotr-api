import express, { Router } from 'express';
import request from 'supertest';
const mockingoose = require('mockingoose');

import { HttpCode } from '../helpers/constants';
import { errorHandler } from '../middleware/api.errors';
import { quoteController } from './quote.api';
import { QuoteModel } from '../models/quote.model';


const app = express();
const router = Router();

router.route('/quote').get(quoteController.getQuotes);
router.route('/quote/:id').get(quoteController.getQuote);
router.route('/quotes/random').get(quoteController.getRandomQuote);

app.use(express.json());
app.use('/v2', router);
app.use(errorHandler);

describe('quote controller', () => {
	beforeEach(() => {
		mockingoose.resetAll();
	});

	it('/quote/ should return a list of quotes', async () => {
		const fakeQuotes = [
			{
				_id: '5cd96e05de30eff6ebccedfc',
				dialog: 'Tomatoes, sausages, nice crispy bacon',
				movie: '5cd95395de30eff6ebccde5c',
				character: '5cd99d4bde30eff6ebccfc7c',
				id: '5cd96e05de30eff6ebccedfc'
			},
			{
				_id: '5cd96e05de30eff6ebcce99c',
				dialog: 'Sam, no!',
				movie: '5cd95395de30eff6ebccde5d',
				character: '5cd99d4bde30eff6ebccfc15',
				id: '5cd96e05de30eff6ebcce99c'
			}
		];
		mockingoose(QuoteModel).toReturn(fakeQuotes);
		const response = await request(app).get('/v2/quote/');
		expect(response.statusCode).toEqual(HttpCode.OK);
		expect(response.body.docs).toEqual(fakeQuotes);
	});

	it('/quote/ should handle errors correctly when getting all quotes', async () => {
		mockingoose(QuoteModel).toReturn(new Error('error'));
		const response = await request(app).get('/v2/quote/');
		expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
		expect(response.body.success).toEqual(false);
		expect(response.body.message).toEqual('Something went wrong.');
	});

	it('/quote/:id should return a single quote', async () => {
		const fakeQuote = {
			_id: '5cd96e05de30eff6ebccedfc',
			dialog: 'Tomatoes, sausages, nice crispy bacon',
			movie: '5cd95395de30eff6ebccde5c',
			character: '5cd99d4bde30eff6ebccfc7c',
			id: '5cd96e05de30eff6ebccedfc'
		};
		mockingoose(QuoteModel).toReturn(fakeQuote);
		const response = await request(app).get('/v2/quote/5cd96e05de30eff6ebccedfc');
		expect(response.statusCode).toEqual(HttpCode.OK);
		expect(response.body.docs).toEqual(fakeQuote);
	});

	it('/quote/:id should handle errors correctly when getting a single quote', async () => {
		mockingoose(QuoteModel).toReturn(new Error('error'));
		const response = await request(app).get('/v2/quote/5cd96e05de30eff6ebccedfc');
		expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
		expect(response.body.success).toEqual(false);
		expect(response.body.message).toEqual('Something went wrong.');
	});

	it("/quotes/random should return a random quote", async () => {
        const fakeQuote = {
            _id: '5cd96e05de30eff6ebccedfc',
            dialog: 'Tomatoes, sausages, nice crispy bacon',
            movie: '5cd95395de30eff6ebccde5c',
            character: '5cd99d4bde30eff6ebccfc7c',
            id: '5cd96e05de30eff6ebccedfc'
        };

        mockingoose(QuoteModel).toReturn(fakeQuote, 'findOne');

        const response = await request(app).get('/v2/quotes/random');

        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body).toEqual(fakeQuote);
    });
});
