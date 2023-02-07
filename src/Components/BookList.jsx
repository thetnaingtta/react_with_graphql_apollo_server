import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const BOOKS_QUERY = gql`
  query {
    books {
      id
      name
      author {
        name
      }
    }
  }
`;

function BookList() {
  const { loading, error, data } = useQuery(BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  if (!data || !data.books) return <p>No books found</p>;

  return (
    <ul>
      {data.books.map((book) => (
        <li key={book.id}>
          <b>Book ID:</b> {book.id}
          <br />
          <b>Title:</b> {book.name}
          <br />
          <b>Author:</b> {book.author.name}
        </li>
      ))}
    </ul>
  );
}

export default BookList;
