import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const hygraphUrl =
  process.env.NEXT_PUBLIC_HYGRAPH_URL ||
  "https://api-eu-central-1.hygraph.com/v2/your-project-id/master";

const httpLink = createHttpLink({
  uri: hygraphUrl,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});
