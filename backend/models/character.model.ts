import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const characterSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: false
		},
		wikiUrl: {
			type: String,
			required: true
		},
		race: {
			type: String,
			required: true
		},
		birth: {
			type: String || Number || null,
			required: false
		},
		gender: {
			type: String,
			required: false
		},
		death: {
			type: String || Number,
			required: false
		},
		hair: {
			type: String,
			required: false
		},
		height: {
			type: String,
			required: false
		},
		realm: {
			type: String,
			required: false
		},
		spouse: {
			type: String,
			required: false
		}
	},
	{
		collection: 'characters',
        timestamps: true
	}
);

characterSchema.plugin(mongoosePaginate);

export const CharacterModel = mongoose.model('characters', characterSchema);
