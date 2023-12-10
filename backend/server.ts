require('dotenv').config();

import mongoose from 'mongoose';
import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import { connectDb } from './helpers/db';
import { apiLimiter } from './middleware/api.limiter';
import { UserModel } from './models/user.model';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

const app = express();
const dpwcToken = process.env.DPWC_TOKEN || '';

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, '/__BUILD'))); // React build

import apiRoutes from './routes/api';
import authRoutes from './routes/auth';

const server_port = process.env.PORT || 3001;

interface User {
	password: string;
	email: string;
}

passport.use(
	new BearerStrategy(async (token, done) => {
		try {
			if (dpwcToken === token) {
				return done(null, token, { message: 'Token valid.', scope: 'read' });
			}
			await UserModel.findOne({ access_token: token }, async function (err: unknown, user: User) {
				if (err) {
					return done(err, false, { message: 'Invalid token.', scope: 'read' });
				}
				if (!user) {
					return done(err, false, { message: 'Wrong token.', scope: 'read' });
				}
				return done(null, token, { message: 'Token valid.', scope: 'read' });
			});
		} catch (error) {
			done(error);
		}
	})
);

// prepare jwt login
passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (username: string, password: string, done: Function) => {
			try {
				await UserModel.findOne({ email: username }, async function (err: unknown, user: User) {
					if (err) {
						return done(err);
					}
					if (!user) {
						return done(null, false, { message: 'Incorrect username.' });
					}
					let passwordMatch = await bcrypt.compare(password, user.password);
					if (passwordMatch) {
						return done(null, user, { message: 'Logged in Successfully' });
					} else {
						return done(null, false, { message: 'Incorrect password.' });
					}
				});
			} catch (error) {
				done(error);
			}
		}
	)
);

app.use((req, res, next) => {
	const path = req.path;
	if (path.startsWith('/v2') || path.startsWith('/auth')) {
		const connected = mongoose.connection.readyState === 1 ? true : false;
		if (connected) {
			next();
		} else {
			return res.status(500).send({
				success: false,
				message: 'Service currently not available.'
			});
		}
	} else {
		next();
	}
});

//TODO: fix me 
//app.use('/v2/', apiLimiter); 
app.use('/v2', apiRoutes);
app.use('/auth', authRoutes);

// Handles React frontend requests
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/__BUILD/index.html'));
});

async function start() {
	await connectDb();
	app.listen(server_port, () => console.log(`LotR backend listening on port ${server_port}!`));
}

start();
