const express = require('express');
const request = require('supertest');
const mockingoose = require('mockingoose');

const { HttpCode } = require('../helpers/constants');

const quoteModel = require('../models/quote.model');
const quoteController = require('./quote.api');

const app = express();
const router = express.Router();

router.route("/quote").get(quoteController.getQuotes);
router.route("/quote/:id").get(quoteController.getQuote);

app.use(express.json());
app.use('/v2', router);

describe('quote controller', () => {

    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('/quote/ should return list of quotes', async () => {
        const fakeQuotes = [
            {
                "_id": "5cd96e05de30eff6ebccedfc",
                "dialog": "Tomatoes, sausages, nice crispy bacon",
                "movie": "5cd95395de30eff6ebccde5c",
                "character": "5cd99d4bde30eff6ebccfc7c",
                "id": "5cd96e05de30eff6ebccedfc"
            },
            {
                "_id": "5cd96e05de30eff6ebcce99c",
                "dialog": "Sam, no!",
                "movie": "5cd95395de30eff6ebccde5d",
                "character": "5cd99d4bde30eff6ebccfc15",
                "id": "5cd96e05de30eff6ebcce99c"
            }
        ];
        mockingoose(quoteModel).toReturn(fakeQuotes);
        const response = await request(app).get('/v2/quote/');
        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body.docs).toEqual(fakeQuotes);
    });

    it('/quote/ should handle error correctly when getting all quotes', async () => {
        mockingoose(quoteModel).toReturn(new Error('error'));
        const response = await request(app).get('/v2/quote/');
        expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });

    it('/quote/:id should return a single quote', async () => {
        const fakeQuote = {
            "_id": "5cd96e05de30eff6ebccedfc",
            "dialog": "Tomatoes, sausages, nice crispy bacon",
            "movie": "5cd95395de30eff6ebccde5c",
            "character": "5cd99d4bde30eff6ebccfc7c",
            "id": "5cd96e05de30eff6ebccedfc"
        };
        mockingoose(quoteModel).toReturn(fakeQuote);
        const response = await request(app).get('/v2/quote/5cd96e05de30eff6ebccedfc');
        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body.docs).toEqual(fakeQuote);
    });

    it('/quote/:id should handle error correctly when getting a single quote', async () => {
        mockingoose(quoteModel).toReturn(new Error('error'));
        const response = await request(app).get('/v2/quote/5cd96e05de30eff6ebccedfc');
        expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });
});