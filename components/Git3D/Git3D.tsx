"use client";

import ThreeCanvas from "@/features/canvas/scene-3d/ThreeCanvas";
import { Sparkles, Send, FileCode, ArrowRight, GitFork, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Git3D() {
  const [result, setResult] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
    const [repoUrl, setRepoUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const testApi = async () => {
    const res = await fetch("/api/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner: "pmndrs", repo: "zustand" }),
    });
    const data = await res.json();
    setResult(data);
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // اینجا توابع دریافت API یا پردازش داده قرار می‌گیرد
    console.log("Analyzing repo:", repoUrl);
  };

  const handleNodeSelect = (filePath: string) => {
    setSelectedFile(filePath);
    if (!isPanelOpen) {
      setIsPanelOpen(true);
    }
  };
  return (
    <div className=" text-white bg-slate-900 min-h-screen">
    <div className="relative w-full h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* three scene*/}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas data={result} onSelectNode={handleNodeSelect} />
      </div>

      {/* container ai*/}
      <aside
        className={`absolute z-10 p-3 md:p-5 pointer-events-none transition-all duration-300 ease-in-out bottom-0 left-0 right-0 md:bottom-auto md:top-0 md:right-0 md:left-auto md:w-100 md:h-full flex flex-col justify-end md:justify-start
        `}
      >
        <div
          className={`w-full bg-slate-900/25 backdrop-blur-xl border border-slate-800/80 rounded-2xl md:rounded-3xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden transition-all duration-300 ${
            isPanelOpen
              ? "max-h-[80vh] md:h-full md:max-h-none"
              : "max-h-17.5 md:max-h-none"
          }`}
        >
          {/*header*/}
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-800/80 bg-slate-900/90 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg md:text-xl tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Git 3D Explorer
                </h1>
              
              </div>
            </div>

           
            <button
              type="button"
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-white transition-all active:scale-95 flex items-center justify-center shrink-0 ml-2"
              title={isPanelOpen ? "Collapse Panel" : "Expand Panel"}
            >
              {isPanelOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-300" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-300" />
              )}
            </button>
          </div>

          {/* pannel content*/}
          <div
            className={`transition-all duration-300 ease-in-out overflow-y-auto custom-scrollbar ${
              isPanelOpen
                ? "flex-1 opacity-100 p-4 md:p-5 space-y-5"
                : "max-h-0 opacity-0 p-0 overflow-hidden"
            }`}
          >
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Visualize any GitHub repository as an interactive 3D directory
              tree. Select any file node in the canvas to trigger instant
              AI-powered code analysis.
            </p>

          
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <label
                htmlFor="repo-url"
                className="text-xs font-medium text-slate-300 flex items-center gap-1.5"
              >
                <GitFork className="w-3.5 h-3.5 text-slate-400" />
                GitHub Repository URL
              </label>

              <div className="relative flex items-center">
                <input
                  id="repo-url"
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/owner/repo"
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none transition-all pr-10"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all active:scale-95 shadow-lg shadow-indigo-600/30"
                  title="Analyze Repo"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-3.5 flex flex-col justify-between space-y-3 min-h-40 md:min-h-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-300">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <span>AI Code Insights</span>
                </div>
                {selectedFile && (
                  <span className="text-[10px] text-slate-400 truncate max-w-30">
                    {selectedFile}
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center p-3 rounded-lg border border-dashed border-slate-800/80 bg-slate-900/30">
                {selectedFile ? (
                  <div className="text-xs text-slate-300 space-y-1">
                    <p className="font-semibold text-indigo-400">
                      Analyzing file...
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Parsing AST and generating summary.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-medium">
                      No file selected
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Click any node in the 3D space to inspect code.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </aside>
    </div>

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
