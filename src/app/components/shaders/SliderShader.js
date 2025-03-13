export const vertex = `
varying vec2 vUv;
uniform float uProgress;
varying vec3 vPosition;

float PI = 3.141592;

vec3 rotateX(vec3 pos, float angle){
    float c = cos(angle);
    float s = sin(angle);
    return vec3(pos.x, pos.y*c - pos.z*s, pos.y*s + pos.z*c);
}

void main() {
    vUv = uv;
 
    // Position de base ajustée par le défilement
    vec3 pos = position;
    pos.y += uProgress;
    
    // Obtenir la position dans l'espace monde
    vec3 vWorldPosition = (modelMatrix * vec4(pos, 1.8)).xyz;
    vPosition = vWorldPosition;
    
    // Calculer l'angle de rotation basé sur la position Y
    float rotationAngle = cos(smoothstep(-14.0, 14.0, vWorldPosition.y) * PI);
    
    // Appliquer la rotation sur l'axe X à la position mondiale
    vWorldPosition = rotateX(vWorldPosition, rotationAngle);
    
    // Rendre avec la position mondiale transformée
    gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPosition, 1.0);
}
`;

// Fragment shader conservé pour la distortion
export const fragment = `
uniform sampler2D uTexture;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    gl_FragColor = vec4(vUv,0.0,1.0);
    vec3 color = texture2D( uTexture,vUv).rgb;

    float a = smoothstep(-0.7,0.0,vPosition.z);

   

    gl_FragColor = vec4(color,a);
}
`;
