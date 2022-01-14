import { Component } from '@angular/core';
import {
	NgxBaseComponent,
	THREE,
	I3JS,
	IRendererTimer,
	NgxRendererComponent,
	NgxMeshComponent,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-gpgpu-protoplanet',
	templateUrl: './webgl-gpgpu-protoplanet.component.html',
	styleUrls: ['./webgl-gpgpu-protoplanet.component.scss'],
})
export class WebglGpgpuProtoplanetComponent extends NgxBaseComponent<{
	gravityConstant: number;
	density: number;
	radius: number;
	height: number;
	exponent: number;
	maxMass: number;
	velocity: number;
	velocityExponent: number;
	randVelocity: number;
	restartSimulation: () => void;
}> {
	constructor() {
		super(
			{
				gravityConstant: 100.0,
				density: 0.45,
				radius: 300,
				height: 8,
				exponent: 0.4,
				maxMass: 15.0,
				velocity: 70,
				velocityExponent: 0.2,
				randVelocity: 0.001,
				restartSimulation: () => {
					this.restartSimulation();
				},
			},
			[
				{
					type: 'folder',
					name: 'Dynamic parameters',
					isOpen: true,
					children: [
						{
							type: 'number',
							name: 'gravityConstant',
							min: 0.0,
							max: 1000.0,
							step: 0.05,
							change: () => {
								this.dynamicValuesChanger();
							},
						},
						{
							type: 'number',
							name: 'density',
							min: 0.0,
							max: 10.0,
							step: 0.001,
							change: () => {
								this.dynamicValuesChanger();
							},
						},
					],
				},
				{
					type: 'folder',
					name: 'Static parameters',
					isOpen: true,
					children: [
						{
							type: 'number',
							name: 'radius',
							min: 10.0,
							max: 1000.0,
							step: 1.0,
						},
						{ type: 'number', name: 'height', min: 0.0, max: 50.0, step: 0.01 },
						{
							type: 'number',
							name: 'exponent',
							min: 0.0,
							max: 2.0,
							step: 0.001,
						},
						{ type: 'number', name: 'maxMass', min: 1.0, max: 50.0, step: 0.1 },
						{
							type: 'number',
							name: 'velocity',
							min: 0.0,
							max: 150.0,
							step: 0.1,
						},
						{
							type: 'number',
							name: 'velocityExponent',
							min: 0.0,
							max: 1.0,
							step: 0.01,
						},
						{
							type: 'number',
							name: 'randVelocity',
							min: 0.0,
							max: 50.0,
							step: 0.1,
						},
						{ type: 'button', name: 'restartSimulation' },
					],
				},
			],
			false,
			false
		);
	}

	dynamicValuesChanger() {
		this.velocityUniforms['gravityConstant'].value =
			this.controls.gravityConstant;
		this.velocityUniforms['density'].value = this.controls.density;
		this.particleUniforms['density'].value = this.controls.density;
	}

	restartSimulation() {
		if (this.gpuCompute !== null && this.positionVariable !== null) {
			const dtPosition = this.gpuCompute.createTexture();
			const dtVelocity = this.gpuCompute.createTexture();

			this.fillTextures(dtPosition, dtVelocity);

			this.gpuCompute.renderTexture(
				dtPosition,
				this.positionVariable.renderTargets[0]
			);
			this.gpuCompute.renderTexture(
				dtPosition,
				this.positionVariable.renderTargets[1]
			);
			this.gpuCompute.renderTexture(
				dtVelocity,
				this.velocityVariable.renderTargets[0]
			);
			this.gpuCompute.renderTexture(
				dtVelocity,
				this.velocityVariable.renderTargets[1]
			);
		}
	}

	ngOnInit(): void {
		const isIE = /Trident/i.test(navigator.userAgent);
		const isEdge = /Edge/i.test(navigator.userAgent);

		// Texture width for simulation (each texel is a debris particle)
		this.WIDTH = isIE || isEdge ? 4 : 64;
		this.PARTICLES = this.WIDTH * this.WIDTH;
		this.initProtoplanets();
	}

	WIDTH: number = 54;
	PARTICLES: number = 54;

	gpuCompute: I3JS.GPUComputationRenderer = null;
	velocityVariable: I3JS.Variable = null;
	positionVariable: I3JS.Variable = null;
	velocityUniforms: any = null;

	particleUniforms : {
		texturePosition: any,
		textureVelocity: any,
		cameraConstant: any,
		density: any,
	};

	isSafari(): boolean {
		return (
			!!navigator.userAgent.match(/Safari/i) &&
			!navigator.userAgent.match(/Chrome/i)
		);
	}

	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.subscribeRefer(
			'redererSize',
			this.renderer.sizeSubscribe().subscribe(() => {
				this.onWindowResize();
			})
		);
		this.initComputeRenderer();
	}

	setMesh(mesh: NgxMeshComponent): void {
		super.setMesh(mesh);
		this.meshObject3d.updateMatrix();
		this.dynamicValuesChanger();
		this.getTimeout().then(() => {
			this.restartSimulation();
		})
	}

	initComputeRenderer() {
		const gpuCompute = (this.gpuCompute = new THREE.GPUComputationRenderer(
			this.WIDTH,
			this.WIDTH,
			this.renderer.renderer as I3JS.WebGL1Renderer
		));
		if (this.isSafari()) {
			gpuCompute.setDataType(THREE.HalfFloatType);
		}
		const dtPosition = gpuCompute.createTexture();
		const dtVelocity = gpuCompute.createTexture();
		this.fillTextures(dtPosition, dtVelocity);
		this.velocityVariable = gpuCompute.addVariable(
			'textureVelocity',
			this.computeShaderVelocity,
			dtVelocity
		);
		this.positionVariable = gpuCompute.addVariable(
			'texturePosition',
			this.computeShaderPosition,
			dtPosition
		);

		gpuCompute.setVariableDependencies(this.velocityVariable, [
			this.positionVariable,
			this.velocityVariable,
		]);
		gpuCompute.setVariableDependencies(this.positionVariable, [
			this.positionVariable,
			this.velocityVariable,
		]);

		this.velocityUniforms = this.velocityVariable.material.uniforms;

		this.velocityUniforms['gravityConstant'] = { value: 0.0 };
		this.velocityUniforms['density'] = { value: 0.0 };
		const error = gpuCompute.init();

		if (error !== null) {
			console.error(error);
		}
	}

	getCameraConstant(camera: I3JS.PerspectiveCamera) {
		return (
			window.innerHeight /
			(Math.tan(THREE.MathUtils.DEG2RAD * 0.5 * camera.fov) / camera.zoom)
		);
	}

	onWindowResize() {
		this.particleUniforms['cameraConstant'].value = this.getCameraConstant(
			this.cameraObject3d as I3JS.PerspectiveCamera
		);

		console.log(this.particleUniforms);
	}

	fillTextures(
		texturePosition: I3JS.DataTexture,
		textureVelocity: I3JS.DataTexture
	) {
		const posArray = texturePosition.image.data;
		const velArray = textureVelocity.image.data;

		const radius = this.controls.radius;
		const height = this.controls.height;
		const exponent = this.controls.exponent;
		const maxMass = (this.controls.maxMass * 1024) / this.PARTICLES;
		const maxVel = this.controls.velocity;
		const velExponent = this.controls.velocityExponent;
		const randVel = this.controls.randVelocity;

		for (let k = 0, kl = posArray.length; k < kl; k += 4) {
			let x, z, rr;
			do {
				x = Math.random() * 2 - 1;
				z = Math.random() * 2 - 1;
				rr = x * x + z * z;
			} while (rr > 1);
			rr = Math.sqrt(rr);
			const rExp = radius * Math.pow(rr, exponent);
			// Velocity
			const vel = maxVel * Math.pow(rr, velExponent);
			const vx = vel * z + (Math.random() * 2 - 1) * randVel;
			const vy = (Math.random() * 2 - 1) * randVel * 0.05;
			const vz = -vel * x + (Math.random() * 2 - 1) * randVel;
			x *= rExp;
			z *= rExp;
			const y = (Math.random() * 2 - 1) * height;
			const mass = Math.random() * maxMass + 1;
			// Fill in texture values
			posArray[k + 0] = x;
			posArray[k + 1] = y;
			posArray[k + 2] = z;
			posArray[k + 3] = 1;

			velArray[k + 0] = vx;
			velArray[k + 1] = vy;
			velArray[k + 2] = vz;
			velArray[k + 3] = mass;
		}
	}

	attrPosition: I3JS.BufferAttribute = null;
	attrUv: I3JS.BufferAttribute = null;

	initProtoplanets() {
		const positions = new Float32Array(this.PARTICLES * 3);
		let p = 0;

		for (let i = 0; i < this.PARTICLES; i++) {
			positions[p++] = (Math.random() * 2 - 1) * this.controls.radius;
			positions[p++] = 0; //( Math.random() * 2 - 1 ) * effectController.radius;
			positions[p++] = (Math.random() * 2 - 1) * this.controls.radius;
		}

		const uvs = new Float32Array(this.PARTICLES * 2);
		p = 0;
		const WIDTH = this.WIDTH;

		for (let j = 0; j < WIDTH; j++) {
			for (let i = 0; i < WIDTH; i++) {
				uvs[p++] = i / (WIDTH - 1);
				uvs[p++] = j / (WIDTH - 1);
			}
		}

		this.attrPosition = new THREE.BufferAttribute(positions, 3);
		this.attrUv = new THREE.BufferAttribute(uvs, 2);

		this.particleUniforms = {
			texturePosition: { value: null },
			textureVelocity: { value: null },
			cameraConstant: { value: null },
			density: { value: 0.0 },
		};
	}

	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		if (
			this.gpuCompute !== null &&
			this.positionVariable !== null &&
			this.velocityVariable !== null
		) {
			this.gpuCompute.compute();
			this.particleUniforms['texturePosition'].value =
				this.gpuCompute.getCurrentRenderTarget(this.positionVariable).texture;
			this.particleUniforms['textureVelocity'].value =
				this.gpuCompute.getCurrentRenderTarget(this.velocityVariable).texture;
		}
	}

	computeShaderPosition = `
	#define delta ( 1.0 / 60.0 )

	void main() {

		vec2 uv = gl_FragCoord.xy / resolution.xy;

		vec4 tmpPos = texture2D( texturePosition, uv );
		vec3 pos = tmpPos.xyz;

		vec4 tmpVel = texture2D( textureVelocity, uv );
		vec3 vel = tmpVel.xyz;
		float mass = tmpVel.w;

		if ( mass == 0.0 ) {
			vel = vec3( 0.0 );
		}

		// Dynamics
		pos += vel * delta;

		gl_FragColor = vec4( pos, 1.0 );

	}

	`;

	computeShaderVelocity = `
	// For PI declaration:
	#include <common>

	#define delta ( 1.0 / 60.0 )

	uniform float gravityConstant;
	uniform float density;

	const float width = resolution.x;
	const float height = resolution.y;

	float radiusFromMass( float mass ) {
		// Calculate radius of a sphere from mass and density
		return pow( ( 3.0 / ( 4.0 * PI ) ) * mass / density, 1.0 / 3.0 );
	}

	void main()	{

		vec2 uv = gl_FragCoord.xy / resolution.xy;
		float idParticle = uv.y * resolution.x + uv.x;

		vec4 tmpPos = texture2D( texturePosition, uv );
		vec3 pos = tmpPos.xyz;

		vec4 tmpVel = texture2D( textureVelocity, uv );
		vec3 vel = tmpVel.xyz;
		float mass = tmpVel.w;

		if ( mass > 0.0 ) {

			float radius = radiusFromMass( mass );

			vec3 acceleration = vec3( 0.0 );

			// Gravity interaction
			for ( float y = 0.0; y < height; y++ ) {

				for ( float x = 0.0; x < width; x++ ) {

					vec2 secondParticleCoords = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
					vec3 pos2 = texture2D( texturePosition, secondParticleCoords ).xyz;
					vec4 velTemp2 = texture2D( textureVelocity, secondParticleCoords );
					vec3 vel2 = velTemp2.xyz;
					float mass2 = velTemp2.w;

					float idParticle2 = secondParticleCoords.y * resolution.x + secondParticleCoords.x;

					if ( idParticle == idParticle2 ) {
						continue;
					}

					if ( mass2 == 0.0 ) {
						continue;
					}

					vec3 dPos = pos2 - pos;
					float distance = length( dPos );
					float radius2 = radiusFromMass( mass2 );

					if ( distance == 0.0 ) {
						continue;
					}

					// Checks collision

					if ( distance < radius + radius2 ) {

						if ( idParticle < idParticle2 ) {

							// This particle is aggregated by the other
							vel = ( vel * mass + vel2 * mass2 ) / ( mass + mass2 );
							mass += mass2;
							radius = radiusFromMass( mass );

						}
						else {

							// This particle dies
							mass = 0.0;
							radius = 0.0;
							vel = vec3( 0.0 );
							break;

						}

					}

					float distanceSq = distance * distance;

					float gravityField = gravityConstant * mass2 / distanceSq;

					gravityField = min( gravityField, 1000.0 );

					acceleration += gravityField * normalize( dPos );

				}

				if ( mass == 0.0 ) {
					break;
				}
			}

			// Dynamics
			vel += delta * acceleration;

		}

		gl_FragColor = vec4( vel, mass );

	}
	`;

	particleVertexShader = `
	// For PI declaration:
	#include <common>

	uniform sampler2D texturePosition;
	uniform sampler2D textureVelocity;

	uniform float cameraConstant;
	uniform float density;

	varying vec4 vColor;

	float radiusFromMass( float mass ) {
		// Calculate radius of a sphere from mass and density
		return pow( ( 3.0 / ( 4.0 * PI ) ) * mass / density, 1.0 / 3.0 );
	}


	void main() {


		vec4 posTemp = texture2D( texturePosition, uv );
		vec3 pos = posTemp.xyz;

		vec4 velTemp = texture2D( textureVelocity, uv );
		vec3 vel = velTemp.xyz;
		float mass = velTemp.w;

		vColor = vec4( 1.0, mass / 250.0, 0.0, 1.0 );

		vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );

		// Calculate radius of a sphere from mass and density
		//float radius = pow( ( 3.0 / ( 4.0 * PI ) ) * mass / density, 1.0 / 3.0 );
		float radius = radiusFromMass( mass );

		// Apparent size in pixels
		if ( mass == 0.0 ) {
			gl_PointSize = 0.0;
		}
		else {
			gl_PointSize = radius * cameraConstant / ( - mvPosition.z );
		}

		gl_Position = projectionMatrix * mvPosition;

	}
	`;

	particleFragmentShader = `
	varying vec4 vColor;

	void main() {

		if ( vColor.y == 0.0 ) discard;

		float f = length( gl_PointCoord - vec2( 0.5, 0.5 ) );
		if ( f > 0.5 ) {
			discard;
		}
		gl_FragColor = vColor;

	}
	`;
}
