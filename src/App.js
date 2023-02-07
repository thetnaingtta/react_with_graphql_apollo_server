// This code is a ReactJS component named "App" that sets up an ApolloClient and wraps another component (BookList) with the ApolloProvider component
// from the @apollo/client library.
// The ApolloClient instance is imported from a separate file (apolloSetup) and passed as a prop to the ApolloProvider component.
// The ApolloProvider component allows the BookList component to access the ApolloClient instance and make GraphQL queries and mutations.

import React from "react";
import { ApolloProvider } from "@apollo/client";

import apolloClient from "./apolloSetup";

// import UserList from "./Components/UserList";
// import BookList from "./Components/BookList";
// import BookList from "./Components/BookListAuthor";
import BookList from "./Components/BookListWithSubscription";
// import BookList from "./Components/bookmenu";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BookList />
    </ApolloProvider>
  );
}

export default App;
