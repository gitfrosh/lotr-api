import {bookController} from '../controllers/book.api'
import {chapterController} from '../controllers/chapter.api'
import {movieController} from '../controllers/movie.api'
import {characterController} from '../controllers/character.api'
import {quoteController} from '../controllers/quote.api'
import {IGraphQLContext, GraphQLBody} from "./schema";
import {createRESTArgumentsFromGraphqlRequest} from '../helpers/config'
const resolvers = {
    // books: () => bookController.getBooks(),
    book: async (body:GraphQLBody<{id:string}>, context:IGraphQLContext) => {
        const {req,res,next} = createRESTArgumentsFromGraphqlRequest(context, body, 'book');
        const data = await bookController.getBook(req,res,next);
        console.log(data)
        return data
    }
    // chaptersByBook: ({ bookId }: {bookId:number}) => bookController.getChaptersByBook({ params: { id: bookId } }),
    // chapters: () => chapterController.getChapters(),
    // chapter: ({ id }: {id:number}) => chapterController.getChapter({ params: { id } }),
    // movies: () => movieController.getMovies(),
    // movie: ({ id }: {id:number}) => movieController.getMovie({ params: { id } }),
    // quoteByMovie: ({ movieId }: {movieId:number}) => movieController.getQuoteByMovie({ params: { id: movieId } }),
    // characters: () => characterController.getCharacters(),
    // character: ({ id }: {id:number}) => characterController.getCharacter({ params: { id } }),
    // quoteByCharacter: ({ characterId }: {characterId:number}) => characterController.getQuoteByCharacter({ params: { id: characterId } }),
    // quotes: () => quoteController.getQuotes(),
    // quote: ({ id }: {id:number}) => quoteController.getQuote({ params: { id } })
}

export  default resolvers