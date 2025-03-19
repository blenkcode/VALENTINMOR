import React, { useRef, useState, useEffect, useMemo } from "react";
import { fragment, vertex } from "./ShaderSphere";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture, useAspect } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useControls } from "leva";
// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const CircularCarouselScene = () => {
  // Référence pour le temps d'animation (ajout de la référence manquante)
  const timeRef = useRef(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);
  const prevScrollRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const textures = useTexture([
    "/mockup1.webp",
    "/mockup2.webp",
    "/mockup3.webp",
    "/mockup4.webp",
    "/mockup5.webp",
  ]);

  const controls = useRef({
    amplitude: { value: 0.45, min: -3.5, max: 3.5, step: 0.05 },
    waveLength: { value: 1, min: 0, max: 20, step: 1 },
  });

  useEffect(() => {
    // Vérifier que toutes les textures sont chargées correctement
    textures.forEach((texture, index) => {
      if (!texture.image) {
        console.warn(`La texture ${index} n'a pas d'image`);
      }
    });
  }, [textures]);

  // Convertir chaque texture en tableau pour éviter les problèmes de référence
  const textureArray = Array.isArray(textures) ? textures : [textures];

  // Références pour l'animation
  const groupRef = useRef();
  const meshRefs = useRef(
    Array(textureArray.length)
      .fill()
      .map(() => React.createRef())
  );

  // Paramètres de l'éventail
  const radius = 1.7; // Distance du centre
  const totalAngle = Math.PI * 1.6; // Angle total de l'éventail (environ 108 degrés)
  const startAngle = -totalAngle / 2; // Angle de départ

  // Calculer les positions et rotations des planes
  const planePositions = useMemo(() => {
    return textureArray.map((_, index) => {
      const count = textureArray.length;
      // Répartir les angles uniformément dans l'éventail
      const angle = startAngle + (totalAngle / (count - 1)) * index;

      // Calculer la position sur le cercle
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      // Rotation pour que le côté droit pointe vers le centre
      const rotation = angle + Math.PI / 2;

      return { position: [x, 0, z], rotation: [0, rotation, 0] };
    });
  }, [textureArray.length]);

  // Créer un tableau d'objets uniforms (un pour chaque mesh)
  const uniformsArrayRef = useRef(
    textureArray.map((texture) => ({
      uTexture: { value: texture },
      uAmplitude: { value: controls.current.amplitude },
      uWaveLength: { value: controls.current.waveLength },
      uTime: { value: 0 },
    }))
  );

  useEffect(() => {
    if (groupRef.current) {
      // Définir la rotation initiale (en radians)
      groupRef.current.rotation.x = 0.4;
      groupRef.current.rotation.y = 0.9; // 18 degrés sur l'axe X
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDelta = Math.abs(currentScroll - prevScrollRef.current);
      const direction = currentScroll > prevScrollRef.current ? 1 : -1;

      // Calculer la vélocité en fonction du delta et normaliser
      const normalizedVelocity = Math.min(scrollDelta / 30, 1);

      // Mettre à jour le temps du dernier scroll
      lastScrollTimeRef.current = Date.now();

      if (scrollDelta > 0.1) {
        setScrollDirection(direction);
        setScrollVelocity(normalizedVelocity);

        // Valeur de base de l'amplitude: 0.45
        // Valeur max: 2.5 (positif) ou -2.5 (négatif)
        const baseAmplitude = 0.25;
        const maxAmplitude = 5.0;

        // Calculer la valeur d'amplitude en fonction de la direction et de la vélocité
        const amplitudeValue =
          direction > 0
            ? baseAmplitude +
              (maxAmplitude - baseAmplitude) * normalizedVelocity
            : -baseAmplitude -
              (maxAmplitude - baseAmplitude) * normalizedVelocity;

        // Appliquer la nouvelle valeur avec GSAP
        gsap.to(
          uniformsArrayRef.current.map((u) => u.uAmplitude),
          {
            value: amplitudeValue,
            duration: 0.9,
            ease: "power1.out",
          }
        );
      }

      prevScrollRef.current = currentScroll;
    };

    // Utiliser un throttle pour ne pas surcharger avec trop d'événements
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  // Animation de rotation
  useFrame((state, delta) => {
    // Rotation du groupe
    if (groupRef.current) {
      groupRef.current.rotation.y +=
        delta * scrollDirection > 0
          ? 0.05 * scrollVelocity * 1.7
          : -0.05 * scrollVelocity * 1.7;
    }

    // Mettre à jour les uniformes et ajuster la rotation de chaque mesh
    meshRefs.current.forEach((meshRef, index) => {
      // Obtenir la valeur d'amplitude actuelle depuis les uniformes
      const currentAmplitude = uniformsArrayRef.current[index].uAmplitude.value;

      // Mettre à jour les uniformes
      uniformsArrayRef.current[index].uWaveLength.value =
        controls.current.waveLength.value;

      if (meshRef.current) {
        // Récupérer la rotation de base du mesh depuis planePositions
        const baseRotation = planePositions[index].rotation[1];

        const RotateDelta = -0.2;
        meshRef.current.rotation.y =
          baseRotation + currentAmplitude * RotateDelta;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {textureArray.map((texture, index) => {
        const { position, rotation } = planePositions[index];

        // Calculer l'aspect ratio basé sur l'image de texture
        let aspectRatio = 1;
        if (texture.image) {
          aspectRatio = texture.image.width / texture.image.height;
        }

        // Taille de base du plane
        const width = 2.5;
        const height = width / aspectRatio;

        return (
          <mesh
            key={index}
            ref={meshRefs.current[index]}
            position={new THREE.Vector3(...position)}
            rotation={new THREE.Euler(...rotation)}
          >
            <icosahedronGeometry args={[0.1, 70]} />
            <shaderMaterial
              vertexShader={vertex}
              fragmentShader={fragment}
              uniforms={uniformsArrayRef.current[index]}
              transparent={true}
              // wireframe={true}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default CircularCarouselScene;
