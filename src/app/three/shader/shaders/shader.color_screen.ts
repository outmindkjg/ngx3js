
export const ColorScreen = {
  vertexShader: `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,
  fragmentShader: `
  varying vec2 vUv;
  uniform sampler2D tDiffuse;
  void main() {
    gl_FragColor = texture2D( tDiffuse, vUv );
  }
  `,
  uniforms: {
    tDiffuse: { value: null }
  },
};
