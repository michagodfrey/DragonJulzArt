"use client";

import { useState } from "react";

export default function APITest() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://ap-south-1.cdn.hygraph.com/content/cmcir9b2e02zv07w4ulsdh3k2/master",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            query {
              galleries {
                id
                title
              }
            }
          `,
          }),
        }
      );

      const data = await response.json();
      setResult(data);
      console.log("🔍 API Test Result:", data);
    } catch (error) {
      setResult({ error: error.message });
      console.error("❌ API Test Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="text-center py-8">
      <h3 className="text-xl font-semibold mb-4">🔍 Direct API Test</h3>

      <button
        onClick={testAPI}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 mb-4"
      >
        {loading ? "Testing..." : "Test API Directly"}
      </button>

      {result && (
        <div className="text-left max-w-4xl mx-auto bg-slate-50 p-4 rounded-lg text-sm">
          <h4 className="font-semibold mb-2">API Response:</h4>
          <pre className="whitespace-pre-wrap overflow-auto max-h-96">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
