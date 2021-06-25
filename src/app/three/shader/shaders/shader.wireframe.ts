export const WireFrame = {
  vertexShader: `
  attribute vec3 center;
  varying vec3 vCenter;
  void main() {
    vCenter = center;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`,
  fragmentShader: `
  uniform float widthFactor;
  varying vec3 vCenter;
  float edgeFactorTri() {
    vec3 d = fwidth( vCenter.xyz );
    vec3 a3 = smoothstep( vec3( 0.0 ), d * widthFactor, vCenter.xyz );
    return min( min( a3.x, a3.y ), a3.z );
  }
  void main() {
    if ( edgeFactorTri() > 0.99 ) discard;
    gl_FragColor = gl_FrontFacing ? vec4( 0.9, 0.9, 1.0, 1.0 ) : vec4( 0.4, 0.4, 0.5, 1.0 );
  }
  `,
  uniforms: {
    widthFactor: { value: 1 },
  },
};
