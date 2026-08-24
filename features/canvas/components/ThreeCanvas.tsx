'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Stage } from '@react-three/drei';
import { Suspense } from 'react';
import { DynamicModel } from './DynamicModel';

interface ThreeCanvasProps {
  modelUrl: string;
}

// کامپوننت لودینگ ساده داخل صحنه ۳بعدی
function Loader() {
  return (
    <Html center>
      <div className="flex items-center gap-2 rounded-lg bg-black/80 px-4 py-2 text-white shadow-lg backdrop-blur">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <span className="text-sm font-medium">در حال دریافت مدل ۳بعدی...</span>
      </div>
    </Html>
  );
}

export function ThreeCanvas({ modelUrl }: ThreeCanvasProps) {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-800">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        {/* نورپردازی پیشرفته و آماده استودیو با Stage */}
        <Stage environment="city" intensity={0.6}>
          <Suspense fallback={<Loader />}>
            <DynamicModel modelUrl={modelUrl} />
          </Suspense>
        </Stage>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}