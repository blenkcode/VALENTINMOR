import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { fragment, vertex } from "./ShaderCircularCaroussel2";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProject } from "@/app/Context/ProjectContext";
import { useTransition } from "@/app/Context/TransitionContext";
gsap.registerPlugin(ScrollTrigger);

const CircularCarouselScene = () => {
  const { project } = useProject();
  const { setTransition, transition } = useTransition();
  const textures = useTexture([
    "/reel4.png",
    "/reel3.png",
    "/reel2.png",
    "/reel1.png",

    "/reel5.png",
  ]);

  const controls = useRef({
    amplitude: { value: 1.3, min: -3.5, max: 3.5, step: 0.05 },
    waveLength: { value: 1, min: 0, max: 20, step: 1 },
    distortion: { value: 0.0 },
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
  const radius = 2.7; // Distance du centre
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
      uAmplitude: { value: controls.current.amplitude.value },
      uWaveLength: { value: controls.current.waveLength.value },
      uTime: { value: 0 },
      uDistortion: { value: controls.current.distortion },
    }))
  );

  useEffect(() => {
    if (groupRef.current) {
      // Définir la rotation initiale (en radians)
      groupRef.current.rotation.x = -1.5;
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.z = 1.57;
    }
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      // Si project est 1, on translate vers le haut de la taille d'un mesh (8 unités)
      const targetY =
        project === "1"
          ? -2.51
          : project === "2"
          ? -1.254
          : project === "3"
          ? 0.002
          : project === "4"
          ? 1.258
          : project === "5"
          ? 2.514
          : project === "6"
          ? 2.514
          : -2.51;

      // Animation avec GSAP pour une transition fluide
      gsap.to(groupRef.current.rotation, {
        x: targetY,
        duration: 1.3,
        ease: "power3.out",
      });
    }
  }, [project]);

  useEffect(() => {
    if (transition) {
      const tl = gsap.timeline();
      // Animation avec GSAP pour une transition fluide
      tl.to(controls.current.distortion, {
        value: 0.005,
        duration: 1.2,
        ease: "power3.inOut",
      });
    } else {
      const tl = gsap.timeline();
      // Animation avec GSAP pour une transition fluide

      tl.to(controls.current.distortion, {
        value: 0.0,
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, [transition]);

  // Animation de rotation
  useFrame((state, delta) => {
    // Rotation du groupe
    // if (groupRef.current) {
    //   groupRef.current.rotation.y +=
    //     delta * scrollDirection > 0
    //       ? 0.05 * scrollVelocity
    //       : -0.05 * scrollVelocity;
    // }

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
        uniformsArrayRef.current[index].uTime.value += 0.004;
        uniformsArrayRef.current[index].uDistortion.value =
          controls.current.distortion.value;
        const RotateDelta = -1.58;
        meshRef.current.rotation.y = baseRotation + RotateDelta;
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
        const width = 2.3;
        const height = width / aspectRatio;

        return (
          <mesh
            key={index}
            ref={meshRefs.current[index]}
            position={new THREE.Vector3(...position)}
            rotation={new THREE.Euler(...rotation)}
          >
            <planeGeometry args={[width, height, 25, 25]} />
            <shaderMaterial
              vertexShader={vertex}
              fragmentShader={fragment}
              uniforms={uniformsArrayRef.current[index]}
              transparent={true}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default CircularCarouselScene;
