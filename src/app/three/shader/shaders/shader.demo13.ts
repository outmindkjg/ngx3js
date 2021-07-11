import * as THREE from 'three';
export const ShaderDemo13 = {
  vertexShader: `
  in vec3 position;
  in vec3 normal;
  in vec2 uv;
  out vec3 vNormal;
  out vec2 vUv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform mat3 normalMatrix;
  void main() {
    vUv = uv;
    // get smooth normals
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec3 transformedNormal = normalMatrix * normal;
    vNormal = normalize( transformedNormal );
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  fragmentShader: `
  precision highp float;
  precision highp int;
  layout(location = 0) out vec4 gColor;
  layout(location = 1) out vec4 gNormal;
  uniform sampler2D tDiffuse;
  uniform vec2 repeat;
  in vec3 vNormal;
  in vec2 vUv;
  void main() {
    // write color to G-Buffer
    gColor = texture( tDiffuse, vUv * repeat );
    // write normals to G-Buffer
    gNormal = vec4( normalize( vNormal ), 0.0 );
  }
  `,
  uniforms : {
    tDiffuse: { value: null },
    repeat: { value: new THREE.Vector2( 5, 0.5 ) }
  }
};
