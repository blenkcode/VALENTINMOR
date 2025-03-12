export const vertex = `
varying vec2 vUv;
uniform float uScrollY;

float PI = 3.141592;

// Fonction de rotation autour de l'axe X
vec3 rotateX(vec3 pos, float angle){
    float c = cos(angle);
    float s = sin(angle);
    return vec3(pos.x, pos.y * c - pos.z * s, pos.y * s + pos.z * c);
}

void main() {
    vUv = uv;
    vec3 newPosition = position;
    float rotationAngle;
    
    if (uScrollY > 0.0) {
        // Si scrollY est positif, on applique une rotation dans un sens
        rotationAngle = -1.0 * sin((newPosition.y + 1.0) * (0.5 - 0.5 * PI)) * uScrollY * 0.8;
    } else {
        // Si scrollY est négatif ou zéro, on applique une rotation dans l'autre sens
        rotationAngle = sin((newPosition.y - 1.0) * (0.5 - 0.5 * PI)) * uScrollY * 0.8;
    }
    
  
    
    
    // Appliquer la rotation sur l'axe X
    newPosition = rotateX(newPosition, rotationAngle);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

// Fragment shader conservé pour la distortion
export const fragment = `
uniform sampler2D uTexture;

varying vec2 vUv;



void main() {
    vec2 uv = vUv;
    
  
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
}
`;
