import {buildSchema} from "graphql/utilities";

const schema = buildSchema(`
   type Query {
    books: BooksResponse
    book(id: ID!, pagination:PaginationInput): BookResponse
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
    books: [Book]
   total: Int
    limit: Int
    page: Int
    pages: Int
  }
  type BookResponse {
   book: Book
   total: Int
    limit: Int
    page: Int
    pages: Int
  }
  type ChapterResponse {
   chapter: Chapter
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
  type MovieResponse {
    movie: Movie
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
    type CharacterResponse {
    character: Character
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
    type QuoteResponse {
    quote: Quote
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
    _id: ID
    title: String
    content: String
    Book: Book
  }

  type Movie {
    _id: ID
    name: String
    runtimeInMinutes: Int
    budgetInMillions: Int
    boxOfficeRevenueInMillions: Int
    academyAwardNominations: Int
    academyAwardWins: Int
    rottenTomatoesScore: Int
  }

  type Character {
    _id: ID
    height: String
    race: String
    gender: String
    birth: String
    spouse: String
    death: String
    realm: String
    hair: String
    name: String
    wikiUrl: String
  }
  
  type Quote {
    _id: ID
    dialog: String
    movie: Movie
    Character: Character
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
export type GraphQLResponse<T> = T & {
    total: number
    limit: number
    page: number
    pages: number
}
export type Book = {
    _id: string
    name: string
}
export type Chapter = {
    _id: string
    title: string
    content: string
    book: Book | undefined
}
export type Movie = {
    _id: string
    name: string
    runtimeInMinutes: number
    budgetInMillions: number
    boxOfficeRevenueInMillions: number
    academyAwardNominations: number
    academyAwardWins: number
    rottenTomatoesScore: number
}
export type Character = {
    _id: string
    height: string
    race: string
    gender: string
    birth: string
    spouse: string
    death: string
    realm: string
    hair: string
    name: string
    wikiUrl: string
}

export type Quote = {
    _id: string
    dialog: string
    movie: Movie
    Character: Character
}





export type DataNames =
    'books'
    | 'book'
    | 'chapters'
    | 'chapter'
    | 'movies'
    | 'movie'
    | 'quoteByMovie'
    | 'characters'
    | 'character'
    | 'quoteByCharacter'
    | 'quotes'
    | 'quote'