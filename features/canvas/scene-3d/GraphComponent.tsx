"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useMemo } from "react";
import ThreeForceGraph from "three-forcegraph";
import SpriteText from "three-spritetext";
import getFileIconDetails from "@/features/parsers/getFileIconDetails";
import { CameraControls } from "@react-three/drei";

// 👈 ۱. گسترش تایپ THREE.Group برای تعریف __data
interface CustomGroup extends THREE.Group {
  __data?: any;
}

interface GraphComponentProps {
  data: any;
  cameraControlsRef: RefObject<CameraControls | null>;
}

export default function GraphComponent({
  data,
  cameraControlsRef,
}: GraphComponentProps) {
  const graphInstance = useMemo(() => {
    return new ThreeForceGraph();
  }, []);

  useFrame(() => {
    if (graphInstance) {
      graphInstance.tickFrame();
    }
  });

  useEffect(() => {
    if (!data || !data.nodes) return;

    const formattedData = {
      nodes: data.nodes.map((node: any) => ({ ...node })),
      links: data.links.map((link: any) => ({ ...link })),
    };

    graphInstance
      .graphData(formattedData)
      .dagMode("td")
      .dagLevelDistance(50)
      .nodeAutoColorBy("extension")
      .nodeRelSize(2)
      .linkWidth(1)
      .nodeThreeObject((node: any) => {
        // استفاده از CustomGroup به جای THREE.Group ساده
        const group: CustomGroup = new THREE.Group();

        const isFolder = node.extension === "folder";
        const iconInfo = getFileIconDetails(node.extension, isFolder);
        const labelText = `${iconInfo.symbol} ${node.name}`;
        const sprite = new SpriteText(labelText);
        sprite.color = isFolder ? "#fde047" : "#ffffff";
        sprite.textHeight = isFolder ? 4 : 3;
        sprite.padding = 1;
        sprite.backgroundColor = "rgba(15, 23, 42, 0.75)";
        sprite.borderRadius = 2;

        group.add(sprite);

        // 👈 ۲. حالا بدون ارور تایپ‌اسکریپت ذخیره می‌شود
        group.__data = node;

        return group;
      });
  }, [data, graphInstance]);

  const handleNodeClick = (event: any) => {
    event.stopPropagation();

    let currentObject: CustomGroup | null = event.object;
    let nodeData = currentObject?.__data;

    // پیمایش به سمت بالای درخت Three.js برای یافتن __data
    while (currentObject && !nodeData) {
      currentObject = currentObject.parent as CustomGroup | null;
      if (currentObject) {
        nodeData = currentObject.__data;
      }
    }

    if (nodeData && cameraControlsRef.current) {
      const x = nodeData.x || 0;
      const y = nodeData.y || 0;
      const z = nodeData.z || 0;
      const distance = 100;

      cameraControlsRef.current.setLookAt(
        x,
        y,
        z + distance,
        x,
        y,
        z,
        true
      );
    }
  };

  if (!data) return null;

  return (
    <primitive object={graphInstance} onClick={handleNodeClick} />
  );
}