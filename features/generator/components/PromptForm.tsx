'use client';

import React, { useState } from 'react';

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onSubmit(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-3">
      <div className="relative flex items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="مثلاً: یک صندلی گیمینگ مدرن با نور نئون بنفش..."
          disabled={isLoading}
          className="w-full px-5 py-4 pl-32 text-sm bg-slate-800/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50 shadow-xl backdrop-blur-md"
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="absolute left-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-medium text-sm rounded-xl transition-all shadow-md active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>در حال ساخت...</span>
            </>
          ) : (
            <span>تولید ۳بعدی ✨</span>
          )}
        </button>
      </div>
    </form>
  );
}