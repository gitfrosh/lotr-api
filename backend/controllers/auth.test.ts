import express from 'express';
import { describe, expect } from '@jest/globals';
import request from 'supertest';
const mockingoose = require("mockingoose");

import { HttpCode } from '../helpers/constants';
import { authController } from './auth';
import { errorHandler } from '../middleware/api.errors';
import { UserModel } from '../models/user.model';

const app = express();
const router = express.Router();

router.route('/register').post(authController.register);

app.use(express.json());
app.use('/auth', router);
app.use(errorHandler);

const requestBody = { email: 'email@mail.com', password: 'Password@$$1' };

describe('auth controller', () => {
	afterEach(() => {
		mockingoose.resetAll();
	});

	it('/register/ should return HTTP 500 if user already exists', async () => {
		mockingoose('user').toReturn({}, 'findOne');
		const response = await request(app).post('/auth/register/').send(requestBody);
		expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
		expect(response.body.success).toEqual(false);
		expect(response.body.message).toEqual('User already exists');
	});

	it('/register/ should return HTTP 500 when email validation fails', async () => {
		mockingoose(UserModel).toReturn(null, 'findOne');
		const response = await request(app)
			.post('/auth/register/')
			.send({ ...requestBody, email: 'invalid.email.com' });
		expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
		expect(response.body.success).toEqual(false);
		expect(response.body.message).toEqual('Something went wrong.');
	});

	it('/register/ should return HTTP 500 when password is empty', async () => {
		mockingoose(UserModel).toReturn(null, 'findOne');
		const response = await request(app)
			.post('/auth/register/')
			.send({ ...requestBody, password: '' });

		expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
		expect(response.body.success).toEqual(false);
		expect(response.body.message).toEqual('Something went wrong.');
	});

	it('/register/ should return HTTP 500 when password is one character long', async () => {
		mockingoose(UserModel).toReturn(null, 'findOne');
		const response = await request(app)
			.post('/auth/register/')
			.send({ ...requestBody, password: 'a' });

		expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
		expect(response.body.success).toEqual(false);
		expect(response.body.message).toEqual('Something went wrong.');
	});

	it("/register/ should return HTTP 500 when password doesn't have a special char", async () => {
		mockingoose(UserModel).toReturn(null, 'findOne');
		const response = await request(app)
			.post('/auth/register/')
			.send({ ...requestBody, password: 'Password123' });
		expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
		expect(response.body.success).toEqual(false);
		expect(response.body.message).toEqual('Something went wrong.');
	});

	it('/register/ should return HTTP 200 when user saved', async () => {
		mockingoose(UserModel).toReturn({ email: 'email@mail.com' }, 'save');
		const response = await request(app).post('/auth/register/').send(requestBody);
		expect(response.statusCode).toEqual(HttpCode.OK);
		expect(response.body.success).toEqual(true);
	});

	it('/register/ should return HTTP 500 when registration failed', async () => {
		mockingoose(UserModel).toReturn(new Error('error'), 'save');
		const response = await request(app).post('/auth/register/').send(requestBody);
		expect(response.statusCode).toEqual(HttpCode.SERVER_ERROR);
	});
});
