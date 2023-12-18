import { Router } from 'express';;

import { notFoundResponse, HttpCode } from '../helpers/constants';
import { bookController } from '../controllers/book.api';
import { chapterController } from '../controllers/chapter.api';
import { movieController } from '../controllers/movie.api';
import { characterController } from '../controllers/character.api';
import { quoteController } from '../controllers/quote.api';
import { errorHandler } from '../middleware/api.errors';
import { passportHelpers } from '../helpers/passport';

const router = Router();

router.route('/book').get(bookController.getBooks);
router.route('/book/:id').get(bookController.getBook);
router.route('/book/:id/chapter').get(bookController.getChaptersByBook);

router.route('/chapter').get([passportHelpers.authenticate, chapterController.getChapters]);
router.route('/chapter/:id').get([passportHelpers.authenticate, chapterController.getChapter]);
router.route('/movie').get([passportHelpers.authenticate, movieController.getMovies]);
router.route('/movie/:id').get([passportHelpers.authenticate, movieController.getMovie]);
router.route('/movie/:id/quote').get([passportHelpers.authenticate, movieController.getQuoteByMovie]);

router.route('/character').get([passportHelpers.authenticate, characterController.getCharacters]);
router.route('/character/:id').get([passportHelpers.authenticate, characterController.getCharacter]);

router.route('/character/:id/quote').get([passportHelpers.authenticate, characterController.getQuoteByCharacter]);

router.route('/quote').get([passportHelpers.authenticate, quoteController.getQuotes]);
router.route('/quote/:id').get([passportHelpers.authenticate, quoteController.getQuote]);
router.route('*').get(async (req, res) => {
	return res.status(HttpCode.NOT_FOUND).send(notFoundResponse);
});
// global error handler. This should always be the last .use
// and after all routes
router.use(errorHandler);

export default router;
