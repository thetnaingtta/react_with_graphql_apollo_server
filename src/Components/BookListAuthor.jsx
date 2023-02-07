import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const BOOKS_QUERY = gql`
  query {
    books {
      id
      name
      author {
        id
        name
        books {
          name
        }
      }
    }
  }
`;

function BookList() {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const { loading, error, data } = useQuery(BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  if (!data || !data.books) return <p>No books found</p>;

  function handleAuthorClick(author) {
    setSelectedAuthor(author);
  }

  if (selectedAuthor) {
    return (
      <div>
        <h3>Author Details</h3>
        <p>
          <b>Author ID:</b> {selectedAuthor.id}
        </p>
        <p>
          <b>Name:</b> {selectedAuthor.name}
        </p>
        {selectedAuthor.books.length > 0 && (
          <div>
            <p>
              <b>Books:</b>
            </p>
            <ul>
              {selectedAuthor.books.map((book) => (
                <li key={book.id}>{book.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <ul>
      {data.books.map((book) => (
        <li key={book.id}>
          <b>Book ID:</b> {book.id}
          <br />
          <b>Title:</b> {book.name}
          <br />
          <b>
            Author:{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleAuthorClick(book.author)}
            >
              {book.author.name}
            </span>
          </b>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
