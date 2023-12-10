import { Router } from 'express';
import { authController } from '../controllers/auth';
import { passportHelpers } from './../helpers/passport';
//import authLimiter from '../middleware/auth.limiter';
import { HttpCode, notFoundResponse } from '../helpers/constants';

const router = Router();

router.route('/login').post([passportHelpers.login, authController.login]);

//TODO: fix me
// Allow only 5 calls per hour to this endpoint
router.route('/register').post([
	// authLimiter({
	// 	windowMs: 60 * 60 * 1000,
	// 	max: 5,
	// 	message: {
	// 		success: false,
	// 		message: 'Too many requests, please try again later.'
	// 	}
	// }),
	authController.register
]);

router.route('*').get(async (req, res) => {
	return res.status(HttpCode.NOT_FOUND).send(notFoundResponse);
});

export default router;
