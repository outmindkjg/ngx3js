
export const ShaderNoiseRandom3D = {
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
    vec3 rand3 = vec3( rand( vUv ), rand( vUv + vec2( 0.4, 0.6 ) ), rand( vUv + vec2( 0.6, 0.4 ) ) );
    gl_FragColor.xyz = rand3;
    gl_FragColor.w = 1.0;
  }
  `,
};
