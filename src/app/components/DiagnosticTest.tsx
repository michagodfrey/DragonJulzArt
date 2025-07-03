"use client";

import { useQuery } from "@apollo/client";
import {
  GALLERY_FIELDS_QUERY,
  SIMPLE_GALLERY_TEST,
  GET_GALLERY_ITEMS,
} from "../graphql/queries";

export default function DiagnosticTest() {
  const fieldsQuery = useQuery(GALLERY_FIELDS_QUERY);
  const simpleTest = useQuery(SIMPLE_GALLERY_TEST);
  const fullQuery = useQuery(GET_GALLERY_ITEMS);

  console.log("🔍 Diagnostic Results:", {
    fieldsQuery: {
      loading: fieldsQuery.loading,
      error: fieldsQuery.error?.message,
      data: fieldsQuery.data,
    },
    simpleTest: {
      loading: simpleTest.loading,
      error: simpleTest.error?.message,
      data: simpleTest.data,
    },
    fullQuery: {
      loading: fullQuery.loading,
      error: fullQuery.error?.message,
      data: fullQuery.data,
    },
  });

  return (
    <div className="text-center py-8 space-y-8">
      <h3 className="text-xl font-semibold mb-4">
        🔍 GraphQL Diagnostic Results
      </h3>

      {/* Gallery Fields Test */}
      <div className="text-left max-w-4xl mx-auto bg-slate-50 p-4 rounded-lg text-sm">
        <h4 className="font-semibold mb-2">1. Gallery Fields Structure:</h4>
        {fieldsQuery.loading && <p>Loading fields...</p>}
        {fieldsQuery.error && (
          <p className="text-red-600">Error: {fieldsQuery.error.message}</p>
        )}
        {fieldsQuery.data && (
          <div>
            <p className="font-semibold text-green-600">
              ✅ Gallery fields found:
            </p>
            <ul className="mt-2 space-y-1">
              {fieldsQuery.data.__type?.fields?.map((field: any) => (
                <li key={field.name} className="font-mono text-blue-600">
                  {field.name}: {field.type.name || field.type.kind}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Simple Gallery Test */}
      <div className="text-left max-w-4xl mx-auto bg-slate-50 p-4 rounded-lg text-sm">
        <h4 className="font-semibold mb-2">
          2. Simple Gallery Query (id + title):
        </h4>
        {simpleTest.loading && <p>Loading simple test...</p>}
        {simpleTest.error && (
          <p className="text-red-600">Error: {simpleTest.error.message}</p>
        )}
        {simpleTest.data && (
          <div>
            <p className="font-semibold text-green-600">
              ✅ Simple query successful!
            </p>
            <p>Found {simpleTest.data.galleries?.length || 0} galleries</p>
            {simpleTest.data.galleries
              ?.slice(0, 3)
              .map((gallery: any, i: number) => (
                <p key={i} className="text-blue-600">
                  - {gallery.title} (ID: {gallery.id})
                </p>
              ))}
          </div>
        )}
      </div>

      {/* Full Gallery Test */}
      <div className="text-left max-w-4xl mx-auto bg-slate-50 p-4 rounded-lg text-sm">
        <h4 className="font-semibold mb-2">
          3. Full Gallery Query (all fields):
        </h4>
        {fullQuery.loading && <p>Loading full query...</p>}
        {fullQuery.error && (
          <div>
            <p className="text-red-600">Error: {fullQuery.error.message}</p>
            {fullQuery.error.graphQLErrors &&
              fullQuery.error.graphQLErrors.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold">GraphQL Errors:</p>
                  {fullQuery.error.graphQLErrors.map((err: any, i: number) => (
                    <p key={i} className="text-red-500">
                      - {err.message}
                    </p>
                  ))}
                </div>
              )}
          </div>
        )}
        {fullQuery.data && (
          <div>
            <p className="font-semibold text-green-600">
              ✅ Full query successful!
            </p>
            <p>Found {fullQuery.data.galleries?.length || 0} galleries</p>
            {fullQuery.data.galleries
              ?.slice(0, 1)
              .map((gallery: any, i: number) => (
                <div key={i} className="mt-2 p-2 bg-white rounded border">
                  <p>
                    <strong>ID:</strong> {gallery.id}
                  </p>
                  <p>
                    <strong>Title:</strong> {gallery.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {gallery.description}
                  </p>
                  <p>
                    <strong>Price:</strong> ${gallery.price}
                  </p>
                  <p>
                    <strong>Available:</strong>{" "}
                    {gallery.available ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Date Painted:</strong> {gallery.datePainted}
                  </p>
                  <p>
                    <strong>Slug:</strong> {gallery.slug}
                  </p>
                  <p>
                    <strong>Image URL:</strong>{" "}
                    {gallery.image?.url ? "Present" : "Missing"}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="text-left max-w-4xl mx-auto bg-yellow-50 p-4 rounded-lg text-sm border border-yellow-200">
        <h4 className="font-semibold mb-2">📋 Summary:</h4>
        <ul className="space-y-1">
          <li>
            • Fields Test:{" "}
            {fieldsQuery.loading
              ? "Loading..."
              : fieldsQuery.error
              ? "❌ Failed"
              : "✅ Passed"}
          </li>
          <li>
            • Simple Test:{" "}
            {simpleTest.loading
              ? "Loading..."
              : simpleTest.error
              ? "❌ Failed"
              : "✅ Passed"}
          </li>
          <li>
            • Full Test:{" "}
            {fullQuery.loading
              ? "Loading..."
              : fullQuery.error
              ? "❌ Failed"
              : "✅ Passed"}
          </li>
        </ul>
      </div>
    </div>
  );
}
