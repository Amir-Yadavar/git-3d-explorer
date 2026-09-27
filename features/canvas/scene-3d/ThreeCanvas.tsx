"use client";
import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

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
}

export default function ThreeCanvas({ data }: ThreeCanvasProps) {
  const cameraControlsRef = useRef<CameraControls>(null);

  // useEffect(()=>{
  //   cameraControlsRef.current?.saveState([0, 0, 500])
  // },[])

  const sceneClickHandler = () => {
    // cameraControlsRef.current?.reset(true);
    cameraControlsRef.current?.setLookAt(0, 0, 500,0,0,0,true)
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 500], fov: 60 }}
      onPointerMissed={sceneClickHandler}
    >
      <CameraControls ref={cameraControlsRef} makeDefault />
      <ambientLight />

      <GraphComponent data={data} cameraControlsRef={cameraControlsRef} />
    </Canvas>
  );
}
