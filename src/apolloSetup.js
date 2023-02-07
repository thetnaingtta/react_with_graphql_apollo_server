// It creates two separate links for communication with the API: a WebSocket link (wsLink)
// and a HTTP link (httpLink).

// The WebSocket link is set up to connect to a websocket endpoint at
// ws://localhost:4000/graphql and is set to automatically reconnect if the connection is lost.

// The HTTP link is set up to connect to a HTTP endpoint at http://localhost:4000/graphql.
// The two links are then combined using the split function from the apollo-link library.

// The split function takes a test function that defines the conditions for splitting the link.
// In this case, it splits the link based on the type of operation
// (query or subscription) defined in the GraphQL request.

// The Apollo client is then created using the combined link and an in-memory cache (new InMemoryCache()).
// Finally, the ApolloClient instance is exported as the default export of the module.

import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default apolloClient;
