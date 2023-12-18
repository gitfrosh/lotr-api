const rateLimit = require('express-rate-limit');
import { RequestHandler } from 'express';

const authLimiter = (options: any): RequestHandler => {
	return rateLimit({ ...options });
};

export default authLimiter;
