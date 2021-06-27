import * as THREE from 'three';
export const ShaderDemo5 = {
  vertexShader: `
  in int textureIndex;
  flat out int vIndex; // "flat" indicates that the value will not be interpolated (required for integer attributes)
  out vec2 vUv;
  void main()	{
    vIndex = textureIndex;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,
  fragmentShader: `
  flat in int vIndex;
  in vec2 vUv;
  uniform sampler2D uTextures[ 3 ];
  out vec4 outColor;
  void main()	{
    if ( vIndex == 0 ) outColor = texture( uTextures[ 0 ], vUv );
    else if ( vIndex == 1 ) outColor = texture( uTextures[ 1 ], vUv );
    else if ( vIndex == 2 ) outColor = texture( uTextures[ 2 ], vUv );
  }
  `,
  uniforms: {
    uTextures : { value : []}
  },
};
