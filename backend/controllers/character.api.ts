import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import { PaginateOptions } from '../helpers/interfaces';
import { getOptions } from '../helpers/config';
import { CharacterModel } from '../models/character.model';
import { QuoteModel } from '../models/quote.model';

export const characterController = {
	getCharacters: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const options = await getOptions(req);
			const characters = await CharacterModel.paginate(options.filter, options);
			return res.json(characters);
		} catch (err) {
			return next(err);
		}
	},

	getCharacter: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const options: PaginateOptions = await getOptions(req);
			const id = req.params.id;
			const character = await CharacterModel.paginate({ _id: id }, options);
			return res.json(character);
		} catch (err) {
			return next(err);
		}
	},

	getQuoteByCharacter: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const options = await getOptions(req);
			const id = req.params.id;
			const quotes = await QuoteModel.paginate(
				{ character: mongoose.Types.ObjectId(id) },
				{
					...options,
					select: { dialog: 1, movie: 1, character: 1 }
				}
			);
			return res.json(quotes);
		} catch (err) {
			return next(err);
		}
	}
};
