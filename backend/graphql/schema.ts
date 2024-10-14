import {buildSchema} from "graphql/utilities";

const schema = buildSchema(`
   type Query {
    books: [Book]
    book(id: ID!): Book
    chaptersByBook(bookId: ID!): [Chapter]
    chapters: [Chapter]
    chapter(id: ID!): Chapter
    movies: [Movie]
    movie(id: ID!): Movie
    quoteByMovie(movieId: ID!): [Quote]
    characters: [Character]
    character(id: ID!): Character
    quoteByCharacter(characterId: ID!): [Quote]
    quotes: [Quote]
    quote(id: ID!): Quote
  }

  type Book {
    id: ID
    name: String
    author: String
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
`);

export default schema;