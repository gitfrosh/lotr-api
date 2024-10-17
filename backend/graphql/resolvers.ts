import {bookController} from '../controllers/book.api'
import {chapterController} from '../controllers/chapter.api'
import {movieController} from '../controllers/movie.api'
import {characterController} from '../controllers/character.api'
import {quoteController} from '../controllers/quote.api'
import {
    IGraphQLContext,
    GraphQLBody,
    GraphQLResponse,
    Book,
    Chapter,
    Character,
    Movie,
    Quote,
    DataNames
} from "./schema";
import {createRESTArgumentsFromGraphqlRequest} from '../helpers/config'

export async function getBook(body: GraphQLBody<{ id: string }>, context: IGraphQLContext) {
    const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, body, 'book');
    const data = await bookController.getBook(req, res, next);
    return data
}

export async function getBooks(body: GraphQLBody<{}>, context: IGraphQLContext) {
    const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, body, 'books');
    const data = await bookController.getBooks(req, res, next)
    return data
}

export async function getChaptersByBook(body: GraphQLBody<{ id: string }>, context: IGraphQLContext) {
    const {
        req: ChaptersReq,
        res: ChaptersRes,
        next: ChaptersNext
    } = createRESTArgumentsFromGraphqlRequest(context, body, 'chapters')
    const chapters = await bookController.getChaptersByBook(ChaptersReq, ChaptersRes, ChaptersNext) as GraphQLResponse<{
        chapters: Chapter[]
    }> | void
    if(!chapters) {
        return chapters
    } else {
        const response = await addBooksToChapters(chapters.chapters, context)
        return {
            ...chapters,
            chapters: response
        }
    }
}

export async function getChapters(body: GraphQLBody<{ id: string } | {}>, context: IGraphQLContext) {
    const {
        req: ChaptersReq,
        res: ChaptersRes,
        next: ChaptersNext
    } = createRESTArgumentsFromGraphqlRequest(context, body, 'chapters')
    const chapters = await bookController.getChaptersByBook(ChaptersReq, ChaptersRes, ChaptersNext) as GraphQLResponse<{
        chapters: Chapter[]
    }> | void
    if(!chapters) {
        return chapters
    } else {
        const response = await addBooksToChapters(chapters.chapters, context)
        return {
            ...chapters,
            chapters: response
        }
    }
}

export async function getChapter(body: GraphQLBody<{ id: string }>, context: IGraphQLContext) {
    const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, body, 'chapter');
    const chapter = await chapterController.getChapter(req, res, next) as GraphQLResponse<{
        chapter: Chapter
    }> | void
    if(!chapter) {
        return chapter
    } else {
        const response =  await addBookToChapter(chapter.chapter, context)
        return {
            ...response,
            chapter: response
        }
    }
}


async function getMovies(body: GraphQLBody<{}>, context: IGraphQLContext) {
    const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, body, 'movies');
    const data = await movieController.getMovies(req, res, next);
    return data
}

async function getQuoteByMovie(body: GraphQLBody<{ movieId: string }>, context: IGraphQLContext) {

}


// movie: ({ id }: {id:number}) => movieController.getMovie({ params: { id } }),
// quoteByMovie: ({ movieId }: {movieId:number}) => movieController.getQuoteByMovie({ params: { id: movieId } }),
// characters: () => characterController.getCharacters(),
// character: ({ id }: {id:number}) => characterController.getCharacter({ params: { id } }),
// quoteByCharacter: ({ characterId }: {characterId:number}) => characterController.getQuoteByCharacter({ params: { id: characterId } }),
// quotes: () => quoteController.getQuotes(),
// quote: ({ id }: {id:number}) => quoteController.getQuote({ params: { id } })

async function addBooksToChapters(chapters: Chapter[], context: IGraphQLContext) {
    const chapterPromises: Promise<Chapter>[] = chapters.map(async (chapter) => {
        if (chapter.book) {
            const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, {id: chapter.book._id}, 'book');
            const book = await bookController.getBook(req, res, next) as Book | void;
            if (book) {
                return {...chapter, book};
            }
        }
        return chapter;
    });
    return await Promise.all(chapterPromises).then((chapters) => chapters);
}

async function addBookToChapter(chapter: Chapter, context: IGraphQLContext) {
    if (chapter.book) {
        const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, {id: chapter.book._id}, 'book');
        const book = await bookController.getBook(req, res, next) as Book | void;
        if (book) {
            return {...chapter, book};
        }
    }
    return chapter;
}

async function addMoviesToQuotes(quotes: Quote[], context: IGraphQLContext) {
    const quotePromises: Promise<Quote>[] = quotes.map(async (quote) => {
        if (quote.movie) {
            const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, {id: quote.movie._id}, 'movie');
            const movie = await movieController.getMovie(req, res, next) as Movie | void;
            if (movie) {
                return {...quote, movie};
            }
        }
        return quote;
    });
    return await Promise.all(quotePromises).then((quotes) => quotes);
}

async function addCharacterToQuote(quote: Quote, context: IGraphQLContext) {
    if (quote.character) {
        const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, {id: quote.character._id}, 'character');
        const character = await characterController.getCharacter(req, res, next) as Character | void;
        if (character) {
            return {...quote, character};
        }
    }
    return quote;
}
