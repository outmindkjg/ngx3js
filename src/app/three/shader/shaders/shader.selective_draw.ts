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
  precision mediump float;
  precision mediump int;

  uniform float time;

  varying vec3 vPosition;
  varying vec4 vColor;

  void main()	{

    vec4 color = vec4( vColor );
    color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

    gl_FragColor = color;

  }
  `,

  uniforms: {},
};
