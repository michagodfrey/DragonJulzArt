"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/client";
import GalleryGrid from "./GalleryGrid";

export default function GalleryWrapper() {
  return (
    <ApolloProvider client={client}>
      <GalleryGrid />
    </ApolloProvider>
  );
}
