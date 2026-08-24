'use client';

import { useState } from 'react';
import { ThreeCanvas } from '@/features/canvas/components/ThreeCanvas';
import { PromptForm } from '@/features/generator/components/PromptForm';

const DUCK_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb';
const HELMET_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb';

export default function Home() {
  const [modelUrl, setModelUrl] = useState(DUCK_URL);
  const [isLoading, setIsLoading] = useState(false);

  // شبیه‌سازی رفتار هوش مصنوعی برای تست اولیه
  const handleGenerate = (userPrompt: string) => {
    setIsLoading(true);
    console.log('پرامپت دریافت شد:', userPrompt);

    // شبیه‌سازی تاخیر ۳ ثانیه‌ای API
    setTimeout(() => {
      // سوئیچ بین دو مدل جهت تست تعویض دینامیک
      setModelUrl((prev) => (prev === DUCK_URL ? HELMET_URL : DUCK_URL));
      setIsLoading(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center gap-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          AI 3D Asset Generator
        </h1>
        <p className="text-slate-400 text-sm">
          توصیف کن، هوش مصنوعی مدل ۳بعدی آن را تولید می‌کند.
        </p>
      </header>

      <section className="w-full max-w-3xl space-y-6">
        <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
        <ThreeCanvas modelUrl={modelUrl} />
      </section>
    </main>
  );
}