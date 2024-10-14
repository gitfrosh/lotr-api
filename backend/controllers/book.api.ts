import { Request, Response, NextFunction } from 'express';

import mongoose from 'mongoose';
import { getOptions } from '../helpers/config';
import { BookModel } from '../models/book.model';
import { ChapterModel } from '../models/chapter.model';

export const bookController = {
	getBooks: async (req: Request, res: Response, next: NextFunction) => {
		const options = await getOptions(req);
		try {
			const books = await BookModel.paginate(options.filter, options);
			return res.json(books);
		} catch (err) {
			return next(err);
		}
	},

	getBook: async (req: Request, res: Response, next: NextFunction) => {
		const options = await getOptions(req);
		console.log('options', options);
		console.log(req, res, next);
		try {
			const id = req.params.id;
			const book = await BookModel.paginate({ _id: id }, options);
			return res.json(book);
		} catch (err) {
			return next(err);
		}
	},

	getChaptersByBook: async (req: Request, res: Response, next: NextFunction) => {
		const options = await getOptions(req);

		try {
			const id = req.params.id;
			const book = await ChapterModel.paginate(
				{ book: mongoose.Types.ObjectId(id) },
				{
					select: { chapterName: 1, bookName: 1 },
					...options
				}
			);
			return res.json(book);
		} catch (err) {
			return next(err);
		}
	}
};
