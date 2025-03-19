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
         
            vec2 uv = ((0.5  )* vUv - 1.0) * vec2(iResolution.x/iResolution.y, 1.0);
            float scrollEffect = uScroll * 2.5; // Amplification de l'effet
            float slowTime = iTime  * 0.3;
            float scrollEffect2 = uScroll * 0.7;
      float animEffect = uAnim;
      float animEffect2 = uAnim2;
            float noise1 = snoise(uv * 4.0 + vec2(slowTime * 0.5 ));
            float noise2 = snoise(uv * (100.5* animEffect2)  - vec2(slowTime * 0.03 ));
            float noise3 = snoise(uv * (1000.5 *uAnimMenuVar )    + vec2(slowTime * 0.2 ));
            
            // Combinaison des différentes couches de bruit
            float finalNoise = (noise1 * 0.9  + noise2 * (2.4 )  + noise3 * 20.5) ;
            
            // Calcul de la distance entre le pointeur et chaque pixel
            float distance = length(uv - uMousePos) * 1.0;
            
            // Appliquer un effet de distorsion en fonction de la distance
            float distortionAmount = mix(0.0, 0.9, clamp(1.0 - distance, 0.0, 1.0));
            uv.x += distortionAmount * finalNoise;
            uv.y += distortionAmount * finalNoise;
            
            vec3 color1 = vec3(0.5, 0.5, 0.5);
            vec3 color2 = vec3(0.99, 0.99, 0.99);
            vec3 color3 = vec3(0.7, 0.7, 0.7);
            
            // Utilisation du bruit pour le mélange des couleurs
            float colorMix = (finalNoise + 1.0) * (0.1 ) ;
            
            vec3 color;
            if(colorMix < 0.95) {
                color = mix(color1, color2, colorMix * (1.0* uAnim2));
            } else {
                color = mix(color2, color3, (colorMix - 0.5) * (1.6 *  animEffect2));
            }
            
            gl_FragColor = vec4(color, 1.0);
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
  //     if (transition) {
  //       const tl = gsap.timeline();
  //       tl.to(shaderMaterialRef.current.uniforms.uAnimMenuVar, {
  //         value: 0.1,
  //         duration: 0.7,
  //         ease: "sine.inOut",
  //       }).to(shaderMaterialRef.current.uniforms.uAnimMenuVar, {
  //         value: 1,
  //         duration: 2.7,
  //         ease: "sine.inOut",
  //       });
  //     } else if (!transition) {
  //       const tl = gsap.timeline();
  //       tl.to(shaderMaterialRef.current.uniforms.uAnimMenuVar, {
  //         value: 0.1,
  //         duration: 0.7,
  //         ease: "sine.inOut",
  //       }).to(shaderMaterialRef.current.uniforms.uAnimMenuVar, {
  //         value: 1,
  //         duration: 2.7,
  //         ease: "sine.inOut",
  //       });
  //     }

  //     // .to(
  //     //   shaderMaterialRef.current.uniforms.uAnim2,
  //     //   {
  //     //     value: 0.02,
  //     //     duration: 0.7,
  //     //     ease: "sine.inOut",
  //     //   },
  //     //   0
  //     // )
  //     // .to(shaderMaterialRef.current.uniforms.uAnim2, {
  //     //   value: 0.84,
  //     //   duration: 0.7,
  //     //   ease: "sine.inOut",
  //     // });
  //   }
  // }, [transition]);

  return (
    <div
      ref={containerRef}
      className="w-[120vw] h-[200vh] left-[-10vw] top-0  fixed z-[1000] opacity-[7%] pointer-events-none "
    ></div>
  );
};

const ShaderEffectWithNoSSR = dynamic(() => Promise.resolve(ShaderEffect), {
  ssr: false,
});

export default ShaderEffectWithNoSSR;
