import * as THREE from 'three';
export const CustomAttributesLines = {
  vertexShader: `
  uniform float amplitude;
  attribute vec3 displacement;
  attribute vec3 customColor;
  varying vec3 vColor;
  void main() {
    vec3 newPosition = position + amplitude * displacement;
    vColor = customColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
  }
  `,
  fragmentShader: `
  uniform vec3 color;
  uniform float opacity;
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4( vColor * color, opacity );
  }
  `,
  uniforms: {
    amplitude: { value: 5.0 },
    opacity: { value: 0.3 },
    color: { value: new THREE.Color( 0xffffff ) }
  },
};
