import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import { getOptions } from './../helpers/config';
import { MovieModel } from '../models/movie.model';
import { QuoteModel } from '../models/quote.model';

export const movieController = {
	getMovie: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const options = await getOptions(req);
			const id = req.params.id;
			const movie  = await MovieModel.paginate({ _id: id }, options);
			return res.json(movie);
		} catch (err) {
			return next(err);
		}
	},

	getMovies: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const options = await getOptions(req);
			const movies = await MovieModel.paginate(options.filter, options);
			return res.json(movies);
		} catch (err) {
			return next(err);
		}
	},

	getQuoteByMovie: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const options = await getOptions(req);
			const id = req.params.id;
			const quotes = await QuoteModel.paginate(
				{ movie: mongoose.Types.ObjectId(id) },
				{
					...options,
					select: {
						dialog: 1,
						movie: 1,
						character: 1
					}
				}
			);
			return res.json(quotes);
		} catch (err) {
			return next(err);
		}
	}
};
