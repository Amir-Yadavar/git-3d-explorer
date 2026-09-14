"use client";

import { useState } from "react";

export default function TestPage() {
  const [result, setResult] = useState<any>(null);

  const testApi = async () => {
    const res = await fetch("/api/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner: "pmndrs", repo: "zustand" }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-8 text-white bg-slate-900 min-h-screen">
      <button 
        onClick={testApi}
        className="bg-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-500"
      >
        تست API دریافت ریپوی Zustand
      </button>

      {result && (
        <pre className="mt-4 p-4 bg-black rounded text-green-400 text-xs overflow-auto max-h-[500px]">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}