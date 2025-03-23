import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { fragment, vertex } from "./ShaderCarousselTube";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProject } from "@/app/Context/ProjectContext";
// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
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
const VerticalCarouselScene = ({ images }) => {
  const { project } = useProject();
  const [isAnimating, setIsAnimating] = useState(false);
  const texture = useTexture("/VAL.png");
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const textures = useTexture(images);
  const controls = useRef({
    amplitude: { value: 5.6 },
    distortion: { value: 0.0 },
    rotation: { value: 2.0 },
  });
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
  const handleVirtualScroll = useCallback(
    ({ direction, normalizedVelocity }) => {
      if (normalizedVelocity > 0.01) {
        setScrollDirection(direction);
        setScrollVelocity(normalizedVelocity);
        setProgress((prevProgress) => {
          // Calculer la nouvelle valeur
          const step = normalizedVelocity * 0.18; // Ajuster cette valeur selon votre besoin
          const newProgress = prevProgress + direction * step;

          // Limiter entre 0 et 1
          return Math.max(0, Math.min(100, newProgress));
        });

        // Valeur de base de l'amplitude: 0.25
        // Valeur max: -1.7
        const baseAmplitude = 0;
        const maxAmplitude = 3.0;

        // Calculer la valeur d'amplitude en fonction de la direction et de la vélocité
        const amplitudeValue =
          direction > 0
            ? baseAmplitude +
              (maxAmplitude - baseAmplitude) * normalizedVelocity
            : -baseAmplitude -
              (maxAmplitude - baseAmplitude) * normalizedVelocity;

        // Appliquer la nouvelle valeur avec GSAP
        // gsap.to(controls.current.rotation, {
        //   value: amplitudeValue,
        //   duration: 0.9,
        //   ease: "power1.out",
        // });
      }
    },
    []
  );

  // Utiliser le hook de virtual scroll
  useVirtualScroll(handleVirtualScroll, {
    sensitivity: 30,
    damping: 0.95,
  });

  const uniformsArrayRef = useRef(
    textureArray.map((texture) => ({
      uTexture: { value: texture },
      uAmplitude: { value: controls.current.amplitude },
      uDistortion: { value: controls.current.distortion },
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uRotation: { value: controls.current.rotation },
    }))
  );

  useEffect(() => {
    if (meshRef.current && texture) {
      meshRef.current.material.uniforms.uTexture.value = texture;
    }
  }, [texture]);

  useEffect(() => {
    // S'assurer que le groupe existe
    if (groupRef.current) {
      // Positionner initialement le groupe à x=3
      groupRef.current.position.x = 6.5;
      // Animer vers x=0
      gsap.to(groupRef.current.position, {
        x: -1.1,
        duration: 3,
        ease: "expo.inOut",
      });
    }
  }, []); // Déclencher une seule fois au montage du composant

  useFrame((delta) => {
    // if (groupRef.current) {
    //   groupRef.current.position.x =
    //     delta * scrollDirection > 0
    //       ? 0.1 * scrollVelocity
    //       : -0.1 * scrollVelocity;
    // }
    meshRefs.current.forEach((meshRef, index) => {
      // Obtenir la valeur d'amplitude actuelle depuis les uniformes

      uniformsArrayRef.current[index].uProgress.value = progress;
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
      const x = 3.5 * index; // Négatif pour descendre verticalement
      const y = 0;
      const z = 0;
      const rotation = [0, 0, 0];

      return { position: [x, y, z], rotation: rotation };
    });
  }, [textureArray.length]);

  // useEffect(() => {
  //   const tl = gsap.timeline();
  //   if (project === 0 && lastpProject === 0) return;
  //   tl.to(
  //     controls.current.rotation,
  //     {
  //       value: 0.5,
  //       duration: 0.5,
  //       ease: "expo.out",
  //     },
  //     0
  //   ).to(controls.current.rotation, {
  //     value: 0.0,
  //     duration: 1.7,
  //     ease: "expo.out",
  //   });
  // }, [project]);

  useEffect(() => {
    const tl = gsap.timeline();
    // Animation avec GSAP pour une transition fluide
    tl.to(controls.current.distortion, {
      value: 0.0,
      duration: 0.5,
      ease: "expo.out",
    }).to(controls.current.distortion, {
      value: 0.0,
      duration: 1.3,
      ease: "expo.out",
    });
  }, [project]);
  return (
    <group ref={groupRef}>
      {textureArray.map((texture, index) => {
        const { position, rotation } = planePositions[index];
        let aspectRatio = 1;
        if (texture.image) {
          aspectRatio = texture.image.width / texture.image.height;
        }
        const width = 5;
        const height = width / aspectRatio;
        return (
          <mesh
            key={index}
            ref={meshRefs.current[index]}
            position={new THREE.Vector3(...position)}
            rotation={new THREE.Euler(...rotation)}
          >
            <planeGeometry args={[width, height, 70, 70]} />
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
