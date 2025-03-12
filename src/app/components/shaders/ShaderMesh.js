import React, { useRef, useMemo } from "react";
import { vertex as vertex1, fragment as fragment1 } from "./SliderShader";
import { useFrame } from "@react-three/fiber";
import { useTexture, useAspect } from "@react-three/drei";

// Composant pour un seul mesh avec shader
const ShaderMesh = ({ texture, scrollY, position }) => {
  const meshRef = useRef();

  // Calculer l'échelle pour garder le ratio d'aspect
  const scale = texture.image
    ? useAspect(texture.image.width, texture.image.height, 0.5)
    : [0.5, 0.5, 0.5];

  // Créer les uniformes pour le shader
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uScrollY: { value: scrollY || 5 },
    }),
    [texture, scrollY]
  );

  // Mettre à jour l'uniform uScrollY à chaque frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uScrollY.value = scrollY;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1, 30, 30]} />
      <shaderMaterial
        vertexShader={vertex1}
        fragmentShader={fragment1}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};
export default ShaderMesh;
