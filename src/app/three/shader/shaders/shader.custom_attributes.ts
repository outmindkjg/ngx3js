import * as THREE from 'three';
export const CustomAttributes = {
  vertexShader: `
  uniform float amplitude;
  attribute float displacement;
  varying vec3 vNormal;
  varying vec2 vUv;
  void main() {
    vNormal = normal;
    vUv = ( 0.5 + amplitude ) * uv + vec2( amplitude );
    vec3 newPosition = position + amplitude * normal * vec3( displacement );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
  }
  `,
  fragmentShader: `
  varying vec3 vNormal;
  varying vec2 vUv;
  uniform vec3 color;
  uniform sampler2D colorTexture;
  void main() {
    vec3 light = vec3( 0.5, 0.2, 1.0 );
    light = normalize( light );
    float dProd = dot( vNormal, light ) * 0.5 + 0.5;
    vec4 tcolor = texture2D( colorTexture, vUv );
    vec4 gray = vec4( vec3( tcolor.r * 0.3 + tcolor.g * 0.59 + tcolor.b * 0.11 ), 1.0 );
    gl_FragColor = gray * vec4( vec3( dProd ) * vec3( color ), 1.0 );
  }
  `,
  uniforms: {
    amplitude : { value : 1.0 },
    color : { value : new THREE.Color(0xff2200) },
    colorTexture : { value : null }
  },
};
