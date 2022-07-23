const express = require('express');
const request = require('supertest');
const mockingoose = require('mockingoose');

const { HttpCode } = require('../helpers/constants');

const userModel = require('../models/user.model');
const authController = require('./auth');

const app = express();
const router = express.Router();

router.route("/register").post(authController.register);

app.use(express.json());
app.use('/auth', router);

const requestBody = { email: 'email@mail.com', password: 'P@$$1' };

describe('auth controller', () => {

    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('/register/ should return HTTP 500 if user already exists', async () => {
        //to mock exists we need to use 'findOne' -> https://github.com/alonronin/mockingoose/issues/69
        mockingoose(userModel).toReturn({}, 'findOne');
        const response = await request(app).post('/auth/register/').send(requestBody);
        expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('User already exists');
    });

    it('/register/ should return HTTP 500 when email validation fails', async () => {
        mockingoose(userModel).toReturn(null, 'findOne');
        const response = await request(app).post('/auth/register/').send({ ...requestBody, email: 'invalid.email.com' });
        expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });

    it('/register/ should return HTTP 500 when password is empty', async () => {
        mockingoose(userModel).toReturn(null, 'findOne');
        const response = await request(app).post('/auth/register/').send({ ...requestBody, password: '' });
        expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Something went wrong.');
    });

    it('/register/ should return HTTP 200 when user saved', async () => {
        mockingoose(userModel).toReturn({ email: 'email@mail.com' }, 'save');
        const response = await request(app).post('/auth/register/').send(requestBody);
        expect(response.statusCode).toEqual(HttpCode.OK);
        expect(response.body.success).toEqual(true);
    });

    it('/register/ should return HTTP 500 when registration failed', async () => {
        mockingoose(userModel).toReturn(new Error('error'), 'save');
        const response = await request(app).post('/auth/register/').send(requestBody);
        expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
    });
});