"use client";

import { useQuery } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/client";
import { GET_ALL_GALLERY_DATA } from "../graphql/queries";
import GalleryGrid, { GalleryItem } from "./GalleryGrid";

function mapToGalleryItems(
  raw: Array<{
    id: string;
    title: string;
    description?: string;
    price?: number;
    number?: number;
    image: { url: string };
  }>
): GalleryItem[] {
  return (raw ?? []).map((g) => ({
    id: g.id,
    title: g.title,
    description: g.description,
    price: g.price,
    number: g.number,
    image: g.image,
  }));
}

function GalleryContent() {
  const { loading, error, data } = useQuery(GET_ALL_GALLERY_DATA);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-[var(--clr-surface)] rounded-xl mb-4"></div>
            <div className="h-4 bg-[var(--clr-surface)] rounded mb-2"></div>
            <div className="h-3 bg-[var(--clr-surface)] rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">
          Error loading gallery: {error.message}
        </p>
        <p className="text-[var(--clr-text-muted)] mb-4">
          Please check your Hygraph configuration and try again.
        </p>
        <div className="text-left max-w-md mx-auto bg-[var(--clr-surface)]/60 backdrop-blur-sm p-4 rounded-lg text-sm border border-[var(--clr-primary)]/20">
          <p className="font-semibold mb-2 text-[var(--clr-text)]">
            Debug Info:
          </p>
          <p className="text-[var(--clr-text-muted)]">Error: {error.message}</p>
          {error.graphQLErrors && error.graphQLErrors.length > 0 && (
            <p className="text-[var(--clr-text-muted)]">
              GraphQL Errors:{" "}
              {error.graphQLErrors.map((e) => e.message).join(", ")}
            </p>
          )}
          {error.networkError && (
            <p className="text-[var(--clr-text-muted)]">
              Network Error: {error.networkError.message}
            </p>
          )}
        </div>
      </div>
    );
  }

  const softPastels = mapToGalleryItems(data?.softPastels ?? []);
  const charcoalAndPastels = mapToGalleryItems(data?.charcoalAndPastels ?? []);

  const hasAny = softPastels.length > 0 || charcoalAndPastels.length > 0;
  if (!hasAny) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--clr-text-muted)]">
          No gallery items found. Please add some items to your Hygraph CMS.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {softPastels.length > 0 && (
        <div>
          <GalleryGrid
            items={softPastels}
            categoryTitle="Soft Pastel"
          />
        </div>
      )}
      {charcoalAndPastels.length > 0 && (
        <div>
          <GalleryGrid
            items={charcoalAndPastels}
            categoryTitle="Charcoal"
          />
        </div>
      )}
    </div>
  );
}

export default function GalleryWrapper() {
  return (
    <ApolloProvider client={client}>
      <GalleryContent />
    </ApolloProvider>
  );
}
