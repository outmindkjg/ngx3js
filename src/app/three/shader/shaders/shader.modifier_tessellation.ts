
export const ModifierTessellation = {
  vertexShader: `
  uniform float amplitude;
  attribute vec3 customColor;
  attribute vec3 displacement;
  varying vec3 vNormal;
  varying vec3 vColor;
  void main() {
    vNormal = normal;
    vColor = customColor;
    vec3 newPosition = position + normal * amplitude * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
  }
  `,
  fragmentShader: `
  varying vec3 vNormal;
  varying vec3 vColor;
  void main() {
    const float ambient = 0.4;
    vec3 light = vec3( 1.0 );
    light = normalize( light );
    float directional = max( dot( vNormal, light ), 0.0 );
    gl_FragColor = vec4( ( directional + ambient ) * vColor, 1.0 );
  }
  `,
  uniforms: {
    amplitude: { value: 1.0 }
  },
};
