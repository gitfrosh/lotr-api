import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

function removeBlanks(value: string): string {
	const temp = value && value.replace(/\s\s+/g, ' ');
	return temp && temp.trim();
}

const quoteSchema = new Schema(
	{
		dialog: {
			type: String,
			required: true,
			trim: true,
			get: removeBlanks
		},
		movie: {
			type: mongoose.Types.ObjectId,
			ref: 'movie',
			required: true
		},
		character: {
			type: mongoose.Types.ObjectId,
			ref: 'character',
			required: false
		}
	},
	{
		collection: 'quotes',
		toJSON: { getters: true },
		toObject: { getters: true },
        timestamps: true
	}
);

quoteSchema.plugin(mongoosePaginate);

export const QuoteModel = mongoose.model('quotes', quoteSchema);
