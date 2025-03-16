import React, { useRef, useState, useEffect } from "react";
import { fragment as fragment1, vertex as vertex1 } from "./ShaderCard";

import { useFrame } from "@react-three/fiber";
import { useTexture, useAspect } from "@react-three/drei";
import gsap from "gsap";
const CombinedScene = ({ src, isHovering, onTextureLoaded }) => {
  const texture = useTexture("/valp.webp");
  const meshRef = useRef();

  const controls = useRef({
    distortion: 0.0, // Contrôle uniquement la distortion du fragment
  });
  const scale1 = useAspect(texture.image.width, texture.image.height, 1);
  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uDistortion: { value: 2.2 },
  });

  useEffect(() => {
    if (meshRef.current && texture) {
      meshRef.current.material.uniforms.uTexture.value = texture;
    }
  }, [src, texture]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value += 0.004;
      meshRef.current.material.uniforms.uDistortion.value =
        controls.current.distortion;
    }
  });

  useEffect(() => {
    // Reculer le mesh sur l'axe Z quand aucun artiste n'est sélectionné
    gsap.to(controls.current, {
      distortion: 5.2,
      duration: 0.5,
      ease: "cubic-bezier(0.27, 0.24, 0.62, 0.99)",
    });
  }, []);

  return (
    <mesh ref={meshRef} scale={scale1}>
      <planeGeometry args={[1, 1, 1, 1]} />{" "}
      {/* Géométrie simplifiée car pas de déformation */}
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
