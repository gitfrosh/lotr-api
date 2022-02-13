const express = require('express');
const request = require('supertest');
const mockingoose = require('mockingoose');
const paginate = require('mongoose-paginate');
const bookController = require('../controllers/book.api');
const bookModel = require('../models/book.model');

const app = express();

const router = express.Router();
router.route("/book").get(bookController.getBooks);

app.use(express.json());
app.use('/v2', router);


describe.only('api controller', () => {

    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('should return list of books', async () => {
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
        ]
        mockingoose(bookModel).toReturn(fakeBooks);
        const response = await request(app).get('/v2/book/');
        expect(response.statusCode).toEqual(200);
        expect(response.body.doc).toEqual(fakeBooks);
    });


    it.only('should handle error correctly when getting all books', async () => {
        mockingoose(bookModel).toReturn(new Error('dupa'));
        const response = await request(app).get('/v2/book/');
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });
});