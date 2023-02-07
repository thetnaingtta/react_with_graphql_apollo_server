// This is a React component called "BookList". The component fetches a list of books
// from a GraphQL API using the "useQuery" hook from the "@apollo/client" library.
// It also uses the "useSubscription" hook from the "@apollo/react-hooks" library
// to subscribe to real-time updates for newly added books.

// The component uses the useState hook to manage the state of the books,
// newBooks and the notification.
// The component displays a notification bar when a new book is added,
// showing the latest book added and a close button to close the notification.

// The component also implements a useEffect hook,
// which updates the books and newBooks whenever new data is received from the query
// and subscription.
// The component returns a list of books, including the new books, displayed in an unordered list.

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSubscription } from "@apollo/react-hooks";
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

const BOOK_ADDED_SUBSCRIPTION = gql`
  subscription {
    bookAdded {
      id
      name
      author {
        name
      }
    }
  }
`;

function BookList() {
  const [books, setBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [notification, setNotification] = useState(false);
  const { data, error, loading } = useQuery(BOOKS_QUERY);
  const noti = useSubscription(BOOK_ADDED_SUBSCRIPTION);

  // useSubscription(BOOK_ADDED_SUBSCRIPTION, {
  //   onData: ({ data }) => {
  //     console.log("Subscription data received: ", data.bookAdded);
  //     // setBooks((prevBooks) => [...prevBooks, data.bookAdded]);
  //   },
  // });

  useEffect(() => {
    if (data) {
      setBooks(data.books);
    }
    if (noti) {
      if (noti.data) {
        setNewBooks((newBooks) => [...newBooks, noti.data.bookAdded]);
        setNotification(true);
      }
    }
  }, [data, noti.data]);

  const closeNotification = () => {
    setNotification(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Query error: ", error);
    return <p>Error :</p>;
  }
  if (!books || !books.length) return <p>No books found</p>;

  return (
    <div>
      {notification && (
        <div id="notification-bar" style={{ color: "red", padding: "10px" }}>
          <p>
            <b>New Book Added:</b> {newBooks[newBooks.length - 1].name}{" "}
            <button
              style={{
                border: "none",
                color: "black",
              }}
              onClick={closeNotification}
            >
              X
            </button>
          </p>
        </div>
      )}
      <ul>
        {[...books, ...newBooks].map((book) => {
          if (!book) return null;

          return (
            <li key={book.id}>
              <b>Book ID:</b> {book.id}
              <br />
              <b>Title:</b> {book.name}
              <br />
              <b>Author:</b> {book.author.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BookList;
