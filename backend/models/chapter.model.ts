import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const chapterSchema = new Schema(
	{
		chapterName: {
			type: String,
			required: true,
			unique: true
		},
		book: {
			type: mongoose.Types.ObjectId,
			ref: 'book',
			required: true
		},
		bookName: {
			type: String,
			required: true
		},
		ChapterData: {
			type: String,
			required: true
		}
	},
	{
		collection: 'chapters',
		timestamps: true
	}
);

chapterSchema.plugin(mongoosePaginate);

export const ChapterModel = mongoose.model('chapters', chapterSchema);
