"use client";
import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const GraphComponent = dynamic(() => import("./GraphComponent"), {
  ssr: false,
});

interface ThreeCanvasProps {
  data: {
    nodes: {
      id: string;
      name: string;
      path: string;
      extension: string;
      size: number;
    }[];
    links: {
      source: string;
      target: string;
    }[];
  };
  onSelectNode?: (filePath: string) => void;
}

export default function ThreeCanvas({ data, onSelectNode }: ThreeCanvasProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const cameraControlsRef = useRef<CameraControls>(null);

  const sceneClickHandler = () => {
    cameraControlsRef.current?.setLookAt(0, 0, 500, 0, 0, 0, true);
    setSelectedNodeId(null);
  };

  const handleNodeClick = (node: any) => {
    // اگر کامپوننت GraphComponent شیء کامل node یا id رو برمی‌گردونه
    const nodeId = typeof node === "string" ? node : node?.id || node?.path;

    setSelectedNodeId(nodeId);

    // ارسال مسیر فایل به Git3D جهت شروع تحلیل AI
    if (onSelectNode && nodeId) {
      onSelectNode(nodeId);
    }
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 500], fov: 60 }}
      onPointerMissed={sceneClickHandler}
    >
      <CameraControls ref={cameraControlsRef} makeDefault />
      <ambientLight />

      <GraphComponent
        data={data}
        cameraControlsRef={cameraControlsRef}
        selectedNodeId={selectedNodeId}
        onSelectNode={handleNodeClick}
      />
    </Canvas>
  );
}
