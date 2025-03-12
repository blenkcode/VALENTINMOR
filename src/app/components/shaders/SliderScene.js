import React, { useRef, useState, useEffect } from "react";
import { fragment as fragment1, vertex as vertex1 } from "./SliderShader";

import { useFrame } from "@react-three/fiber";
import { useTexture, useAspect } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const CombinedScene = ({ container, src, scrollY }) => {
  const meshRef = useRef();
  const texture = useTexture(src); // Utiliser une seule texture

  // Calculer l'échelle pour la texture
  const scale = texture.image
    ? useAspect(texture.image.width, texture.image.height, 0.5)
    : [0.5, 0.5, 0.5];

  // Créer des uniforms pour le shader
  const uniforms = useRef({
    uTexture: { value: texture },
    uScrollY: { value: 5 },
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uScrollY.value = scrollY;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      {/* Utiliser une géométrie plus grande et subdivisée pour mieux voir l'effet */}
      <planeGeometry args={[1, 1, 30, 30]} />
      <shaderMaterial
        vertexShader={vertex1}
        fragmentShader={fragment1}
        uniforms={uniforms.current}
        transparent={true}
      />
    </mesh>
  );
};

export default CombinedScene;
