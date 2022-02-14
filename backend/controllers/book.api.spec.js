const express = require('express');
const request = require('supertest');
const mockingoose = require('mockingoose');

const { HttpCode } = require('../helpers/constants');

const chapterModel = require('../models/chapter.model');

const bookController = require('./book.api');
const bookModel = require('../models/book.model');

const app = express();
const router = express.Router();

router.route("/book").get(bookController.getBooks);
router.route("/book/:id").get(bookController.getBook);
router.route("/book/:id/chapter").get(bookController.getChaptersByBook);

app.use(express.json());
app.use('/v2', router);

describe('book controller', () => {

    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('/book/ should return list of books', async () => {
        const fakeBooks = [
            {
                "_id": "5cf5805fb53e011a64671582",
                "name": "The Fellowship Of The Ring"
            },
            {
                "_id": "5cf58077b53e011a64671583",
                "name": "The Two Towers"
            },
            {
                "_id": "5cf58080b53e011a64671584",
                "name": "The Return Of The King"
            }
        ];
        mockingoose(bookModel).toReturn(fakeBooks);
        const response = await request(app).get('/v2/book/');
        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body.docs).toEqual(fakeBooks);
    });


    it('/book/ should handle error correctly when getting all books', async () => {
        mockingoose(bookModel).toReturn(new Error('error'));
        const response = await request(app).get('/v2/book/');
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });

    it('/book/:id should return a single book', async () => {
        const fakeBook = {
            "_id": "5cf58080b53e011a64671584",
            "name": "The Return Of The King"
        };
        mockingoose(bookModel).toReturn(fakeBook);
        const response = await request(app).get('/v2/book/5cf5805fb53e011a64671582');
        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body.docs).toEqual(fakeBook);
    });


    it('/book/:id should handle error correctly when getting a single book', async () => {
        mockingoose(bookModel).toReturn(new Error('error'));
        const response = await request(app).get('/v2/book/5cf5805fb53e011a64671582');
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });

    it('/book/:id/chapter should return chapters from book', async () => {
        const fakeChapters = [
            {
                "_id": "6091b6d6d58360f988133bb6",
                "chapterName": "Minas Tirith"
            },
            {
                "_id": "6091b6d6d58360f988133bb7",
                "chapterName": "The Passing of the Grey Company"
            }
        ];
        mockingoose(chapterModel).toReturn(fakeChapters);
        const response = await request(app).get('/v2/book/5cf58080b53e011a64671584/chapter');
        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body.docs).toEqual(fakeChapters);
    });


    it('/book/:id/chapter should handle error correctly when getting chapters from book', async () => {
        mockingoose(chapterModel).toReturn(new Error('error'));
        const response = await request(app).get('/v2/book/5cf58080b53e011a64671584/chapter');
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });
});