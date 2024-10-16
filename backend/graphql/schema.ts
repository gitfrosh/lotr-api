import {buildSchema} from "graphql/utilities";

const schema = buildSchema(`
   type Query {
    books: BooksResponse
    book(id: ID!, pagination:PaginationInput): BooksResponse
    chaptersByBook(bookId: ID!): ChaptersResponse
    chapters: ChaptersResponse
    chapter(id: ID!): ChaptersResponse
    movies: MoviesResponse
    movie(id: ID!): MoviesResponse
    quoteByMovie(movieId: ID!): QuotesResponse
    characters: CharactersResponse
    character(id: ID!): CharactersResponse
    quoteByCharacter(characterId: ID!): QuotesResponse
    quotes: QuotesResponse
    quote(id: ID!): QuotesResponse
  }
  type BooksResponse {
    _id: ID
    name: String
   total: Int
    limit: Int
    page: Int
    pages: Int
  }
  type ChaptersResponse {
    chapters: [Chapter]
   total: Int
    limit: Int
    page: Int
    pages: Int
  }
    type MoviesResponse {
   movies: [Movie]
   total: Int
    limit: Int
    page: Int
    pages: Int
    }
    type CharactersResponse {
        characters: [Character]
     total: Int
    limit: Int
    page: Int
    pages: Int
    }
    type QuotesResponse {
        quotes: [Quote]
       total: Int
    limit: Int
    page: Int
    pages: Int
    }
 
  type Book {
    _id: ID
    name: String
  }

  type Chapter {
    id: ID
    title: String
    content: String
  }

  type Movie {
    id: ID
    title: String
    director: String
  }

  type Character {
    id: ID
    name: String
  }

  type Quote {
    id: ID
    text: String
  }
  type Pagination {
    total: Int
    limit: Int
    page: Int
    pages: Int
    }
  input PaginationInput {
      sort: String
      limit: Int
      page: Int
      offset: Int
  }
`);


export default schema;

export interface IGraphQLContext {
    requestInfo: {
        req: Express.Request;
        context: {
            res: Express.Response;
        }
    }
}

export type GraphQLBody<T> = T & {
    sort?: string
    limit?: string
    page?: string
    offset?: string
}


export type DataNames = 'books' | 'book' | 'chaptersByBook' | 'chapters' | 'chapter' | 'movies' | 'movie' | 'quoteByMovie' | 'characters' | 'character' | 'quoteByCharacter' | 'quotes' | 'quote'