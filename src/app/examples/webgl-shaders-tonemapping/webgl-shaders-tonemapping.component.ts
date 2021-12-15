import { Component } from '@angular/core';
import { NgxBaseComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-shaders-tonemapping',
	templateUrl: './webgl-shaders-tonemapping.component.html',
	styleUrls: ['./webgl-shaders-tonemapping.component.scss'],
})
export class WebglShadersTonemappingComponent extends NgxBaseComponent<{
	bloomAmount: number;
	sunLight: number;
	enabled: boolean;
	avgLuminance: number;
	middleGrey: number;
	maxLuminance: number;
	adaptionRate: number;
}> {
	constructor() {
		super(
			{
				bloomAmount: 1.0,
				sunLight: 4.0,
				enabled: true,
				avgLuminance: 0.7,
				middleGrey: 0.04,
				maxLuminance: 16,
				adaptionRate: 2.0,
			},
			[
				{ name: 'bloomAmount', type: 'number', min: 0.0, max: 10.0 },
				{ name: 'sunLight', type: 'number', min: 0.1, max: 12.0 },
				{ name: 'enabled', type: 'checkbox' },
				{ name: 'middleGrey', type: 'number', min: 0.0, max: 12.0 },
				{ name: 'maxLuminance', type: 'number', min: 1.0, max: 30.0 },
				{ name: 'avgLuminance', type: 'number', min: 0.001, max: 2.0 },
				{ name: 'adaptionRate', type: 'number', min: 0.0, max: 10.0 },
			]
		);
	}

	ngOnInit() {
		this.uniforms = THREE.UniformsUtils.merge([
			THREE.UniformsLib['common'],
			THREE.UniformsLib['lights'],
		]);
		this.vertexShader = [
			'varying vec3 vViewPosition;',
			'varying vec3 vNormal;',
			'void main() {',
			THREE.ShaderChunk['beginnormal_vertex'],
			THREE.ShaderChunk['defaultnormal_vertex'],
			'	vNormal = normalize( transformedNormal );',
			'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
			'vViewPosition = -mvPosition.xyz;',
			'gl_Position = projectionMatrix * mvPosition;',
			'}',
		].join('\n');
		this.fragmentShader = [
			THREE.ShaderChunk['common'],
			THREE.ShaderChunk['bsdfs'],
			THREE.ShaderChunk['lights_pars_begin'],
			THREE.ShaderChunk['lights_phong_pars_fragment'],

			'void main() {',
			'vec3 normal = normalize( -vNormal );',
			'vec3 viewPosition = normalize( vViewPosition );',
			'#if NUM_DIR_LIGHTS > 0',

			'vec3 dirDiffuse = vec3( 0.0 );',

			'for( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {',

			'vec4 lDirection = viewMatrix * vec4( directionalLights[i].direction, 0.0 );',
			'vec3 dirVector = normalize( lDirection.xyz );',
			'float dotProduct = dot( viewPosition, dirVector );',
			'dotProduct = 1.0 * max( dotProduct, 0.0 ) + (1.0 - max( -dot( normal, dirVector ), 0.0 ));',
			'dotProduct *= dotProduct;',
			'dirDiffuse += max( 0.5 * dotProduct, 0.0 ) * directionalLights[i].color;',
			'}',
			'#endif',

			//Fade out atmosphere at edge
			'float viewDot = abs(dot( normal, viewPosition ));',
			'viewDot = clamp( pow( viewDot + 0.6, 10.0 ), 0.0, 1.0);',

			'vec3 color = vec3( 0.05, 0.09, 0.13 ) * dirDiffuse;',
			'gl_FragColor = vec4( color, viewDot );',

			'}',
		].join('\n');
	}

	uniforms: any = null;

	vertexShader: string = '';
	fragmentShader: string = '';
}
