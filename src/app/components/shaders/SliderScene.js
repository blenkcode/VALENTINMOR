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
  const meshRefs = useRef(
    Array(textures.length)
      .fill()
      .map(() => React.createRef())
  );

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
      // Obtenir les dimensions originales de l'image
      const width = texture.image.width;
      const height = texture.image.height;
      // Calculer le ratio pour maintenir les proportions
      return useAspect(width, height); // Augmenté la valeur de base pour agrandir proportionnellement
    }
    return [0.5, 0.5, 1]; // Valeur par défaut plus grande
  });

  // Configuration cohérente de l'espacement vertical
  const verticalSpacing = 2.5; // Utiliser la même valeur qu'initialement

  // Hauteur totale du "canvas virtuel" cohérente avec l'espacement
  const viewportHeight = textures.length * verticalSpacing;

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
      if (meshRef.current && meshRef.current.material) {
        meshRef.current.material.uniforms.uProgress.value = scrollY;
        // Mettre à jour viewportHeight en cas de changement
        meshRef.current.material.uniforms.uViewportHeight.value =
          viewportHeight;
      }
    });
  });

  const calculatePosition = (index, total) => {
    // Utiliser le même espacement vertical partout
    const startY = 0;
    return [0, startY - index * verticalSpacing, 0];
  };

  useEffect(() => {
    if (!container || !container.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: container.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const newY = -0.8 + self.progress * 4;
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
          <planeGeometry args={[0.5, 0.5, 20, 20]} />{" "}
          {/* Taille plus normale */}
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
