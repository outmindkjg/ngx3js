import { Color } from 'three';
export const AttributeSizeColor1 = {
  vertexShader: `
  attribute float size;
  attribute vec4 ca;
  varying vec4 vColor;
  void main() {
    vColor = ca;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = size * ( 150.0 / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  fragmentShader: `
  uniform vec3 color;
  uniform sampler2D pointTexture;
  varying vec4 vColor;
  void main() {
    vec4 outColor = texture2D( pointTexture, gl_PointCoord );
    if ( outColor.a < 0.5 ) discard;
    gl_FragColor = outColor * vec4( color * vColor.xyz, 1.0 );
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    const vec3 fogColor = vec3( 0.0 );
    float fogFactor = smoothstep( 200.0, 600.0, depth );
    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
  }
  `,
  uniforms: {
    amplitude : { value : 1.0 },
    color : { value : new Color(0xffffff) },
    pointTexture : { value : null }
},
};
