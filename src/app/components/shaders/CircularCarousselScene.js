import React, { useRef, useEffect, useMemo } from "react";
import { fragment, vertex } from "./ShaderCircularCaroussel2";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import { useProject } from "@/app/Context/ProjectContext";
import { useTransition } from "@/app/Context/TransitionContext";
import { useMobile } from "@/app/Context/isMobileContext";

const CircularCarouselScene = ({}) => {
  const { project, setProject } = useProject();
  const { isMobile } = useMobile();
  const { setTransition, transition } = useTransition();
  const textures = useTexture([
    "/reel4.png",
    "/reel3.png",
    "/reel2.png",
    "/reel1.png",
    "/reel5.png",
  ]);

  useEffect(() => {
    textures.forEach((texture, index) => {
      if (!texture.image) {
        console.warn(`La texture ${index} n'a pas d'image`);
      }
    });
  }, [textures]);

  const textureArray = Array.isArray(textures) ? textures : [textures];

  const controls = useRef(
    textureArray.map((_, index) => ({
      amplitude: { value: 1.3, min: -3.5, max: 3.5, step: 0.05 },
      waveLength: { value: 1, min: 0, max: 20, step: 1 },
      distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
      textureIndex: index,
    }))
  );
  const projectYValues = {
    1: -2.51,
    2: -1.254,
    3: 0.002,
    4: 1.258,
    5: 2.514,
    6: 2.514,
  };

  const globalControls = useRef({
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    amplitude: { value: 1.3, min: -3.5, max: 3.5, step: 0.05 },
  });

  const groupRef = useRef();
  const meshRefs = useRef(
    Array(textureArray.length)
      .fill()
      .map(() => React.createRef())
  );

  const radius = 2.7;
  const totalAngle = Math.PI * 1.6;
  const startAngle = -totalAngle / 2;

  const planePositions = useMemo(() => {
    return textureArray.map((_, index) => {
      const count = textureArray.length;

      const angle = startAngle + (totalAngle / (count - 1)) * index;

      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const rotation = angle + Math.PI / 2;

      return { position: [x, 0, z], rotation: [0, rotation, 0] };
    });
  }, [textureArray.length]);

  const uniformsArrayRef = useRef(
    textureArray.map((texture, index) => ({
      uTexture: { value: texture },
      uAmplitude: { value: globalControls.current.amplitude.value },
      uWaveLength: { value: controls.current[index].waveLength.value },
      uTime: { value: 0 },
      uDistortion: { value: controls.current[index].distortion.value },
    }))
  );

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = -1.5;
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.z = 1.57;
    }
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      if (isMobile) {
        gsap.to(globalControls.current.amplitude, {
          value: 0,
          duration: 0.3,
          ease: "power3.out",
        });
      } else {
        gsap.to(globalControls.current.amplitude, {
          value: 1.3,
          duration: 0.3,
          ease: "power3.out",
        });
      }
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

      gsap.to(groupRef.current.rotation, {
        x: targetY,
        duration: 1.3,
        ease: "power3.out",
      });
    }
  }, [project, isMobile]);

  useEffect(() => {
    if (transition) {
      const tl = gsap.timeline();

      tl.to(globalControls.current.distortion, {
        value: 0.005,
        duration: 1.2,
        ease: "power3.inOut",
        onUpdate: () => {
          controls.current.forEach((control, idx) => {
            control.distortion.value = globalControls.current.distortion.value;
          });
        },
      }).to(
        groupRef.current.position,
        {
          z: -0.8,
          duration: 1,
          ease: "power3.inOut",
        },
        "<"
      );
    } else {
      const tl = gsap.timeline();

      tl.to(globalControls.current.distortion, {
        value: 0.0,
        duration: 1.2,
        ease: "power3.out",
        onUpdate: () => {
          controls.current.forEach((control, idx) => {
            control.distortion.value = globalControls.current.distortion.value;
          });
        },
      }).to(
        groupRef.current.position,
        {
          z: 0,
          duration: 1.45,
          ease: "power2.inOut",
        },
        "<"
      );
    }
  }, [transition]);

  useFrame((state, delta) => {
    meshRefs.current.forEach((meshRef, index) => {
      if (meshRef.current) {
        const baseRotation = planePositions[index].rotation[1];
        uniformsArrayRef.current[index].uTime.value += 0.004;

        uniformsArrayRef.current[index].uDistortion.value =
          controls.current[index].distortion.value;
        uniformsArrayRef.current[index].uAmplitude.value =
          globalControls.current.amplitude.value;
        const RotateDelta = -1.58;
        meshRef.current.rotation.y = baseRotation + RotateDelta;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {textureArray.map((texture, index) => {
        const { position, rotation } = planePositions[index];

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
