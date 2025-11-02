import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';
import {nanoid} from 'nanoid';
import fetch from 'node-fetch';

import {UserModel} from '../models/user.model';
import {HttpCode, errorResponse} from '../helpers/constants';

const secret = process.env.SECRET || 'top_secret';
const lambda_func = process.env.AWS_LAMBDA_NEWUSER_URL || null;

function generatePasswordHash(password: string): string {
    let hash: string = password;
    let salt: string = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const authController = {
    login: async (req: Request, res: Response) => {
        const user = req.user as any; // Assuming user property exists in req object
        try {
            req.login(user, {session: false}, async (error) => {
                if (error)
                    return res.status(HttpCode.SERVER_ERROR).send({
                        success: false,
                        message: 'Login failed'
                    });
                const body = {
                    id: user.id,
                    email: user.email,
                    access_token: user.access_token
                };
                const token = jwt.sign({user: body}, secret);
                return res.json({
                    token: token,
                    email: user.email,
                    access_token: user.access_token
                });
            });
        } catch (e) {
            return res.status(HttpCode.SERVER_ERROR).send({
                success: false,
                message: 'Login failed'
            });
        }
    },
    register: async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const doesUserExist = await UserModel.exists({email: email});
        if (doesUserExist) {
            return res.status(HttpCode.SERVER_ERROR).send({
                success: false,
                message: 'User already exists'
            });
        } else if (validator.isEmail(email) && validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })) {
            const hash = generatePasswordHash(password);
            const access_token = nanoid(20);
            try {
                await UserModel.create({
                    email: email,
                    password: hash,
                    access_token: access_token
                });
                // send notification email via aws lambda in prod
                if (lambda_func) fetch(process.env.AWS_LAMBDA_NEWUSER_URL as string);
                return res.json({
                    success: true
                });
            } catch (err) {
                return res.status(HttpCode.SERVER_ERROR).send(err);
            }
        } else {
            return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
        }
    }
};
