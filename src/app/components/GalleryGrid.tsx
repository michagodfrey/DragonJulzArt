"use client";

import { useQuery } from "@apollo/client";
import { GET_GALLERY_ITEMS } from "../graphql/queries";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  price: number;
  available: boolean;
  datePainted: number;
  slug: string;
  image: {
    url: string;
  };
}

export default function GalleryGrid() {
  console.log("🎨 GalleryGrid component rendering...");

  const { loading, error, data } = useQuery(GET_GALLERY_ITEMS);

  console.log("📊 Query state:", {
    loading,
    hasError: !!error,
    errorMessage: error?.message,
    hasData: !!data,
    dataKeys: data ? Object.keys(data) : [],
    galleriesCount: data?.galleries?.length || 0,
  });

  if (error) {
    console.error("❌ GraphQL Error:", {
      message: error.message,
      graphQLErrors: error.graphQLErrors,
      networkError: error.networkError,
      extraInfo: error.extraInfo,
    });
  }

  if (loading) {
    console.log("⏳ Loading gallery data...");
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-slate-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-slate-200 rounded mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">
          Error loading gallery: {error.message}
        </p>
        <p className="text-slate-600 mb-4">
          Please check your Hygraph configuration and try again.
        </p>
        <div className="text-left max-w-md mx-auto bg-slate-50 p-4 rounded-lg text-sm">
          <p className="font-semibold mb-2">Debug Info:</p>
          <p>Error: {error.message}</p>
          {error.graphQLErrors && error.graphQLErrors.length > 0 && (
            <p>
              GraphQL Errors:{" "}
              {error.graphQLErrors.map((e) => e.message).join(", ")}
            </p>
          )}
          {error.networkError && (
            <p>Network Error: {error.networkError.message}</p>
          )}
        </div>
      </div>
    );
  }

  const galleries = data?.galleries || [];
  console.log("🖼️ Gallery items found:", galleries.length);

  if (galleries.length > 0) {
    console.log("📋 First gallery item:", galleries[0]);
  }

  if (galleries.length === 0) {
    console.log("⚠️ No gallery items found in data");
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">
          No gallery items found. Please add some items to your Hygraph CMS.
        </p>
        <div className="text-left max-w-md mx-auto bg-slate-50 p-4 rounded-lg text-sm mt-4">
          <p className="font-semibold mb-2">Debug Info:</p>
          <p>Data received: {JSON.stringify(data, null, 2)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {galleries.map((item: GalleryItem) => (
        <div
          key={item.id}
          className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="aspect-square relative overflow-hidden">
            {item.image?.url ? (
              <Image
                src={item.image.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <span className="text-slate-400 text-4xl">🖼️</span>
              </div>
            )}

            {!item.available && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Sold
              </div>
            )}
          </div>

          <div className="p-6">
            <h4 className="font-semibold text-slate-900 mb-2 text-lg">
              {item.title}
            </h4>
            <p className="text-slate-600 text-sm mb-3 line-clamp-2">
              {item.description}
            </p>

            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-500">
                Painted {item.datePainted}
              </div>
              {item.available && (
                <div className="text-lg font-semibold text-blue-600">
                  ${item.price.toLocaleString()}
                </div>
              )}
            </div>

            {item.available && (
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
