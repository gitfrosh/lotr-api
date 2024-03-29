import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const movieSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		runtimeInMinutes: {
			type: Number,
			required: true
		},
		budgetInMillions: {
			type: Number,
			required: true
		},
		boxOfficeRevenueInMillions: {
			type: Number,
			required: true
		},
		academyAwardNominations: {
			type: Number,
			required: true
		},
		academyAwardWins: {
			type: Number,
			required: true
		},
		rottenTomatoesScore: {
			type: Number,
			required: true
		}
	},
	{
		collection: 'movies',
        timestamps: true
	}
);

movieSchema.plugin(mongoosePaginate);

export const MovieModel = mongoose.model('movies', movieSchema);
