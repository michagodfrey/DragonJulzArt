"use client";

import { useQuery } from "@apollo/client";
import { TEST_QUERY } from "../graphql/queries";

export default function SchemaTest() {
  const { loading, error, data } = useQuery(TEST_QUERY);

  console.log("🔍 Schema Test Results:", {
    loading,
    hasError: !!error,
    errorMessage: error?.message,
    hasData: !!data,
    schemaTypes: data?.__schema?.types?.length || 0,
  });

  if (loading) {
    return <div className="text-center py-8">🔍 Loading schema...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">❌ Schema Error: {error.message}</p>
        <div className="text-left max-w-2xl mx-auto bg-slate-50 p-4 rounded-lg text-sm">
          <p className="font-semibold mb-2">Full Error:</p>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  const types = data?.__schema?.types || [];
  const contentTypes = types.filter(
    (type: any) => type.kind === "OBJECT" && !type.name.startsWith("__")
  );

  return (
    <div className="text-center py-8">
      <h3 className="text-xl font-semibold mb-4">🔍 Available Content Types</h3>
      <div className="text-left max-w-2xl mx-auto bg-slate-50 p-4 rounded-lg text-sm">
        <p className="font-semibold mb-2">
          Found {contentTypes.length} content types:
        </p>
        <ul className="space-y-1">
          {contentTypes.map((type: any) => (
            <li key={type.name} className="font-mono text-blue-600">
              {type.name}
            </li>
          ))}
        </ul>

        {contentTypes.length === 0 && (
          <p className="text-red-600">
            No content types found. Check your Hygraph setup.
          </p>
        )}

        <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm">
            <strong>Next steps:</strong> Look for your gallery model in the list
            above. It might be named differently (e.g., "Gallery", "Artwork",
            "Piece", etc.)
          </p>
        </div>
      </div>
    </div>
  );
}
