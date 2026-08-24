'use client';

import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { Center } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

interface DynamicModelProps {
  modelUrl: string;
}

export function DynamicModel({ modelUrl }: DynamicModelProps) {
  const gltf = useLoader(GLTFLoader, modelUrl);
  const { gl } = useThree();

  useEffect(() => {
    const disposeMaterial = (material: THREE.Material) => {
      material.dispose();

      Object.keys(material).forEach((key) => {
        const value = (material as unknown as Record<string, unknown>)[key];
        if (value && typeof value === 'object' && 'isTexture' in value) {
          (value as THREE.Texture).dispose();
        }
      });
    };

    return () => {
      console.log('🔴 GPU قبل از پاک‌سازی:', {
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
      });

      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          mesh.geometry.dispose();

          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat: THREE.Material) => disposeMaterial(mat));
          } else if (mesh.material) {
            disposeMaterial(mesh.material);
          }
        }
      });

      console.log('🟢 GPU بعد از پاک‌سازی عمیق:', {
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
      });
    };
  }, [gltf, gl]);

  return (
    <Center top>
      <primitive object={gltf.scene} />
    </Center>
  );
}