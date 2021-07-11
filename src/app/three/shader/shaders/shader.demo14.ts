import * as THREE from 'three';
export const ShaderDemo14 = {
  vertexShader: `
	out vec2 vUv;
	void main()
	{
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
  `,
  fragmentShader: `
	precision highp sampler2DArray;
	precision mediump float;
	in vec2 vUv;
	uniform sampler2DArray uTexture;
	uniform int uDepth;
	uniform float uIntensity;
	void main()
	{
		float voxel = texture(uTexture, vec3( vUv, uDepth )).r;
		gl_FragColor.r = voxel * uIntensity;
	}
  `,
  uniforms : {
    uTexture: { value: null },
    uDepth: { value: 55 },
    uIntensity: { value: 1.0 }
  }
};
