import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
	email: string;
	password: string;
	access_token: string;
}

const userSchema = new Schema(
	{
		email: {
			type: String,
			unique: true
		},
		password: {
			type: String,
			required: true,
			exclude: true,
			allowOnUpdate: false
		},
		access_token: {
			type: String,
			required: true
		}
	},
	{
		collection: 'user',
		timestamps: true
	}
);

export const UserModel = mongoose.model<User>('user', userSchema);