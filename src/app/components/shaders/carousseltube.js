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

gsap.registerPlugin(ScrollTrigger);
const useVirtualScroll = (onScroll, options = {}) => {
  const { sensitivity = 30, damping = 0.9 } = options;

  const virtualScrollY = useRef(0);
  const prevVirtualScrollY = useRef(0);
  const scrollVelocityRef = useRef(0);
  const scrollDirectionRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const isScrollingRef = useRef(false);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      virtualScrollY.current += e.deltaY;

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

    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchY) * 2;
      touchStartY = touchY;

      handleWheel({ preventDefault: () => {}, deltaY });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const animateScroll = () => {
      if (isScrollingRef.current) {
        scrollVelocityRef.current *= damping;

        if (scrollVelocityRef.current < 0.01) {
          isScrollingRef.current = false;
          scrollVelocityRef.current = 0;
        }

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
const VerticalCarouselScene = ({ images, progress }) => {
  const { project } = useProject();
  const [isAnimating, setIsAnimating] = useState(false);
  const texture = useTexture("/VAL.png");
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);

  const textures = useTexture(images);
  const controls = useRef({
    amplitude: { value: 5.6 },
    distortion: { value: 0.0 },
    rotation: { value: -1.0 },
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

        const baseAmplitude = 0;
        const maxAmplitude = 3.0;

        const amplitudeValue =
          direction > 0
            ? baseAmplitude +
              (maxAmplitude - baseAmplitude) * normalizedVelocity
            : -baseAmplitude -
              (maxAmplitude - baseAmplitude) * normalizedVelocity;
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
      groupRef.current.position.x = 9.5;
      // Animer vers x=0
      gsap.to(groupRef.current.position, {
        x: 2.58,
        duration: 3,
        ease: "expo.inOut",
      });
    }
  }, []); // Déclencher une seule fois au montage du composant

  useFrame((delta) => {
    meshRefs.current.forEach((meshRef, index) => {
      uniformsArrayRef.current[index].uProgress.value = 34.55 * progress;
      uniformsArrayRef.current[index].uTime.value += 0.004;

      uniformsArrayRef.current[index].uAmplitude.value =
        controls.current.amplitude.value;
      uniformsArrayRef.current[index].uDistortion.value =
        controls.current.distortion.value;
      uniformsArrayRef.current[index].uRotation.value =
        controls.current.rotation.value;
    });
  });

  const planePositions = useMemo(() => {
    // Vous pouvez modifier cette valeur pour augmenter l'écart sans problème maintenant
    const spacing = 4.05; // Exemple: augmenté à 8 pour plus d'écart

    const positions = textureArray.map((_, index) => {
      const x = spacing * index;
      const y = 0;
      const z = 0;
      const rotation = [0, 0, 0];

      return { position: [x, y, z], rotation: rotation };
    });

    const maxX =
      positions.length > 0 ? positions[positions.length - 1].position[0] : 0;

    return { positions, maxX, spacing };
  }, [textureArray.length]);

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
        const { position, rotation } = planePositions.positions[index];
        let aspectRatio = 1;
        if (texture.image) {
          aspectRatio = texture.image.width / texture.image.height;
        }
        const width = 6;
        const height = width / aspectRatio;

        return (
          <mesh
            key={index}
            ref={(el) => {
              meshRefs.current[index] = el;
              // Désactiver le frustum culling
              if (el) {
                el.frustumCulled = false;
              }
            }}
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
