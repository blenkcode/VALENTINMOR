"use client";

import React, { useEffect, useRef } from "react";

import dynamic from "next/dynamic";
import * as THREE from "three";
import gsap from "gsap";

import { usePathname } from "next/navigation";
const ShaderEffect = () => {
  const containerRef = useRef(null);
  const pathname = usePathname();
  const shaderMaterialRef = useRef(null);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    let cleanup;

    const initThree = () => {
      if (!containerRef.current) return;

      // Configuration de la scène Three.js
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      const clock = new THREE.Clock();

      const container = containerRef.current;
      const { clientWidth: width, clientHeight: height } = container;
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      // Création du matériau avec les shaders
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          uScroll: { value: 0 },
          uAnim: { value: 0 },
          uAnimMenu: { value: 1 },
          uAnimMenuVar: { value: 1 },
          uAnim2: { value: 0.84 },
          iResolution: { value: new THREE.Vector3(width, height, 1) },
          uMouse: { value: [10, 0] },
        },
        vertexShader: `
        uniform float uAmplitude;
        uniform float uWaveLength;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uHoverRadius;
        uniform float uProgress;
        varying vec2 vUv;
        uniform float uDeformation; 
        
        float easeOutSine(float x) {
            return sin((x * 3.14159) / 2.0);
        }
        
        float animationDeform(vec2 pos) {
            float dist = distance(pos, vec2(0.0));
            float radius = 3.0; // Rayon plus large que le hover
            
            if (dist < radius) {
                float strength = 5.0 - (dist / radius);
                strength = easeOutSine(strength);
                return strength * uDeformation; // uDeformation contrôlera l'intensité
            }
            return 0.0;
        }
        
        void main() {
            vUv = uv;
            vec3 newPosition = position;
            
            float PI = 3.14159;
            
            // Déformation basée sur Y au lieu de X
            newPosition.z += uAmplitude * sin((newPosition.y -2.0) * 0.8 );
            
            // Effet hover
            float dist = distance(position.xy, uMouse.xy);
            float hoverEffect = 0.0;
            if (dist < uHoverRadius) {
                float strength = 1.0 - (dist / uHoverRadius);
                strength = easeOutSine(strength);
                hoverEffect = strength * 0.25;
            }
            float animDeform = animationDeform(position.xy);
            newPosition.z += hoverEffect + animDeform;
        
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
        `,
        fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform float uHover;
        uniform vec2 uMousePos;
        varying vec2 vUv;
        uniform float uScroll; 
        uniform float uAnim;
        uniform float uAnimMenu;
        uniform float uAnimMenuVar;
        uniform float uAnim2;
        // Fonction de permutation
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
        // Simplex noise 2D
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                           -0.577350269189626,
                            0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                                 dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 500.0 * dot(m, g);
        }
  
        void main() {
         
            vec2 uv = ((0.15 * uAnim )* vUv - 1.0) * vec2(iResolution.x/iResolution.y, 1.0);
            float scrollEffect = uScroll * 2.5; // Amplification de l'effet
            float slowTime = iTime  * 0.05;
            float scrollEffect2 = uScroll * 0.7;
      float animEffect = uAnim;
      float animEffect2 = uAnim2;
            float noise1 = snoise(uv * 4.0 + vec2(slowTime * 0.5 ));
            float noise2 = snoise(uv * (10.5* animEffect2)  - vec2(slowTime * 1.3 ));
            float noise3 = snoise(uv * 10000.5    + vec2(slowTime * 0.7 ));
            
            // Combinaison des différentes couches de bruit
            float finalNoise = (noise1 * 10.9  + noise2 * (5.4 * uAnimMenuVar)  + noise3 * 1.5) ;
            
            // Calcul de la distance entre le pointeur et chaque pixel
            float distance = length(uv - uMousePos) * 10.0;
            
            // Appliquer un effet de distorsion en fonction de la distance
            float distortionAmount = mix(0.0, 0.9, clamp(1.0 - distance, 0.0, 1.0));
            uv.x += distortionAmount * finalNoise;
            uv.y += distortionAmount * finalNoise;
            
            vec4 color1 = vec4(0.045, 0.151, 0.241, 0.0); // Alpha à 0.3
            vec4 color2 = vec4(0.055, 0.251, 0.341, 1.0); // Alpha à 0.6
            vec4 color3 = vec4(0.055, 0.251, 0.341, 1.0); // Alpha à 1.0
            
            // Utilisation du bruit pour le mélange des couleurs
            float colorMix = (finalNoise + 1.0) * (0.1 * uAnimMenu);
            
            vec4 color;
            if(colorMix < 0.45) {
              color = mix(color1, color2, colorMix * (1.0 * uAnim2));
            } else {
              color = mix(color2, color3, (colorMix - 0.5) * (0.6 * animEffect2));
            }
            
            // Utiliser directement le vec4 color car il contient déjà l'alpha
            gl_FragColor = color;
          }
        `,
      });
      shaderMaterialRef.current = shaderMaterial;
      // Création du mesh
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, shaderMaterial);
      scene.add(mesh);

      // Animation
      let animationFrameId;
      const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        shaderMaterial.uniforms.iTime.value = elapsedTime;
        shaderMaterial.uniforms.uScroll.value = scrollVelocity.current;
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();

      gsap.to(shaderMaterial.uniforms.uAnim, {
        value: 1,
        duration: 6.5,
        delay: 0,
        ease: "expo.inOut",
      });
      gsap.to(shaderMaterial.uniforms.uAnim2, {
        value: 1,
        duration: 5.5,
        delay: 1,
        ease: "expo.inOut",
      });

      // Gestion du redimensionnement
      const handleResize = () => {
        const { clientWidth: newWidth, clientHeight: newHeight } = container;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
        shaderMaterial.uniforms.iResolution.value.set(newWidth, newHeight, 1);
      };

      window.addEventListener("resize", handleResize);

      // Définir la fonction de nettoyage
      cleanup = () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        shaderMaterial.dispose();
        renderer.dispose();
      };
    };

    initThree();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // useEffect(() => {
  //   if (shaderMaterialRef.current) {
  //     if (menuOpen) {
  //       gsap.to(shaderMaterialRef.current.uniforms.uAnimMenu, {
  //         value: 10,
  //         duration: 0.9,
  //         ease: "sine.inOut",
  //       });
  //     } else {
  //       gsap.to(shaderMaterialRef.current.uniforms.uAnimMenu, {
  //         value: 1,
  //         duration: 0.6,
  //         ease: "expo.out",
  //       });
  //     }
  //   }
  // }, [menuOpen]);
  useEffect(() => {
    if (shaderMaterialRef.current) {
      if (pathname === "/ImageGallery") {
        gsap.to(shaderMaterialRef.current.uniforms.uAnimMenuVar, {
          value: 5,
          duration: 2.5,
          ease: "sine.inOut",
        });
      } else {
        gsap.to(shaderMaterialRef.current.uniforms.uAnimMenuVar, {
          value: 1,
          duration: 1.4,
          ease: "back.inOut",
        });
      }
    }
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full  top-0 z-0 relative z-0 "
    ></div>
  );
};

const ShaderEffectWithNoSSR = dynamic(() => Promise.resolve(ShaderEffect), {
  ssr: false,
});

export default ShaderEffectWithNoSSR;
