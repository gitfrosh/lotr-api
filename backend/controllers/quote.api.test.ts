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
			},
			{
				_id: "5cd96e05de30eff6ebcce89a",
				dialog: "DEATH!",
				movie: "5cd95395de30eff6ebccde5d",
				character: "5cdbe49b7ed9587226e794a0",
				id: "5cd96e05de30eff6ebcce89a"
			},
			{
				_id: "5cd96e05de30eff6ebcce8cd",
				dialog: "You'll see. Oh yes, you will see.",
				movie: "5cd95395de30eff6ebccde5d",
				character: "5cd99d4bde30eff6ebccfe9e",
				id: "5cd96e05de30eff6ebcce8cd"
			},
			{
				_id: "5cd96e05de30eff6ebcced9d",
				dialog: "What business does an Elf, a Man and a Dwarf have in the Riddermark? Speak quickly!",
				movie: "5cd95395de30eff6ebccde5b",
				character: "5cdbdecb6dc0baeae48cfa5a",
				id: "5cd96e05de30eff6ebcced9d"
			}
		];
	
		mockingoose(QuoteModel).toReturn(fakeQuotes.length, 'estimatedDocumentCount');
		mockingoose(QuoteModel).toReturn(fakeQuotes, 'find');
	
		const response = await request(app).get('/v2/quotes/random');
	
		expect(response.statusCode).toEqual(HttpCode.OK);
		expect(fakeQuotes).toContainEqual(response.body); 
	});
	
});
