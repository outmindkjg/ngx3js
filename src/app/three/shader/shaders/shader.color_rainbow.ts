
export const ColorRainbow = {
  vertexShader: `
  varying vec2 vUV;
  varying vec3 vNormal;
  void main() {
    vUV = uv;
    vNormal = vec3( normal );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,
  fragmentShader: `
  varying vec2 vUV;
  varying vec3 vNormal;
  void main() {
    vec4 c = vec4( abs( vNormal ) + vec3( vUV, 0.0 ), 0.0 );
    gl_FragColor = c;
  }
  `,
};
