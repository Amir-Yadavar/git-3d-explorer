"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useMemo, useState } from "react";
import ThreeForceGraph from "three-forcegraph";
import SpriteText from "three-spritetext";
import getFileIconDetails from "@/features/parsers/getFileIconDetails";
import { CameraControls } from "@react-three/drei";

interface CustomGroup extends THREE.Group {
  __data?: any;
}

interface GraphComponentProps {
  data: any;
  cameraControlsRef: RefObject<CameraControls | null>;
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
}

export default function GraphComponent({
  data,
  cameraControlsRef,
  selectedNodeId,
  onSelectNode,
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
        const isSelected = selectedNodeId === node.id;
        const isNothingSelected = selectedNodeId === null;

        group.add(sprite);

        group.__data = node;

        return group;
      });
  }, [data, graphInstance]);

  useEffect(() => {
    if (!graphInstance) return;

    // تمام اشیاء داخل صحنه گراف رو پیمایش می‌کنیم
    graphInstance.children.forEach((child: any) => {
      // اطلاعات نود که قبلاً روی object ست کرده بودیم (__data)
      const nodeData = child.__data;
      if (!nodeData) return;

      const isSelected = selectedNodeId === nodeData.id;
      const isNothingSelected = selectedNodeId === null;

      // پیدا کردن SpriteText داخل Group
      const sprite = child.children?.[0];
      if (sprite && sprite.material) {
        // تغییر مستقیم شفافیت بدون Re-mount
        sprite.material.opacity = isNothingSelected || isSelected ? 1 : 0.15;
      }
    });
  }, [selectedNodeId, graphInstance]);

  const handleNodeClick = (event: any) => {
    event.stopPropagation();

    let currentObject: CustomGroup | null = event.object;
    let nodeData = currentObject?.__data;

    while (currentObject && !nodeData) {
      currentObject = currentObject.parent as CustomGroup | null;
      if (currentObject) {
        nodeData = currentObject.__data;
      }
    }

    //  if click on line graph not anything---
    if (!nodeData || !nodeData.id || nodeData.source) {
      return;
    }
    //  if click on line graph not anything---

    if (nodeData && cameraControlsRef.current) {
      onSelectNode(nodeData.id);
      const x = nodeData.x || 0;
      const y = nodeData.y || 0;
      const z = nodeData.z || 0;
      const distance = 100;

      cameraControlsRef.current.setLookAt(
        x,
        y + 50,
        z + distance,
        x,
        y,
        z,
        true,
      );
    }
  };

  if (!data) return null;

  return <primitive object={graphInstance} onClick={handleNodeClick} />;
}
