import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const hygraphUrl =
  process.env.NEXT_PUBLIC_HYGRAPH_URL ||
  "https://api-eu-central-1.hygraph.com/v2/your-project-id/master";

console.log("🔗 Hygraph URL:", hygraphUrl);
console.log("🌍 Environment check:", {
  hasEnvVar: !!process.env.NEXT_PUBLIC_HYGRAPH_URL,
  envValue: process.env.NEXT_PUBLIC_HYGRAPH_URL,
});

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

console.log("🚀 Apollo Client initialized");
