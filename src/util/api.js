/*
  A function that sets up a connection to a graphql API endpoint. 
  It has a query parameter that will allow an functions to query the specific data it needs
  as well as use any variables that it may require as well
*/
export const getApi = (query, variables) => {
  return fetch("https://api.partly.com/node-api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((response) => response.json());
};
