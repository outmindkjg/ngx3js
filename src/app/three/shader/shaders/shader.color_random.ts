
export const ColorRandom = {
  vertexShader: `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,
  fragmentShader: `
  varying vec2 vUv;
  uniform float time;
  void main() {
    float r = vUv.x;
    if( vUv.y < 0.5 ) r = 0.0;
    float g = vUv.y;
    if( vUv.x < 0.5 ) g = 0.0;
    gl_FragColor = vec4( r, g, time, 1.0 );
  }
  `,
  uniforms: {
    time: { value: 0.0 }
  },
};
