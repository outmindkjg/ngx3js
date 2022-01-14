import { Component } from '@angular/core';
import {
	I3JS,
	IRendererEvent,
	IRendererTimer,
	NgxBaseComponent,
	NgxMeshComponent,
	NgxRendererComponent,
	THREE,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-gpgpu-water',
	templateUrl: './webgl-gpgpu-water.component.html',
	styleUrls: ['./webgl-gpgpu-water.component.scss'],
})
export class WebglGpgpuWaterComponent extends NgxBaseComponent<{
	mouseSize: number;
	viscosity: number;
	spheresEnabled: boolean;
	smoothWater: () => void;
}> {
	constructor() {
		super(
			{
				mouseSize: 20.0,
				viscosity: 0.98,
				spheresEnabled: true,
				smoothWater: () => {
					this.smoothWater();
				},
			},
			[
				{
					name: 'mouseSize',
					type: 'number',
					min: 1.0,
					max: 100.0,
					step: 1.0,
					change: () => {
						this.valuesChanger();
					},
				},
				{
					name: 'viscosity',
					type: 'number',
					min: 0.9,
					max: 0.99999,
					step: 0.001,
					change: () => {
						this.valuesChanger();
					},
				},
				{
					name: 'spheresEnabled',
					type: 'checkbox',
					change: () => {
						this.valuesChanger();
					},
				},
				{ name: 'smoothWater', type: 'button' },
			],
			false,
			false
		);
	}

	valuesChanger() {
		if (this.heightmapVariable !== null) {
			const heightmapVariable = this.heightmapVariable;
			heightmapVariable.material.uniforms['mouseSize'].value =
				this.controls.mouseSize;
			heightmapVariable.material.uniforms['viscosityConstant'].value =
				this.controls.viscosity;
			this.spheres.forEach((sphere) => {
				sphere.visible = this.controls.spheresEnabled;
			});
		}
	}

	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.initComputeRenderer();
	}

	isSafari() {
		return (
			!!navigator.userAgent.match(/Safari/i) &&
			!navigator.userAgent.match(/Chrome/i)
		);
	}

	gpuCompute: I3JS.GPUComputationRenderer = null;
	heightmapVariable: I3JS.Variable = null;
	smoothShader: I3JS.ShaderMaterial = null;
	readWaterLevelShader: I3JS.ShaderMaterial = null;
	readWaterLevelImage: Uint8Array = null;
	readWaterLevelRenderTarget: I3JS.WebGLRenderTarget = null;

	simplex: I3JS.SimplexNoise = null;

	initComputeRenderer() {
		const gpuCompute = (this.gpuCompute = new THREE.GPUComputationRenderer(
			this.WIDTH,
			this.WIDTH,
			this.renderer.renderer as any
		));

		if (this.isSafari()) {
			gpuCompute.setDataType(THREE.HalfFloatType);
		}

		const heightmap0 = gpuCompute.createTexture();

		this.fillTexture(heightmap0);

		const heightmapVariable = (this.heightmapVariable = gpuCompute.addVariable(
			'heightmap',
			this.heightmapFragmentShader,
			heightmap0
		));

		gpuCompute.setVariableDependencies(heightmapVariable, [heightmapVariable]);

		heightmapVariable.material.uniforms['mousePos'] = {
			value: new THREE.Vector2(10000, 10000),
		};
		heightmapVariable.material.uniforms['mouseSize'] = { value: 20.0 };
		heightmapVariable.material.uniforms['viscosityConstant'] = { value: 0.98 };
		heightmapVariable.material.uniforms['heightCompensation'] = { value: 0 };
		heightmapVariable.material.defines.BOUNDS = this.BOUNDS.toFixed(1);

		const error = gpuCompute.init();
		if (error !== null) {
			console.error(error);
		}

		this.smoothShader = gpuCompute.createShaderMaterial(
			this.smoothFragmentShader,
			{ smoothTexture: { value: null } }
		);

		// Create compute shader to read water level
		this.readWaterLevelShader = gpuCompute.createShaderMaterial(
			this.readWaterLevelFragmentShader,
			{
				point1: { value: new THREE.Vector2() },
				levelTexture: { value: null },
			}
		);
		this.readWaterLevelShader.defines.WIDTH = this.WIDTH.toFixed(1);
		this.readWaterLevelShader.defines.BOUNDS = this.BOUNDS.toFixed(1);

		// Create a 4x1 pixel image and a render target (Uint8, 4 channels, 1 byte per channel) to read water height and orientation
		this.readWaterLevelImage = new Uint8Array(4 * 1 * 4);

		this.readWaterLevelRenderTarget = new THREE.WebGLRenderTarget(4, 1, {
			wrapS: THREE.ClampToEdgeWrapping,
			wrapT: THREE.ClampToEdgeWrapping,
			minFilter: THREE.NearestFilter,
			magFilter: THREE.NearestFilter,
			format: THREE.RGBAFormat,
			type: THREE.UnsignedByteType,
			depthBuffer: false,
		});
	}

	fillTexture(texture) {
		const waterMaxHeight = 10;

		const noise = (x, y) => {
			let multR = waterMaxHeight;
			let mult = 0.025;
			let r = 0;
			for (let i = 0; i < 15; i++) {
				r += multR * this.simplex.noise(x * mult, y * mult);
				multR *= 0.53 + 0.025 * i;
				mult *= 1.25;
			}

			return r;
		};

		const pixels = texture.image.data;

		let p = 0;
		for (let j = 0; j < this.WIDTH; j++) {
			for (let i = 0; i < this.WIDTH; i++) {
				const x = (i * 128) / this.WIDTH;
				const y = (j * 128) / this.WIDTH;

				pixels[p + 0] = noise(x, y);
				pixels[p + 1] = pixels[p + 0];
				pixels[p + 2] = 0;
				pixels[p + 3] = 1;

				p += 4;
			}
		}
	}

	smoothWater() {
		const gpuCompute = this.gpuCompute;
		const heightmapVariable = this.heightmapVariable;
		const smoothShader = this.smoothShader;

		const currentRenderTarget =
			gpuCompute.getCurrentRenderTarget(heightmapVariable);
		const alternateRenderTarget =
			gpuCompute.getAlternateRenderTarget(heightmapVariable);

		for (let i = 0; i < 10; i++) {
			smoothShader.uniforms['smoothTexture'].value =
				currentRenderTarget.texture;
			gpuCompute.doRenderTarget(smoothShader, alternateRenderTarget);

			smoothShader.uniforms['smoothTexture'].value =
				alternateRenderTarget.texture;
			gpuCompute.doRenderTarget(smoothShader, currentRenderTarget);
		}
	}

	ngOnInit(): void {
		this.waterUniforms = THREE.UniformsUtils.merge([
			THREE.ShaderLib['phong'].uniforms,
			{
				heightmap: { value: null },
			},
		]);
		this.waterFragmentShader = THREE.ShaderChunk.meshphong_frag;
		this.waterUniforms['diffuse'].value = new THREE.Color(0x0040c0);
		this.waterUniforms['specular'].value = new THREE.Color(0x111111);
		this.waterUniforms['shininess'].value = Math.max(50, 1e-4);
		this.waterUniforms['opacity'].value = 1;
		this.simplex = new THREE.SimplexNoise();
		this.createSpheres(5);
	}
	waterFragmentShader: string = null;
	waterUniforms: any = null;

	WIDTH: number = 128;
	BOUNDS: number = 512;
	BOUNDS_HALF: number = this.BOUNDS * 0.5;

	heightmapFragmentShader = `
	#include <common>

	uniform vec2 mousePos;
	uniform float mouseSize;
	uniform float viscosityConstant;
	uniform float heightCompensation;

	void main()	{

		vec2 cellSize = 1.0 / resolution.xy;

		vec2 uv = gl_FragCoord.xy * cellSize;

		// heightmapValue.x == height from previous frame
		// heightmapValue.y == height from penultimate frame
		// heightmapValue.z, heightmapValue.w not used
		vec4 heightmapValue = texture2D( heightmap, uv );

		// Get neighbours
		vec4 north = texture2D( heightmap, uv + vec2( 0.0, cellSize.y ) );
		vec4 south = texture2D( heightmap, uv + vec2( 0.0, - cellSize.y ) );
		vec4 east = texture2D( heightmap, uv + vec2( cellSize.x, 0.0 ) );
		vec4 west = texture2D( heightmap, uv + vec2( - cellSize.x, 0.0 ) );

		// https://web.archive.org/web/20080618181901/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm

		float newHeight = ( ( north.x + south.x + east.x + west.x ) * 0.5 - heightmapValue.y ) * viscosityConstant;

		// Mouse influence
		float mousePhase = clamp( length( ( uv - vec2( 0.5 ) ) * BOUNDS - vec2( mousePos.x, - mousePos.y ) ) * PI / mouseSize, 0.0, PI );
		newHeight += ( cos( mousePhase ) + 1.0 ) * 0.28;

		heightmapValue.y = heightmapValue.x;
		heightmapValue.x = newHeight;

		gl_FragColor = heightmapValue;

	}	
	`;

	smoothFragmentShader = `
	uniform sampler2D smoothTexture;

	void main()	{

		vec2 cellSize = 1.0 / resolution.xy;

		vec2 uv = gl_FragCoord.xy * cellSize;

		// Computes the mean of texel and 4 neighbours
		vec4 textureValue = texture2D( smoothTexture, uv );
		textureValue += texture2D( smoothTexture, uv + vec2( 0.0, cellSize.y ) );
		textureValue += texture2D( smoothTexture, uv + vec2( 0.0, - cellSize.y ) );
		textureValue += texture2D( smoothTexture, uv + vec2( cellSize.x, 0.0 ) );
		textureValue += texture2D( smoothTexture, uv + vec2( - cellSize.x, 0.0 ) );

		textureValue /= 5.0;

		gl_FragColor = textureValue;

	}
	`;

	readWaterLevelFragmentShader = `
	uniform vec2 point1;

	uniform sampler2D levelTexture;

	// Integer to float conversion from https://stackoverflow.com/questions/17981163/webgl-read-pixels-from-floating-point-render-target

	float shift_right( float v, float amt ) {

		v = floor( v ) + 0.5;
		return floor( v / exp2( amt ) );

	}

	float shift_left( float v, float amt ) {

		return floor( v * exp2( amt ) + 0.5 );

	}

	float mask_last( float v, float bits ) {

		return mod( v, shift_left( 1.0, bits ) );

	}

	float extract_bits( float num, float from, float to ) {

		from = floor( from + 0.5 ); to = floor( to + 0.5 );
		return mask_last( shift_right( num, from ), to - from );

	}

	vec4 encode_float( float val ) {
		if ( val == 0.0 ) return vec4( 0, 0, 0, 0 );
		float sign = val > 0.0 ? 0.0 : 1.0;
		val = abs( val );
		float exponent = floor( log2( val ) );
		float biased_exponent = exponent + 127.0;
		float fraction = ( ( val / exp2( exponent ) ) - 1.0 ) * 8388608.0;
		float t = biased_exponent / 2.0;
		float last_bit_of_biased_exponent = fract( t ) * 2.0;
		float remaining_bits_of_biased_exponent = floor( t );
		float byte4 = extract_bits( fraction, 0.0, 8.0 ) / 255.0;
		float byte3 = extract_bits( fraction, 8.0, 16.0 ) / 255.0;
		float byte2 = ( last_bit_of_biased_exponent * 128.0 + extract_bits( fraction, 16.0, 23.0 ) ) / 255.0;
		float byte1 = ( sign * 128.0 + remaining_bits_of_biased_exponent ) / 255.0;
		return vec4( byte4, byte3, byte2, byte1 );
	}

	void main()	{

		vec2 cellSize = 1.0 / resolution.xy;

		float waterLevel = texture2D( levelTexture, point1 ).x;

		vec2 normal = vec2(
			( texture2D( levelTexture, point1 + vec2( - cellSize.x, 0 ) ).x - texture2D( levelTexture, point1 + vec2( cellSize.x, 0 ) ).x ) * WIDTH / BOUNDS,
			( texture2D( levelTexture, point1 + vec2( 0, - cellSize.y ) ).x - texture2D( levelTexture, point1 + vec2( 0, cellSize.y ) ).x ) * WIDTH / BOUNDS );

		if ( gl_FragCoord.x < 1.5 ) {

			gl_FragColor = encode_float( waterLevel );

		} else if ( gl_FragCoord.x < 2.5 ) {

			gl_FragColor = encode_float( normal.x );

		} else if ( gl_FragCoord.x < 3.5 ) {

			gl_FragColor = encode_float( normal.y );

		} else {

			gl_FragColor = encode_float( 0.0 );

		}

	}
	`;

	waterVertexShader = `
	uniform sampler2D heightmap;

	#define PHONG

	varying vec3 vViewPosition;

	#ifndef FLAT_SHADED

		varying vec3 vNormal;

	#endif

	#include <common>
	#include <uv_pars_vertex>
	#include <uv2_pars_vertex>
	#include <displacementmap_pars_vertex>
	#include <envmap_pars_vertex>
	#include <color_pars_vertex>
	#include <morphtarget_pars_vertex>
	#include <skinning_pars_vertex>
	#include <shadowmap_pars_vertex>
	#include <logdepthbuf_pars_vertex>
	#include <clipping_planes_pars_vertex>

	void main() {

		vec2 cellSize = vec2( 1.0 / WIDTH, 1.0 / WIDTH );

		#include <uv_vertex>
		#include <uv2_vertex>
		#include <color_vertex>

		// # include <beginnormal_vertex>
		// Compute normal from heightmap
		vec3 objectNormal = vec3(
			( texture2D( heightmap, uv + vec2( - cellSize.x, 0 ) ).x - texture2D( heightmap, uv + vec2( cellSize.x, 0 ) ).x ) * WIDTH / BOUNDS,
			( texture2D( heightmap, uv + vec2( 0, - cellSize.y ) ).x - texture2D( heightmap, uv + vec2( 0, cellSize.y ) ).x ) * WIDTH / BOUNDS,
			1.0 );
		//<beginnormal_vertex>

		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>

	#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

		vNormal = normalize( transformedNormal );

	#endif

		//# include <begin_vertex>
		float heightValue = texture2D( heightmap, uv ).x;
		vec3 transformed = vec3( position.x, position.y, heightValue );
		//<begin_vertex>

		#include <morphtarget_vertex>
		#include <skinning_vertex>
		#include <displacementmap_vertex>
		#include <project_vertex>
		#include <logdepthbuf_vertex>
		#include <clipping_planes_vertex>

		vViewPosition = - mvPosition.xyz;

		#include <worldpos_vertex>
		#include <envmap_vertex>
		#include <shadowmap_vertex>

	}	
	`;

	setMeshRay(mesh: NgxMeshComponent) {
		this.meshRay = mesh.getObject3d();
	}

	meshRay: I3JS.Object3D = null;
	private mouseMoved: boolean = false;
	onPointerMove(event: IRendererEvent) {
		if (
			this.camera !== null &&
			this.meshRay !== null &&
			this.heightmapVariable !== null
		) {
			switch (event.type) {
				case 'keydown':
					switch (event.keyInfo.code) {
						case 'KeyW' :
							if (this.meshObject3d?.material) {
								const waterMesh = this.meshObject3d.material as I3JS.ShaderMaterial;
								waterMesh.wireframe = ! waterMesh.wireframe;
								waterMesh.needsUpdate = true;
							}
							break;
						default :
							break;
					}
					break;
				case 'pointermove' :
				default:
					const uniforms = this.heightmapVariable.material.uniforms;
					const intersects = this.camera.getIntersections(
						event.mouse,
						this.meshRay
					);
					if (intersects.length > 0) {
						const point = intersects[0].point;
						uniforms['mousePos'].value.set(point.x, point.z);
					} else {
						uniforms['mousePos'].value.set(10000, 10000);
					}
					if (!this.mouseMoved) {
						this.getTimeout().then(() => {
							if (this.mouseMoved) {
								this.mouseMoved = false;
								uniforms['mousePos'].value.set(10000, 10000);
							}
						});
					}
					this.mouseMoved = true;
					break;
			}
		}
	}

	createSpheres(NUM_SPHERES: number) {
		this.sphereInfos = [];
		this.spheres = [];
		for (let i = 0; i < NUM_SPHERES; i++) {
			this.sphereInfos.push({
				x: (Math.random() - 0.5) * this.BOUNDS * 0.7,
				y: 0,
				z: (Math.random() - 0.5) * this.BOUNDS * 0.7,
				velocity: new THREE.Vector3(),
			});
		}
	}

	setSpheres(mesh: NgxMeshComponent) {
		this.spheres = mesh.getObject3d().children as I3JS.Mesh[];
	}

	sphereInfos: { x: number; y: number; z: number; velocity: I3JS.Vector3 }[] =
		[];

	private spheres: I3JS.Mesh[] = [];
	private waterNormal = new THREE.Vector3();
	sphereDynamics() {
		const currentRenderTarget = this.gpuCompute.getCurrentRenderTarget(
			this.heightmapVariable
		);
		this.readWaterLevelShader.uniforms['levelTexture'].value =
			currentRenderTarget.texture;
		const BOUNDS_HALF = this.BOUNDS_HALF;
		const readWaterLevelShader = this.readWaterLevelShader;
		const readWaterLevelRenderTarget = this.readWaterLevelRenderTarget;
		const gpuCompute = this.gpuCompute;
		const readWaterLevelImage = this.readWaterLevelImage;
		const renderer = this.renderer.renderer as I3JS.WebGL1Renderer;
		const waterNormal = this.waterNormal;
		this.spheres.forEach((sphere) => {
			if (sphere) {
				// Read water level and orientation
				const u = (0.5 * sphere.position.x) / BOUNDS_HALF + 0.5;
				const v = 1 - ((0.5 * sphere.position.z) / BOUNDS_HALF + 0.5);
				readWaterLevelShader.uniforms['point1'].value.set(u, v);
				gpuCompute.doRenderTarget(
					readWaterLevelShader,
					readWaterLevelRenderTarget
				);

				renderer.readRenderTargetPixels(
					readWaterLevelRenderTarget,
					0,
					0,
					4,
					1,
					readWaterLevelImage
				);
				const pixels = new Float32Array(readWaterLevelImage.buffer);

				// Get orientation
				waterNormal.set(pixels[1], 0, -pixels[2]);

				const pos = sphere.position;

				// Set height
				pos.y = pixels[0];

				// Move sphere
				waterNormal.multiplyScalar(0.1);
				sphere.userData.velocity.add(waterNormal);
				sphere.userData.velocity.multiplyScalar(0.998);
				pos.add(sphere.userData.velocity);

				if (pos.x < -BOUNDS_HALF) {
					pos.x = -BOUNDS_HALF + 0.001;
					sphere.userData.velocity.x *= -0.3;
				} else if (pos.x > BOUNDS_HALF) {
					pos.x = BOUNDS_HALF - 0.001;
					sphere.userData.velocity.x *= -0.3;
				}

				if (pos.z < -BOUNDS_HALF) {
					pos.z = -BOUNDS_HALF + 0.001;
					sphere.userData.velocity.z *= -0.3;
				} else if (pos.z > BOUNDS_HALF) {
					pos.z = BOUNDS_HALF - 0.001;
					sphere.userData.velocity.z *= -0.3;
				}
			}
		});
	}

	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		if (
			this.gpuCompute !== null &&
			this.heightmapVariable !== null &&
			this.waterUniforms !== null
		) {
			const gpuCompute = this.gpuCompute;
			// Do the gpu computation
			gpuCompute.compute();

			if (this.controls.spheresEnabled) {
				this.sphereDynamics();
			}

			// Get compute output in custom uniform
			this.waterUniforms['heightmap'].value = gpuCompute.getCurrentRenderTarget(
				this.heightmapVariable
			).texture;
		}
	}
}
