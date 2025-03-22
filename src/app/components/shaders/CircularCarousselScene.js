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
import { useMobile } from "@/app/Context/isMobileContext";
gsap.registerPlugin(ScrollTrigger);

// Hook personnalisé pour le défilement virtuel
const useVirtualScroll = (onScroll, options = {}) => {
  const { sensitivity = 30, damping = 0.9 } = options;

  // Références pour le virtual scroll - correctement à l'intérieur du hook
  const virtualScrollY = React.useRef(0);
  const prevVirtualScrollY = React.useRef(0);
  const scrollVelocityRef = React.useRef(0);
  const scrollDirectionRef = React.useRef(0);
  const lastScrollTimeRef = React.useRef(Date.now());
  const isScrollingRef = React.useRef(false);
  const rafIdRef = React.useRef(null);

  // Setup event handlers
  useEffect(() => {
    // Fonction pour gérer l'événement de wheel
    const handleWheel = (e) => {
      e.preventDefault();

      // Mettre à jour la position du virtual scroll
      virtualScrollY.current += e.deltaY;

      // Calculer la vélocité et la direction
      const scrollDelta = Math.abs(
        virtualScrollY.current - prevVirtualScrollY.current
      );
      const direction =
        virtualScrollY.current > prevVirtualScrollY.current ? 1 : -1;

      // Normaliser la vélocité
      const normalizedVelocity = Math.min(scrollDelta / sensitivity, 1);

      // Mettre à jour les références
      scrollVelocityRef.current = normalizedVelocity;
      scrollDirectionRef.current = direction;
      lastScrollTimeRef.current = Date.now();
      isScrollingRef.current = true;

      // Appeler le callback
      if (onScroll && scrollDelta > 0.1) {
        onScroll({
          virtualScrollY: virtualScrollY.current,
          scrollDelta,
          direction,
          normalizedVelocity,
        });
      }

      prevVirtualScrollY.current = virtualScrollY.current;
    };

    // Fonction pour gérer les événements tactiles
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchY) * 2; // Multiplicateur pour rendre le touch plus sensible
      touchStartY = touchY;

      // Simuler un événement wheel
      handleWheel({ preventDefault: () => {}, deltaY });
    };

    // Ajouter les écouteurs d'événements
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Animation loop pour le damping
    const animateScroll = () => {
      if (isScrollingRef.current) {
        // Appliquer le damping à la vélocité
        scrollVelocityRef.current *= damping;

        // Si la vélocité est très faible, arrêter l'animation
        if (scrollVelocityRef.current < 0.01) {
          isScrollingRef.current = false;
          scrollVelocityRef.current = 0;
        }

        // Appeler le callback avec les valeurs actuelles
        if (onScroll) {
          onScroll({
            virtualScrollY: virtualScrollY.current,
            scrollDelta: 0,
            direction: scrollDirectionRef.current,
            normalizedVelocity: scrollVelocityRef.current,
          });
        }
      }

      rafIdRef.current = requestAnimationFrame(animateScroll);
    };

    // Démarrer l'animation loop
    rafIdRef.current = requestAnimationFrame(animateScroll);

    return () => {
      // Nettoyer les écouteurs d'événements
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);

      // Arrêter l'animation loop
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [onScroll, sensitivity, damping]);

  return {
    scrollVelocity: scrollVelocityRef.current,
    scrollDirection: scrollDirectionRef.current,
    virtualScrollY: virtualScrollY.current,
  };
};

const CircularCarouselScene = () => {
  const { isMobile } = useMobile();
  const { project, setProject } = useProject();
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(
    parseInt(project) || 1
  );
  const { setTransition, transition } = useTransition();

  const textures = useTexture([
    "/reel4.png",
    "/reel3.png",
    "/reel2.png",
    "/reel1.png",
    "/reel5.png",
  ]);

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

  // Créer les contrôles pour chaque texture
  const controls = useRef(
    textureArray.map((_, index) => ({
      amplitude: { value: 1.3, min: -3.5, max: 3.5, step: 0.05 },
      waveLength: { value: 1, min: 0, max: 20, step: 1 },
      distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
      textureIndex: index,
    }))
  );

  // Référence pour un contrôle global qui affecte toutes les textures
  const globalControls = useRef({
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    amplitude: { value: 1.3, min: -3.5, max: 3.5, step: 0.05 },
  });

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
    textureArray.map((texture, index) => ({
      uTexture: { value: texture },
      uAmplitude: { value: controls.current[index].amplitude.value },
      uWaveLength: { value: controls.current[index].waveLength.value },
      uTime: { value: 0 },
      uDistortion: { value: controls.current[index].distortion.value },
    }))
  );

  // Projet Y values pour animations
  const projectYValues = {
    1: -2.51,
    2: -1.254,
    3: 0.002,
    4: 1.258,
    5: 2.514,
    6: 2.514,
  };

  // Mettre à jour l'index du projet quand le projet change
  useEffect(() => {
    if (project) {
      setCurrentProjectIndex(parseInt(project) || 1);
    }
  }, [project]);

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
      // Obtenir la valeur Y cible pour la rotation
      const targetY = projectYValues[project] || -2.51;

      // Animation avec GSAP pour une transition fluide
      gsap.to(groupRef.current.rotation, {
        x: targetY,
        duration: 1.3,
        ease: "power3.out",
      });

      // Réinitialiser toutes les amplitudes à la valeur par défaut
      controls.current.forEach((control, index) => {
        gsap.to(control.amplitude, {
          value: 1.3,
          duration: 1.3,
          ease: "power3.out",
        });
      });

      // Animation des amplitudes spécifiques selon le projet
    }
  }, [project]);

  useEffect(() => {
    if (transition) {
      const tl = gsap.timeline();
      // Animation avec GSAP pour une transition fluide - affecte tous les meshes
      tl.to(globalControls.current.distortion, {
        value: 0.005,
        duration: 1.2,
        ease: "power3.inOut",
        onUpdate: () => {
          // Mettre à jour tous les contrôles de distortion individuels
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
      // Animation avec GSAP pour une transition fluide
      tl.to(globalControls.current.distortion, {
        value: 0.0,
        duration: 1.2,
        ease: "power3.out",
        onUpdate: () => {
          // Mettre à jour tous les contrôles de distortion individuels
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

  const handleVirtualScroll = useCallback(
    ({ direction, normalizedVelocity }) => {
      if (normalizedVelocity > 0.01) {
        setScrollDirection(direction);
        setScrollVelocity(normalizedVelocity);

        // Calculer le nouvel index de projet
        let newIndex = currentProjectIndex + direction;

        newIndex = Math.max(1, Math.min(5, newIndex));

        if (newIndex === currentProjectIndex) return;

        // Mettre à jour le projet actuel
        setCurrentProjectIndex(newIndex);
        setProject(newIndex.toString());
      }
    },
    [currentProjectIndex, setProject]
  );

  useEffect(() => {
    if (isMobile) {
      let cleanup = () => {};

      const virtualScrollY = { current: 0 };
      const prevVirtualScrollY = { current: 0 };
      const scrollVelocityRef = { current: 0 };
      const scrollDirectionRef = { current: 0 };
      const isScrollingRef = { current: false };
      let rafId = null;

      const handleWheel = (e) => {
        e.preventDefault();

        virtualScrollY.current += e.deltaY;

        const scrollDelta = Math.abs(
          virtualScrollY.current - prevVirtualScrollY.current
        );
        const direction =
          virtualScrollY.current > prevVirtualScrollY.current ? 1 : -1;

        const normalizedVelocity = Math.min(scrollDelta / 30, 1);

        scrollVelocityRef.current = normalizedVelocity;
        scrollDirectionRef.current = direction;
        isScrollingRef.current = true;

        if (scrollDelta > 0.1) {
          handleVirtualScroll({
            direction,
            normalizedVelocity,
          });
        }

        prevVirtualScrollY.current = virtualScrollY.current;
      };

      let touchStartY = 0;

      const handleTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
      };

      const handleTouchMove = (e) => {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        touchStartY = touchY;

        handleWheel({ preventDefault: () => {}, deltaY });
      };

      // Ajouter les écouteurs d'événements
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });

      // Animation loop pour le damping
      const animateScroll = () => {
        if (isScrollingRef.current) {
          // Appliquer le damping à la vélocité
          scrollVelocityRef.current *= 0.95;

          // Si la vélocité est très faible, arrêter l'animation
          if (scrollVelocityRef.current < 0.01) {
            isScrollingRef.current = false;
            scrollVelocityRef.current = 0;
          }

          // Appeler le callback avec les valeurs actuelles
          handleVirtualScroll({
            direction: scrollDirectionRef.current,
            normalizedVelocity: scrollVelocityRef.current,
          });
        }

        rafId = requestAnimationFrame(animateScroll);
      };

      // Démarrer l'animation loop
      rafId = requestAnimationFrame(animateScroll);

      // Retourner la fonction de nettoyage
      cleanup = () => {
        // Nettoyer les écouteurs d'événements
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);

        // Arrêter l'animation loop
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };

      return cleanup;
    }
  }, [isMobile, handleVirtualScroll]);

  // Animation de rotation
  useFrame((state, delta) => {
    // Mettre à jour les uniformes et ajuster la rotation de chaque mesh
    meshRefs.current.forEach((meshRef, index) => {
      if (meshRef.current) {
        const baseRotation = planePositions[index].rotation[1];
        uniformsArrayRef.current[index].uTime.value += 0.004;

        // Mettre à jour la distortion depuis le contrôle individuel
        uniformsArrayRef.current[index].uDistortion.value =
          controls.current[index].distortion.value;
        uniformsArrayRef.current[index].uAmplitude.value =
          controls.current[index].amplitude.value;

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
