import { Color } from 'three';
export const AttributeSizeColor = {
  vertexShader: `
  attribute float size;
  attribute vec3 ca;
  varying vec3 vColor;
  void main() {
    vColor = ca;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = size * ( 300.0 / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  fragmentShader: `
  uniform vec3 color;
  uniform sampler2D pointTexture;
  varying vec3 vColor;
  void main() {
    vec4 color = vec4( color * vColor, 1.0 ) * texture2D( pointTexture, gl_PointCoord );
    gl_FragColor = color;
  }
  `,
  uniforms: {
    color : { value : new Color(0xffffff) },
    pointTexture : { value : null }
  },
};
