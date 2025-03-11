"use client";

import React, { useEffect, useRef, useState } from "react";

const fragmentShader = `
    precision mediump float;
    uniform sampler2D uTexture;    
    uniform vec2 uMouse;
    uniform vec2 uPrevMouse;
    uniform float uAberrationIntensity;
    uniform vec2 uResolution;
    uniform float uTime;

    vec2 hash( vec2 p ) {
        p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
        return -1.0 + 2.0*fract(sin(p)*43758.5453123);
    }

    float noise( in vec2 p ) {
        const float K1 = 0.366025404;
        const float K2 = 0.211324865;
        
        vec2 i = floor(p + (p.x+p.y)*K1);
        vec2 a = p - i + (i.x+i.y)*K2;
        vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
        vec2 b = a - o + K2;
        vec2 c = a - 1.0 + 2.0*K2;
        
        vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
        vec3 h2 = h*h*h*h;
        vec3 n = h2*vec3(dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
        
        return dot(n, vec3(70.0));
    }

    float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 5.0;
        
        for (int i = 0; i < 5; i++) {
            value += amplitude * noise(p * frequency + uTime * 0.2);
            amplitude *= 2.5;
            frequency *= 1.0;
        }
        
        return value;
    }

    void main() {
        vec2 uv = vec2(gl_FragCoord.x / uResolution.x, gl_FragCoord.y / uResolution.y);
        vec2 mouseDirection = uMouse - uPrevMouse;
        vec2 toMouse = uv - uMouse;
        
        float aspectRatio = uResolution.x / uResolution.y;
        vec2 scaledDistance = vec2(toMouse.x * aspectRatio, toMouse.y);
        float distanceToMouse = length(scaledDistance) * 7.9;
        
        vec2 noiseCoord = uv * 3.0;
        float noiseValue = fbm(noiseCoord + uTime * 0.3);
        
        float distortionAmount = exp(-distanceToMouse * 2.0) * uAberrationIntensity;
        vec2 distortion = vec2(
            noiseValue * cos(uTime + uv.x * 10.0),
            noiseValue * sin(uTime + uv.y * 10.0)
        ) * distortionAmount * 0.15;
        
        vec2 finalUV = uv + distortion;
        vec4 color = texture2D(uTexture, finalUV);
        gl_FragColor = color;
    }
`;

const vertexShader = `
    attribute vec2 aPosition;
    void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`;

const WebGLText = ({
  text = "Hello World",
  className = "",
  isHovered = false,
}) => {
  const canvasRef = useRef(null);
  const textCanvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const prevMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const textCanvas = textCanvasRef.current;
    if (!canvas || !textCanvas) return;

    // Configuration du canvas de texte
    const textCtx = textCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth * dpr;
    const displayHeight = canvas.clientHeight * dpr;

    canvas.width = displayWidth;
    canvas.height = displayHeight;
    textCanvas.width = displayWidth;
    textCanvas.height = displayHeight;

    // Rendu du texte
    textCtx.scale(dpr, -dpr); // Inverse l'axe Y
    textCtx.translate(0, -textCanvas.height / dpr); // Translate pour compenser l'inversion
    textCtx.fillStyle = "white";
    textCtx.font = "bold 48px Arial";
    textCtx.textAlign = "center";
    textCtx.textBaseline = "middle";
    textCtx.fillText(
      text,
      textCanvas.width / 2 / dpr,
      textCanvas.height / 2 / dpr
    );

    // Configuration WebGL
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Création des shaders
    const vShader = gl.createShader(gl.VERTEX_SHADER);
    const fShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vShader, vertexShader);
    gl.shaderSource(fShader, fragmentShader);
    gl.compileShader(vShader);
    gl.compileShader(fShader);

    // Création du programme
    const program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Configuration des attributs et uniforms
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Création de la texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      textCanvas
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Localisation des uniforms
    const uTexture = gl.getUniformLocation(program, "uTexture");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uPrevMouse = gl.getUniformLocation(program, "uPrevMouse");
    const uAberrationIntensity = gl.getUniformLocation(
      program,
      "uAberrationIntensity"
    );
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");

    let startTime = Date.now();
    let animationFrameId;

    // Fonction de rendu
    const render = () => {
      const time = (Date.now() - startTime) / 1000;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1i(uTexture, 0);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform2f(uPrevMouse, prevMouseRef.current.x, prevMouseRef.current.y);
      gl.uniform1f(uAberrationIntensity, isHovered ? 5.0 : 0.0);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      prevMouseRef.current = { ...mouseRef.current };
      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
      console.log("Mouse position:", x, y);
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [text, isHovered]); // Ajout de isHovered comme dépendance

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="w-full h-64 cursor-pointer" />
      <canvas ref={textCanvasRef} className="hidden" />
    </div>
  );
};

// Composant wrapper pour gérer le hover
const WebGLTextWrapper = (props) => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      setIsHovering(true);
      console.log("Container mouse enter");
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      console.log("Container mouse leave");
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${props.className}`}
      style={{ cursor: "pointer" }}
    >
      <WebGLText {...props} isHovered={isHovering} />
    </div>
  );
};

export default WebGLTextWrapper;
