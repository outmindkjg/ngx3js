export const SelectiveDraw = {
  vertexShader: `
  attribute float visible;
  varying float vVisible;
  attribute vec3 vertColor;
  varying vec3 vColor;
  void main() {
    vColor = vertColor;
    vVisible = visible;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,
  fragmentShader: `
  varying float vVisible;
  varying vec3 vColor;
  void main() {
    if ( vVisible > 0.0 ) {
      gl_FragColor = vec4( vColor, 1.0 );
    } else {
      discard;
    }
  }
  `,
  uniforms: {},
};
