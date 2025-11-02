import {
	getChapter,
	getChapters,
	getChaptersByBook,
	getBooks,
	getBook,
	getCharacters,
	getCharacter,
	getQuoteByCharacter,
	getQuote,
	getQuotes,
	getQuoteByMovie,
	getMovies,
	getMovie
} from './resolvers';

const root = {
	book: getBook,
	books: getBooks,
	chaptersByBook: getChaptersByBook,
	chapters: getChapters,
	chapter: getChapter,
	movies: getMovies,
	movie: getMovie,
	quoteByMovie: getQuoteByMovie,
	characters: getCharacters,
	character: getCharacter,
	quoteByCharacter: getQuoteByCharacter,
	quotes: getQuotes,
	quote: getQuote
};

export default root;
