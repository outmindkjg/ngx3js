
export const ShaderNoiseRandom1D = {
  vertexShader: `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  fragmentShader: `
  #include <common>
  varying vec2 vUv;
  void main() {
    gl_FragColor.xyz = vec3( rand( vUv ) );
    gl_FragColor.w = 1.0;
  }
  `,
};
