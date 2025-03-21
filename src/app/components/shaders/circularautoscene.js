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
// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Composant de Virtual Scroll
const useVirtualScroll = (onScroll, options = {}) => {
  const { sensitivity = 30, damping = 0.9 } = options;

  // Références pour le virtual scroll
  const virtualScrollY = useRef(0);
  const prevVirtualScrollY = useRef(0);
  const scrollVelocityRef = useRef(0);
  const scrollDirectionRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const isScrollingRef = useRef(false);
  const rafIdRef = useRef(null);

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
  // Référence pour le temps d'animation
  const timeRef = useRef(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);
  const prevScrollRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const textures = useTexture([
    "/FERTILEC.png",
    "/AMOURC.png",
    "/MBMC.png",
    "/JUTELC.png",
    "/LCDOC.png",
  ]);

  const controls = useRef({
    amplitude: { value: 1.3, min: -3.5, max: 3.5, step: 0.05 },
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
  const radius = 2.8; // Distance du centre
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
    }))
  );

  useEffect(() => {
    if (groupRef.current) {
      // Définir la rotation initiale (en radians)
      groupRef.current.rotation.x = 0.2;
      groupRef.current.rotation.y = 0.2;
    }
  }, []);

  // Fonction de callback pour le virtual scroll
  const handleVirtualScroll = useCallback(
    ({ direction, normalizedVelocity }) => {
      if (normalizedVelocity > 0.01) {
        setScrollDirection(direction);
        setScrollVelocity(normalizedVelocity);

        // Valeur de base de l'amplitude: 0.25
        // Valeur max: -1.7
        const baseAmplitude = -1.3;
        const maxAmplitude = -1.3;

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
            value: 1.3,
            duration: 0.9,
            ease: "power1.out",
          }
        );
      }
    },
    []
  );

  // Utiliser le hook de virtual scroll
  useVirtualScroll(handleVirtualScroll, {
    sensitivity: 30,
    damping: 0.95,
  });

  // Animation de rotation
  useFrame((state, delta) => {
    // Rotation du groupe
    if (groupRef.current) {
      groupRef.current.rotation.y +=
        delta * scrollDirection > 0
          ? 0.05 * scrollVelocity + 0.001
          : -0.05 * scrollVelocity - 0.001;
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
        const width = 2;
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
