import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const bookSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		}
	},
	{
		collection: 'books',
		timestamps: true
	}
);

bookSchema.plugin(mongoosePaginate);

export const BookModel = mongoose.model('books', bookSchema);
