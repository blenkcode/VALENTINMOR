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
varying vec2 vUv;
varying float vFacing;

void main() {
    vec2 uv = vUv;
    
    // Inverser les coordonnées U (horizontalement) pour la face avant
    // if (vFacing > 0.0) {
    //     uv.x = 1.0 - uv.x;
    // }
    
    // Utiliser uv et non vUv pour échantillonner la texture
    vec4 texColor = texture2D(uTexture, uv);
    
    gl_FragColor = texColor;
}
`;
