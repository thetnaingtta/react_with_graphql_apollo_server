// File: UserList.js
import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

function UserList() {
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}

export default UserList;
