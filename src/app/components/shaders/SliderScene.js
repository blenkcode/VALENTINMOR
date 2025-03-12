import React, { useRef, useState, useEffect } from "react";
import { fragment, vertex } from "./SliderShader";

import { useFrame } from "@react-three/fiber";
import { useTexture, useAspect } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const CombinedScene = ({ container }) => {
  const [scrollY, setScrollY] = useState(200);
  const groupRef = useRef();
  const textures = useTexture([
    "/mockup1.webp",
    "/mockup2.webp",
    "/mockup3.webp",
    "/mockup4.webp",
    "/mockup5.webp",
  ]);

  // Référence pour chaque mesh
  const meshRefs = useRef(textures.map(() => React.createRef()));
  useEffect(() => {
    // Vérifier que toutes les textures sont chargées correctement
    textures.forEach((texture, index) => {
      if (!texture.image) {
        console.warn(`La texture ${index} n'a pas d'image`);
      }
    });
  }, [textures]);
  // Calculer l'échelle pour chaque texture
  const scales = textures.map((texture) => {
    if (texture.image) {
      return useAspect(texture.image.width, texture.image.height, 1);
    }
    return [0.5, 0.5, 1];
  });

  // Hauteur totale du "canvas virtuel" (pour normaliser les positions)
  const viewportHeight = textures.length * 4.5;

  // Créer des uniforms pour chaque shader
  const uniformsArray = useRef(
    textures.map((texture, index) => ({
      uTexture: { value: texture },
      uProgress: { value: scrollY },
      uIndex: { value: index },
      uTotalItems: { value: textures.length },
      uViewportHeight: { value: viewportHeight },
    }))
  );

  useFrame(() => {
    // Mettre à jour la valeur de uProgress pour tous les meshes
    meshRefs.current.forEach((meshRef, index) => {
      if (meshRef.current) {
        meshRef.current.material.uniforms.uProgress.value = scrollY;
      }
    });
  });

  const calculatePosition = (index, total) => {
    const verticalSpacing = 4.5;
    const startY = 0;
    return [0, startY - index * verticalSpacing, 0];
  };

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: container.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const newY = -1.1 + self.progress * 5;
        setScrollY(newY);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [container]);

  return (
    <group ref={groupRef}>
      {textures.map((texture, index) => (
        <mesh
          key={index}
          ref={meshRefs.current[index]}
          scale={scales[index]}
          position={calculatePosition(index, textures.length)}
        >
          <planeGeometry args={[0.5, 0.5, 50, 50]} />{" "}
          {/* Plus de subdivisions pour une meilleure déformation */}
          <shaderMaterial
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={uniformsArray.current[index]}
            transparent={true}
          />
        </mesh>
      ))}
    </group>
  );
};

export default CombinedScene;
