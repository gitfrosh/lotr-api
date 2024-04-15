import { connect } from 'mongoose';

const database_url = process.env.DATABASE_URL || 'mongodb://localhost:27017/lotr';

export async function connectDb() {
	return connect(database_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
		.then(() => {
			console.log('Database Connected');
			return true;
		})
		.catch((err) => {
			console.log('Could not connect.');
			console.log(err);
			return false;
		});
}
