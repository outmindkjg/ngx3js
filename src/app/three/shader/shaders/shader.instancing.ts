export const BufferGeometryInstancing = {
  vertexShader: `
  precision highp float;
  uniform float sineTime;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  attribute vec3 position;
  attribute vec3 offset;
  attribute vec4 color;
  attribute vec4 orientationStart;
  attribute vec4 orientationEnd;
  varying vec3 vPosition;
  varying vec4 vColor;
  void main(){
    vPosition = offset * max( abs( sineTime * 2.0 + 1.0 ), 0.5 ) + position;
    vec4 orientation = normalize( mix( orientationStart, orientationEnd, sineTime ) );
    vec3 vcV = cross( orientation.xyz, vPosition );
    vPosition = vcV * ( 2.0 * orientation.w ) + ( cross( orientation.xyz, vcV ) * 2.0 + vPosition );
    vColor = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
  }
  `,
  fragmentShader: `
  precision highp float;
  uniform float time;
  varying vec3 vPosition;
  varying vec4 vColor;
  void main() {
    vec4 color = vec4( vColor );
    color.r += sin( vPosition.x * 10.0 + time ) * 0.5;
    gl_FragColor = color;
  }
  `,
  uniforms: {
    time : { value : 1.0 },
    sineTime : { value : 1.0 }
  },
};
