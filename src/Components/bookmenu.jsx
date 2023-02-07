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
      }
    }
  }
`;

const AUTHORS_QUERY = gql`
  query {
    authors {
      id
      name
      books {
        name
      }
    }
  }
`;

function BookList() {
  const [selectedTab, setSelectedTab] = useState("books");
  let query;
  if (selectedTab === "books") {
    query = BOOKS_QUERY;
  } else {
    query = AUTHORS_QUERY;
  }
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div>
      <div>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => setSelectedTab("books")}
        >
          Books
        </button>
        <button onClick={() => setSelectedTab("authors")}>Authors</button>
      </div>
      <br />
      {selectedTab === "books" ? (
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
      ) : (
        <ul>
          {data.authors.map((author) => (
            <li key={author.id}>
              <b>Author ID:</b> {author.id}
              <br />
              <b>Name:</b> {author.name}
              <br />
              <b>Books:</b>{" "}
              {author.books.map((book) => (
                <p key={book.name}>{book.name}</p>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
