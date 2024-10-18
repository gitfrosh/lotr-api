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
    DataNames, ChapterWithBookId
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
    if (!chapters) {
        return chapters
    } else {
        const chaptersWithBookId = chapters.chapters.map((chapter) => {
            return {
                ...chapter,
                book: body.id
            }
        })
        const response = await addBooksToChapters(chaptersWithBookId, context)
        return {
            ...chapters,
            chapters: response
        }
    }
}

export async function getChapters(body: GraphQLBody<{}>, context: IGraphQLContext) {
    const {
        req: ChaptersReq,
        res: ChaptersRes,
        next: ChaptersNext
    } = createRESTArgumentsFromGraphqlRequest(context, body, 'chapters')
    const chapters = await chapterController.getChapters(ChaptersReq, ChaptersRes, ChaptersNext) as GraphQLResponse<{
        chapters: ChapterWithBookId[]
    }> | void
    if (!chapters) {
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
        chapter: ChapterWithBookId
    }> | void
    if (!chapter) {
        return chapter
    } else {
        const response = await addBooksToChapters(chapter.chapter, context)
        return {
            ...chapter,
            chapter: response
        }
    }
}

export async function getMovie(body: GraphQLBody<{ id: string }>, context: IGraphQLContext) {
    const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, body, 'movie');
    const data = await movieController.getMovie(req, res, next);
    return data
}

export async function getMovies(body: GraphQLBody<{}>, context: IGraphQLContext) {
    const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, body, 'movies');
    const data = await movieController.getMovies(req, res, next);
    return data
}

export async function getQuoteByMovie(body: GraphQLBody<{ movieId: string }>, context: IGraphQLContext) {
    const {
        req: QuotesReq,
        res: QuotesRes,
        next: QuotesNext
    } = createRESTArgumentsFromGraphqlRequest(context, body, 'quotes')
    const quotes = await movieController.getQuoteByMovie(QuotesReq, QuotesRes, QuotesNext) as GraphQLResponse<{
        quotes: Quote[]
    }> | void
    if (!quotes) {
        return quotes
    } else {
        let response = await addMoviesToQuotes(quotes.quotes, context)
        response = await addCharacterToQuotes(response, context)
        return {
            ...quotes,
            quotes: response
        }
    }
}

export async function getCharacter(body: GraphQLBody<{ id: string }>, context: IGraphQLContext) {
    const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, body, 'character');
    const data = await characterController.getCharacter(req, res, next);
    return data
}

export async function getCharacters(body: GraphQLBody<{}>, context: IGraphQLContext) {
    const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, body, 'characters');
    const data = await characterController.getCharacters(req, res, next);
    return data
}

export async function getQuoteByCharacter(body: GraphQLBody<{ characterId: string }>, context: IGraphQLContext) {
    const {
        req: QuotesReq,
        res: QuotesRes,
        next: QuotesNext
    } = createRESTArgumentsFromGraphqlRequest(context, body, 'quotes')
    const quotes = await characterController.getQuoteByCharacter(QuotesReq, QuotesRes, QuotesNext) as GraphQLResponse<{
        quotes: Quote[]
    }> | void
    if (!quotes) {
        return quotes
    } else {
        let response = await addMoviesToQuotes(quotes.quotes, context)
        response = await addCharacterToQuotes(response, context)
        return {
            ...quotes,
            quotes: response
        }
    }
}

export async function getQuote(body: GraphQLBody<{ id: string }>, context: IGraphQLContext) {
    const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, body, 'quote');
    let quote = await quoteController.getQuote(req, res, next) as GraphQLResponse<{
        quote: Quote
    }> | void
    if (!quote) {
        return quote
    }
    let response = await addMoviesToQuotes(quote.quote, context)
    response = await addCharacterToQuotes(response, context)
    return {
        ...quote,
        quote: response
    }
}

export async function getQuotes(body: GraphQLBody<{}>, context: IGraphQLContext) {
    const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, body, 'quotes');
    let quotes = await quoteController.getQuotes(req, res, next) as GraphQLResponse<{
        quotes: Quote[]
    }> | void
    if (!quotes) {
        return quotes
    }
    let response = await addMoviesToQuotes(quotes.quotes, context)
    response = await addCharacterToQuotes(response, context)
    return {
        ...quotes,
        quotes: response
    }
}


async function addBooksToChapters(chapters: ChapterWithBookId[] | ChapterWithBookId, context: IGraphQLContext) {
    if (!Array.isArray(chapters)) {
        if (chapters.book) {
            const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, {id: chapters.book}, 'book', false);
            const book = await bookController.getBook(req, res, next) as {book:Book}  | void;
            if (book) {
                return {...chapters, book:book.book};
            }
        }
        return chapters
    } else {
        const chapterPromises: Promise<Chapter>[] = chapters.map(async (chapter) => {
            if (chapter.book) {
                const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, {id: chapter.book}, 'book', false);
                const book = await bookController.getBook(req, res, next) as {book:Book} | void;
                if (book) {
                    return {...chapter, book:book.book};
                }
            }
            return chapter;
        });
        return await Promise.all(chapterPromises).then((chapters) => chapters);
    }
}


async function addMoviesToQuotes(quotes: Quote[] | Quote, context: IGraphQLContext) {
    if (!Array.isArray(quotes)) {
        if (quotes.movie) {
            const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, {id: quotes.movie._id}, 'movie', false);
            const movie = await movieController.getMovie(req, res, next) as {movie:Movie}  | void;
            if (movie) {
                return {...quotes, movie:movie.movie}
            }
        }
        return quotes
    } else {
        const quotePromises: Promise<Quote>[] = quotes.map(async (quote) => {
            if (quote.movie) {
                const {req, res, next} = createRESTArgumentsFromGraphqlRequest(context, {id: quote.movie._id}, 'movie', false);
                const movie = await movieController.getMovie(req, res, next) as {movie:Movie}  | void;
                if (movie) {
                    return {...quote, movie:movie.movie};
                }
            }
            return quote;
        });
        return await Promise.all(quotePromises).then((quotes) => quotes);
    }
}

async function addCharacterToQuotes(quote: Quote[] | Quote, context: IGraphQLContext) {
    if (!Array.isArray(quote)) {
        if (quote.character) {
            const {
                req,
                res,
                next
            } = createRESTArgumentsFromGraphqlRequest(context, {id: quote.character._id}, 'character', false);
            const character = await characterController.getCharacter(req, res, next) as {character: Character } | void;
            if (character) {
                return {...quote, character:character.character};
            }
        }
        return quote;
    } else {
        const quotePromises: Promise<Quote>[] = quote.map(async (quote) => {
            if (quote.character) {
                const {
                    req,
                    res,
                    next
                } = createRESTArgumentsFromGraphqlRequest(context, {id: quote.character._id}, 'character', false);
                const character = await characterController.getCharacter(req, res, next) as {character: Character } | void;
                if (character) {
                    return {...quote, character:character.character};
                }
            }
            return quote;
        });
        return await Promise.all(quotePromises).then((quotes) => quotes);
    }
}
