export const vertex = `
varying vec2 vUv;
varying float vFacing;
float PI = 3.141592;
uniform float uWaveLength;
uniform float uAmplitude;
vec3 rotateY(vec3 pos, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return vec3(pos.x * c - pos.z * s, pos.y, pos.x * s + pos.z * c);
}

void main() {
    vUv = uv;
    vec3 vNormal = normalize(normalMatrix * normal);
    vec3 vViewPosition = normalize(modelViewMatrix * vec4(position, 1.0)).xyz;
    vFacing = dot(vNormal, vViewPosition);


 
    vec3 newPosition = position;
    float rotationAngle = cos(smoothstep(-15.0, 15.0, newPosition.x) * PI);
    newPosition = rotateY(position, rotationAngle * uAmplitude) ;

    

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const fragment = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uDistortion;
varying vec2 vUv;

vec2 hash(vec2 p) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(in vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;

    vec2 i = floor(p + (p.x+p.y) * K1);
    vec2 a = p - i + (i.x+i.y) * K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;

    vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));

    return dot(n, vec3(70.0));
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 4.5;
    float frequency = 2.0;

    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(p * frequency + uTime * 0.1);
        amplitude *= 5.5;
        frequency *= 2.0;
    }

    return value;
}

void main() {
    vec2 uv = vUv;
    
    // Calculer une distortion qui est plus forte aux bords
    float edgeStrength = pow(abs(uv.y - 0.5) * 1.0, 1.0); // 0 au centre, 1 aux bords
    
    // Calculer la distortion en utilisant le bruit FBM
    vec2 noiseCoord = uv * 0.5;
    float noiseValue = fbm(noiseCoord);
    
    // Appliquer la distortion si nécessaire
    vec2 distortion = vec2(
        sin(uTime) * noiseValue * uDistortion,
        cos(uTime + uv.y * 5.0) * noiseValue * uDistortion
    ) * edgeStrength;
    
    // Appliquer la distortion à l'UV
    uv += distortion;
    
    // Assurer que les UVs restent dans les limites de la texture
    uv = clamp(uv, 0.0, 1.0);
    vec4 color = texture2D(uTexture, uv);
   
    
    gl_FragColor = color;
}
`;
