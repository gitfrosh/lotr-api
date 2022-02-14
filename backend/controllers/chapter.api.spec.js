const express = require('express');
const request = require('supertest');
const mockingoose = require('mockingoose');

const { HttpCode } = require('../helpers/constants');

const chapterModel = require('../models/chapter.model');
const chapterController = require('./chapter.api');

const app = express();
const router = express.Router();

router.route("/chapter").get(chapterController.getChapters);
router.route("/chapter/:id").get(chapterController.getChapter);

app.use(express.json());
app.use('/v2', router);

describe('chapter controller', () => {

    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('/chapter/ should return list of chapters', async () => {
        const fakeChapters = [
            {
                "_id": "6091b6d6d58360f988133ba4",
                "chapterName": "Treebeard",
                "book": "5cf58077b53e011a64671583"
            },
            {
                "_id": "6091b6d6d58360f988133b8d",
                "chapterName": "Three is Company",
                "book": "5cf5805fb53e011a64671582"
            }
        ];
        mockingoose(chapterModel).toReturn(fakeChapters);
        const response = await request(app).get('/v2/chapter/');
        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body.docs).toEqual(fakeChapters);
    });


    it('/chapter/ should handle error correctly when getting all chapters', async () => {
        mockingoose(chapterModel).toReturn(new Error('error'));
        const response = await request(app).get('/v2/chapter/');
        expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });

    it('/chapter/:id should return a single chapter', async () => {
        const fakeChapter = {
            "_id": "6091b6d6d58360f988133ba4",
            "chapterName": "Treebeard",
            "book": "5cf58077b53e011a64671583"
        };
        mockingoose(chapterModel).toReturn(fakeChapter);
        const response = await request(app).get('/v2/chapter/6091b6d6d58360f988133ba4');
        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body.docs).toEqual(fakeChapter);
    });


    it('/chapter/:id should handle error correctly when getting a single chapter', async () => {
        mockingoose(chapterModel).toReturn(new Error('error'));
        const response = await request(app).get('/v2/chapter/6091b6d6d58360f988133ba4');
        expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });
});