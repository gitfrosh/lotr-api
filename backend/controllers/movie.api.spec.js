const express = require('express');
const request = require('supertest');
const mockingoose = require('mockingoose');

const quoteModel = require('../models/quote.model');
const movieModel = require('../models/movie.model');
const movieController = require('./movie.api');

const { HttpCode } = require('../helpers/constants');

const app = express();
const router = express.Router();

router.route("/movie").get(movieController.getMovies);
router.route("/movie/:id").get(movieController.getMovie);
router.route("/movie/:id/quote").get(movieController.getQuoteByMovie);

app.use(express.json());
app.use('/v2', router);

describe('movie controller', () => {

    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('/movie/ should return list of movies', async () => {
        const fakeMovies = [
            {
                "_id": "5cd95395de30eff6ebccde5b",
                "name": "The Two Towers ",
                "runtimeInMinutes": 179,
                "budgetInMillions": 94,
                "boxOfficeRevenueInMillions": 926,
                "academyAwardNominations": 6,
                "academyAwardWins": 2,
                "rottenTomatoesScore": 96
            },
            {
                "_id": "5cd95395de30eff6ebccde5c",
                "name": "The Fellowship of the Ring",
                "runtimeInMinutes": 178,
                "budgetInMillions": 93,
                "boxOfficeRevenueInMillions": 871.5,
                "academyAwardNominations": 13,
                "academyAwardWins": 4,
                "rottenTomatoesScore": 91
            },
            {
                "_id": "5cd95395de30eff6ebccde5d",
                "name": "The Return of the King",
                "runtimeInMinutes": 201,
                "budgetInMillions": 94,
                "boxOfficeRevenueInMillions": 1120,
                "academyAwardNominations": 11,
                "academyAwardWins": 11,
                "rottenTomatoesScore": 95
            }
        ];
        mockingoose(movieModel).toReturn(fakeMovies);
        const response = await request(app).get('/v2/movie/');
        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body.docs).toEqual(fakeMovies);
    });

    it('/movie/ should handle error correctly when getting all movies', async () => {
        mockingoose(movieModel).toReturn(new Error('error'));
        const response = await request(app).get('/v2/movie/');
        expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });

    it('/movie/:id should return a single movie', async () => {
        const fakeMovie = {
            "_id": "5cd95395de30eff6ebccde5c",
            "name": "The Fellowship of the Ring",
            "runtimeInMinutes": 178,
            "budgetInMillions": 93,
            "boxOfficeRevenueInMillions": 871.5,
            "academyAwardNominations": 13,
            "academyAwardWins": 4,
            "rottenTomatoesScore": 91
        };
        mockingoose(movieModel).toReturn(fakeMovie);
        const response = await request(app).get('/v2/movie/5cd95395de30eff6ebccde5c');
        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body.docs).toEqual(fakeMovie);
    });

    it('/movie/:id should handle error correctly when getting a single movie', async () => {
        mockingoose(movieModel).toReturn(new Error('error'));
        const response = await request(app).get('/v2/movie/5cd95395de30eff6ebccde5c');
        expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });

    it('/movie/:id/quote should return quotes of one specific movie', async () => {
        const fakeQuotes = [
            {
                "_id": "5cd96e05de30eff6ebcced67",
                "dialog": "The power of Isengard is at your command",
                "movie": "5cd95395de30eff6ebccde5c",
                "character": "5cd99d4bde30eff6ebccfea4",
                "id": "5cd96e05de30eff6ebcced67"
            },
            {
                "_id": "5cd96e05de30eff6ebcced69",
                "dialog": "Sauron. Lord of the Earth",
                "movie": "5cd95395de30eff6ebccde5c",
                "character": "5cd99d4bde30eff6ebccfea4",
                "id": "5cd96e05de30eff6ebcced69"
            },
            {
                "_id": "5cd96e05de30eff6ebcced6a",
                "dialog": "Stay close young hobbits.",
                "movie": "5cd95395de30eff6ebccde5c",
                "character": "5cd99d4bde30eff6ebccfd23",
                "id": "5cd96e05de30eff6ebcced6a"
            }
        ];
        mockingoose(quoteModel).toReturn(fakeQuotes);
        const response = await request(app).get('/v2/movie/5cd95395de30eff6ebccde5c/quote');
        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body.docs).toEqual(fakeQuotes);
    });

    it('/movie/:id/quote should handle error correctly when getting quotes of one specific movie', async () => {
        mockingoose(quoteModel).toReturn(new Error('error'));
        const response = await request(app).get('/v2/movie/5cd95395de30eff6ebccde5c/quote');
        expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });
});