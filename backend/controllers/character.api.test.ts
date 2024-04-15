import express, { Router } from 'express';
import request from 'supertest';
const mockingoose = require('mockingoose');

import { HttpCode } from '../helpers/constants';
import { characterController } from './character.api';
import { errorHandler } from '../middleware/api.errors';
import { CharacterModel } from '../models/character.model';
import { QuoteModel } from '../models/quote.model';

const app = express();
const router = Router();

router.route('/character').get(characterController.getCharacters);
router.route('/character/:id').get(characterController.getCharacter);
router.route('/character/:id/quote').get(characterController.getQuoteByCharacter);

app.use(express.json());
app.use('/v2', router);
app.use(errorHandler);

describe('character controller', () => {
	beforeEach(() => {
		mockingoose.resetAll();
	});

	it('/character/ should return list of characters', async () => {
		const fakeCharacters = [
			{
				_id: '5cd99d4bde30eff6ebccfea4',
				height: '',
				race: 'Maiar',
				gender: 'Male',
				birth: 'Before the creation of ,Arda',
				spouse: 'None',
				death: '3 November ,3019',
				realm: 'Isengard,Nan Curunír',
				hair: 'White',
				name: 'Saruman',
				wikiUrl: 'http://lotr.wikia.com//wiki/Saruman'
			},
			{
				_id: '5cd99d4bde30eff6ebccfea5',
				height: 'Various until',
				race: 'Maiar',
				gender: 'Male',
				birth: 'Before the creation of ,Arda',
				spouse: 'None',
				death: 'March 25 ,3019',
				realm: '',
				hair: 'Various',
				name: 'Sauron',
				wikiUrl: 'http://lotr.wikia.com//wiki/Sauron'
			}
		];
		mockingoose(CharacterModel).toReturn(fakeCharacters);
		const response = await request(app).get('/v2/character/');
		expect(response.statusCode).toEqual(HttpCode.OK);
		expect(response.body.docs).toEqual(fakeCharacters);
	});

	it('/character/ should handle error correctly when getting all characters', async () => {
		mockingoose(CharacterModel).toReturn(new Error('error'));
		const response = await request(app).get('/v2/character/');
		expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
		expect(response.body.success).toEqual(false);
		expect(response.body.message).toEqual('Something went wrong.');
	});

	it('/character/:id should return a single character', async () => {
		const fakeCharacter = {
			_id: '5cd99d4bde30eff6ebccfea5',
			height: 'Various until',
			race: 'Maiar',
			gender: 'Male',
			birth: 'Before the creation of ,Arda',
			spouse: 'None',
			death: 'March 25 ,3019',
			realm: '',
			hair: 'Various',
			name: 'Sauron',
			wikiUrl: 'http://lotr.wikia.com//wiki/Sauron'
		};
		mockingoose(CharacterModel).toReturn(fakeCharacter);
		const response = await request(app).get('/v2/character/5cd99d4bde30eff6ebccfea5');
		expect(response.statusCode).toEqual(HttpCode.OK);
		expect(response.body.docs).toEqual(fakeCharacter);
	});

	it('/character/:id should handle error correctly when getting a single character', async () => {
		mockingoose(CharacterModel).toReturn(new Error('error'));
		const response = await request(app).get('/v2/character/5cd99d4bde30eff6ebccfea5');
		expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
		expect(response.body.success).toEqual(false);
		expect(response.body.message).toEqual('Something went wrong.');
	});

	it('/character/:id/quote should return quotes of one specific character', async () => {
		const fakeQuotes = [
			{
				_id: '5cd96e05de30eff6ebccec0c',
				dialog: 'Aragorn! , Elessar!',
				movie: '5cd95395de30eff6ebccde5d',
				character: '5cd99d4bde30eff6ebccfea5',
				id: '5cd96e05de30eff6ebccec0c'
			},
			{
				_id: '5cd96e05de30eff6ebccedf3',
				dialog: 'Build me an army worthy of Mordor',
				movie: '5cd95395de30eff6ebccde5c',
				character: '5cd99d4bde30eff6ebccfea5',
				id: '5cd96e05de30eff6ebccedf3'
			}
		];
		mockingoose(QuoteModel).toReturn(fakeQuotes);
		const response = await request(app).get('/v2/character/5cd96e05de30eff6ebccec0c/quote');
		expect(response.statusCode).toEqual(HttpCode.OK);
		expect(response.body.docs).toEqual(fakeQuotes);
	});

	it('/character/:id/quote should handle error correctly when getting quotes of one specific character', async () => {
		mockingoose(QuoteModel).toReturn(new Error('error'));
		const response = await request(app).get('/v2/character/5cf58080b53e011a64671584/quote');
		expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
		expect(response.body.success).toEqual(false);
		expect(response.body.message).toEqual('Something went wrong.');
	});
});
