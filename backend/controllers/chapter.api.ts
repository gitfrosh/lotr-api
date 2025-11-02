import { Request, Response, NextFunction } from 'express';

import { getOptions } from '../helpers/config';
import { ChapterModel } from '../models/chapter.model';

export const chapterController = {
	getChapters: async (req: Request, res: Response, next: NextFunction) => {
		const options = await getOptions(req);

		try {
			const chapter = await ChapterModel.paginate(options.filter, {
				...options,
				select: {
					chapterName: 1,
					book: 1
				}
			});
			return res.json(chapter);
		} catch (err) {
			return next(err);
		}
	},

	getChapter: async (req: Request, res: Response, next: NextFunction) => {
		const options = await getOptions(req);
		try {
			const id: string = req.params.id;
			const chapter = await ChapterModel.paginate(
				{ _id: id },
				{
					...options,
					select: {
						chapterName: 1,
						book: 1
					}
				}
			);
			return res.json(chapter);
		} catch (err) {
			return next(err);
		}
	}
};
