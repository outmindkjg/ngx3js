
export const ShaderDemo2 = {
  vertexShader: `
  varying vec2 vUv;
  void main()
  {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  fragmentShader: `
  uniform float time;
  uniform sampler2D colorTexture;
  varying vec2 vUv;
  void main( void ) {
    vec2 position = - 1.0 + 2.0 * vUv;
    float a = atan( position.y, position.x );
    float r = sqrt( dot( position, position ) );
    vec2 uv;
    uv.x = cos( a ) / r;
    uv.y = sin( a ) / r;
    uv /= 10.0;
    uv += time * 0.05;
    vec3 color = texture2D( colorTexture, uv ).rgb;
    gl_FragColor = vec4( color * r * 1.5, 1.0 );
  }
  `,
  uniforms: {
    time : { value : 1.0 }, 
    colorTexture : { value : null}
  },
};
