import { Request, Response, NextFunction } from 'express';

import { getOptions } from './../helpers/config';
import { QuoteModel } from '../models/quote.model';

export const quoteController = {
	getQuotes: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const options = await getOptions(req);
			const quote = await QuoteModel.paginate(options.filter, {
				...options,
				select: {
					dialog: 1,
					movie: 1,
					character: 1
				}
			});
			return res.json(quote);
		} catch (err) {
			return next(err);
		}
	},

	getQuote: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const options = await getOptions(req);
			const id = req.params.id;
			const quote = await QuoteModel.paginate(
				{ _id: id },
				{
					...options,
					select: {
						dialog: 1,
						movie: 1,
						character: 1
					}
				}
			);
			return res.json(quote);
		} catch (err) {
			return next(err);
		}
	},

	getRandomQuote: async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const count = await QuoteModel.estimatedDocumentCount();

			if (count === 0) {
				return res.status(404).json({ message: "No quotes found" });
			}
	
			const randomIndex = Math.floor(Math.random() * count);

			const quotes = await QuoteModel.find();
			const quote = quotes[randomIndex];
	
			return res.json(quote);
		} catch (error) {
			return next(error);
		}
	}
};
