import React, { useRef, useState, useEffect, useMemo } from "react";
import { fragment, vertex } from "./ShaderCircularCaroussel";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const VerticalCarouselScene = ({ project, lastpProject }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const texture = useTexture("/VAL.png");
  const textures = useTexture([
    "/VAL.png",
    "/FERTILE.png",
    "/JUTEL.png",
    "/MBM.png",
    "/AMOURATROI.png",
    "/LCDO.png",
  ]);

  useEffect(() => {
    // Vérifier que toutes les textures sont chargées correctement
    textures.forEach((texture, index) => {
      if (!texture.image) {
        console.warn(`La texture ${index} n'a pas d'image`);
      }
    });
  }, [textures]);
  const textureArray = Array.isArray(textures) ? textures : [textures];
  const groupRef = useRef();
  const meshRefs = useRef(
    Array(textureArray.length)
      .fill()
      .map(() => React.createRef())
  );

  const meshRef = useRef();

  const controls = useRef({
    amplitude: { value: 0.0 },
    distortion: { value: 0.0 },
    rotation: { value: 0.0 },
  });

  const uniformsArrayRef = useRef(
    textureArray.map((texture) => ({
      uTexture: { value: texture },
      uAmplitude: { value: controls.current.amplitude },
      uDistortion: { value: controls.current.distortion },
      uTime: { value: 0 },
      uRotation: { value: controls.current.rotation },
    }))
  );

  useEffect(() => {
    if (meshRef.current && texture) {
      meshRef.current.material.uniforms.uTexture.value = texture;
    }
  }, [texture]);

  useFrame(() => {
    meshRefs.current.forEach((meshRef, index) => {
      // Obtenir la valeur d'amplitude actuelle depuis les uniformes
      const currentAmplitude = uniformsArrayRef.current[index].uAmplitude.value;

      uniformsArrayRef.current[index].uTime.value += 0.004;
      uniformsArrayRef.current[index].uAmplitude.value =
        controls.current.amplitude.value;
      uniformsArrayRef.current[index].uDistortion.value =
        controls.current.distortion.value;
      uniformsArrayRef.current[index].uRotation.value =
        controls.current.rotation.value;
      // if (meshRef.current) {
      //   // Récupérer la rotation de base du mesh depuis planePositions
      //   const baseRotation = planePositions[index].rotation[1];

      //   const RotateDelta = -0.2;
      //   meshRef.current.rotation.y =
      //     baseRotation + currentAmplitude * RotateDelta;
      // }
    });
  });

  const planePositions = useMemo(() => {
    return textureArray.map((_, index) => {
      // Positionnement vertical avec espacement de 8 unités par mesh
      const y = -4.5 * index - 0.18; // Négatif pour descendre verticalement
      const x = 0;
      const z = 0;
      const rotation = [0, 0, 0];

      return { position: [x, y, z], rotation: rotation };
    });
  }, [textureArray.length]);
  useEffect(() => {
    if (groupRef.current) {
      // Si project est 1, on translate vers le haut de la taille d'un mesh (8 unités)
      const targetY =
        project === "1"
          ? 4.5
          : project === "2"
          ? 9.0
          : project === "3"
          ? 13.5
          : project === "4"
          ? 18
          : project === "5"
          ? 22.5
          : 0;
      setIsAnimating(true);
      // Animation avec GSAP pour une transition fluide
      gsap.to(groupRef.current.position, {
        y: targetY,
        duration: 1.8,
        ease: "expo.out",
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    }
  }, [project]);

  useEffect(() => {
    const tl = gsap.timeline();
    if (project === 0 && lastpProject === 0) return;
    tl.to(
      controls.current.rotation,
      {
        value: 1.0,
        duration: 0.4,
        ease: "expo.out",
      },
      0
    ).to(
      controls.current.rotation,
      {
        value: 0.0,
        duration: 2,
        ease: "power2.inOut",
      },
      "-=0.4"
    );
  }, [project]);

  // useEffect(() => {

  //   if(project===1)
  //   const tl = gsap.timeline();
  //   // Animation avec GSAP pour une transition fluide
  //   tl.to(controls.current.amplitude, {
  //     value: 0.8,
  //     duration: 0.8,
  //     ease: "expo.out",
  //   }).to(controls.current.amplitude, {
  //     value: 0.0,
  //     duration: 0.6,
  //     ease: "power4.inOut",
  //   });
  // }, [project]);
  return (
    <group ref={groupRef}>
      {textureArray.map((texture, index) => {
        const { position, rotation } = planePositions[index];

        return (
          <mesh
            key={index}
            ref={meshRefs.current[index]}
            position={new THREE.Vector3(...position)}
            rotation={new THREE.Euler(...rotation)}
          >
            <planeGeometry args={[7, 7, 70, 70]} />
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
export default VerticalCarouselScene;
