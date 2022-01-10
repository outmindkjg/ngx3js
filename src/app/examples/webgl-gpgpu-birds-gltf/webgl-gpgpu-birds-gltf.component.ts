import { Component } from '@angular/core';
import {
	BufferGeometry,
	GPUComputationRenderer,
	IRendererEvent,
	IRendererTimer,
	NgxBaseComponent,
	NgxLocalStorageService,
	NgxMeshComponent,
	NgxRendererComponent,
	THREE,
	I3JS,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-gpgpu-birds-gltf',
	templateUrl: './webgl-gpgpu-birds-gltf.component.html',
	styleUrls: ['./webgl-gpgpu-birds-gltf.component.scss'],
})
export class WebglGpgpuBirdsGltfComponent extends NgxBaseComponent<{
	bird: string;
	separation: number;
	alignment: number;
	cohesion: number;
	size: number;
	count: number;
	freedom: number;
}> {
	constructor(private localStorageService: NgxLocalStorageService) {
		super(
			{
				bird: 'models/gltf/Parrot.glb',
				separation: 20.0,
				alignment: 20.0,
				cohesion: 20.0,
				size: 1,
				count: 64 * 64,
				freedom: 0.75,
			},
			[
				{
					type: 'number',
					name: 'separation',
					min: 0,
					max: 100,
					step: 1.0,
					change: () => {
						this.valuesChanger();
					},
				},
				{
					type: 'number',
					name: 'alignment',
					min: 0,
					max: 100,
					step: 0.001,
					change: () => {
						this.valuesChanger();
					},
				},
				{
					type: 'number',
					name: 'cohesion',
					min: 0,
					max: 100,
					step: 0.025,
					change: () => {
						this.valuesChanger();
					},
				},
				{
					type: 'number',
					name: 'size',
					min: 0,
					max: 1,
					step: 0.025,
					listen: true,
					change: () => {
						this.valuesChanger();
					},
				},
				{
					type: 'number',
					name: 'count',
					min: 0,
					max: 4096,
					step: 1,
					change: () => {
						this.valuesChanger();
					},
				},
				{
					type: 'number',
					name: 'freedom',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.valuesChanger();
					},
				},
			],
			false,
			false
		);
	}

	valuesChanger() {
		this.velocityUniforms['separationDistance'].value =
			this.controls.separation;
		this.velocityUniforms['alignmentDistance'].value = this.controls.alignment;
		this.velocityUniforms['cohesionDistance'].value = this.controls.cohesion;
		this.velocityUniforms['freedomFactor'].value = this.controls.freedom;
		if ( this.materialShader ) {
			this.materialShader.uniforms[ "size" ].value = this.controls.size;
		}
		if (this.bird) {
			this.bird.setDrawRange( 0, this.vertexPerBird * this.controls.count );
		}
	}

	vertexPerBird : number = 0;
	materialShader : any = null;

	fragmentShaderPosition = `
	uniform float time;
	uniform float delta;

	void main()	{

		vec2 uv = gl_FragCoord.xy / resolution.xy;
		vec4 tmpPos = texture2D( texturePosition, uv );
		vec3 position = tmpPos.xyz;
		vec3 velocity = texture2D( textureVelocity, uv ).xyz;

		float phase = tmpPos.w;

		phase = mod( ( phase + delta +
			length( velocity.xz ) * delta * 3. +
			max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );

		gl_FragColor = vec4( position + velocity * delta * 15. , phase );

	}
	`;

	fragmentShaderVelocity = `
	uniform float time;
	uniform float testing;
	uniform float delta; // about 0.016
	uniform float separationDistance; // 20
	uniform float alignmentDistance; // 40
	uniform float cohesionDistance; //
	uniform float freedomFactor;
	uniform vec3 predator;

	const float width = resolution.x;
	const float height = resolution.y;

	const float PI = 3.141592653589793;
	const float PI_2 = PI * 2.0;
	// const float VISION = PI * 0.55;

	float zoneRadius = 40.0;
	float zoneRadiusSquared = 1600.0;

	float separationThresh = 0.45;
	float alignmentThresh = 0.65;

	const float UPPER_BOUNDS = BOUNDS;
	const float LOWER_BOUNDS = -UPPER_BOUNDS;

	const float SPEED_LIMIT = 9.0;

	float rand( vec2 co ){
		return fract( sin( dot( co.xy, vec2(12.9898,78.233) ) ) * 43758.5453 );
	}

	void main() {

		zoneRadius = separationDistance + alignmentDistance + cohesionDistance;
		separationThresh = separationDistance / zoneRadius;
		alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;
		zoneRadiusSquared = zoneRadius * zoneRadius;


		vec2 uv = gl_FragCoord.xy / resolution.xy;
		vec3 birdPosition, birdVelocity;

		vec3 selfPosition = texture2D( texturePosition, uv ).xyz;
		vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;

		float dist;
		vec3 dir; // direction
		float distSquared;

		float separationSquared = separationDistance * separationDistance;
		float cohesionSquared = cohesionDistance * cohesionDistance;

		float f;
		float percent;

		vec3 velocity = selfVelocity;

		float limit = SPEED_LIMIT;

		dir = predator * UPPER_BOUNDS - selfPosition;
		dir.z = 0.;
		// dir.z *= 0.6;
		dist = length( dir );
		distSquared = dist * dist;

		float preyRadius = 150.0;
		float preyRadiusSq = preyRadius * preyRadius;


		// move birds away from predator
		if ( dist < preyRadius ) {

			f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;
			velocity += normalize( dir ) * f;
			limit += 5.0;
		}


		// if (testing == 0.0) {}
		// if ( rand( uv + time ) < freedomFactor ) {}


		// Attract flocks to the center
		vec3 central = vec3( 0., 0., 0. );
		dir = selfPosition - central;
		dist = length( dir );

		dir.y *= 2.5;
		velocity -= normalize( dir ) * delta * 5.;

		for ( float y = 0.0; y < height; y++ ) {
			for ( float x = 0.0; x < width; x++ ) {

				vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
				birdPosition = texture2D( texturePosition, ref ).xyz;

				dir = birdPosition - selfPosition;
				dist = length( dir );

				if ( dist < 0.0001 ) continue;

				distSquared = dist * dist;

				if ( distSquared > zoneRadiusSquared ) continue;

				percent = distSquared / zoneRadiusSquared;

				if ( percent < separationThresh ) { // low

					// Separation - Move apart for comfort
					f = ( separationThresh / percent - 1.0 ) * delta;
					velocity -= normalize( dir ) * f;

				} else if ( percent < alignmentThresh ) { // high

					// Alignment - fly the same direction
					float threshDelta = alignmentThresh - separationThresh;
					float adjustedPercent = ( percent - separationThresh ) / threshDelta;

					birdVelocity = texture2D( textureVelocity, ref ).xyz;

					f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
					velocity += normalize( birdVelocity ) * f;

				} else {

					// Attraction / Cohesion - move closer
					float threshDelta = 1.0 - alignmentThresh;
					float adjustedPercent;
					if( threshDelta == 0. ) adjustedPercent = 1.;
					else adjustedPercent = ( percent - alignmentThresh ) / threshDelta;

					f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;

					velocity += normalize( dir ) * f;

				}

			}

		}

		// this make tends to fly around than down or up
		// if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);

		// Speed Limits
		if ( length( velocity ) > limit ) {
			velocity = normalize( velocity ) * limit;
		}

		gl_FragColor = vec4( velocity, 1.0 );

	}
	`;

	birdUniforms = {
		color: { value: new THREE.Color(0xff2200) },
		texturePosition: { value: null },
		textureVelocity: { value: null },
		time: { value: 1.0 },
		delta: { value: 0.0 },
	};

	ngOnInit() {
		if (Math.random() > 0.5) {
			this.controls.bird = 'models/gltf/Parrot.glb';
		} else {
			this.controls.bird = 'models/gltf/Flamingo.glb';
		}
		this.loadBird();
	}

	backgroundColor: number;

	nextPowerOf2( n : number ) : number {
		return Math.pow( 2, Math.ceil( Math.log( n ) / Math.log( 2 ) ) );
	}

	lerp ( value1 : number, value2 : number, amount : number ) : number {
		amount = Math.max( Math.min( amount, 1 ), 0 );
		return value1 + ( value2 - value1 ) * amount;
	}

	initBirds( ) {
		const effectController = this.controls;
		const m :I3JS.MeshStandardMaterial  = this.meshObject3d.material as any;
		m.onBeforeCompile = ( shader ) => {

			shader.uniforms.texturePosition = { value: null };
			shader.uniforms.textureVelocity = { value: null };
			shader.uniforms.textureAnimation = { value: this.textureAnimation };
			shader.uniforms.time = { value: 1.0 };
			shader.uniforms.size = { value: effectController.size };
			shader.uniforms.delta = { value: 0.0 };

			let token = '#define STANDARD';

			let insert = /* glsl */`
				attribute vec4 reference;
				attribute vec4 seeds;
				attribute vec3 birdColor;
				uniform sampler2D texturePosition;
				uniform sampler2D textureVelocity;
				uniform sampler2D textureAnimation;
				uniform float size;
				uniform float time;
			`;

			shader.vertexShader = shader.vertexShader.replace( token, token + insert );

			token = '#include <begin_vertex>';

			insert = /* glsl */`
				vec4 tmpPos = texture2D( texturePosition, reference.xy );

				vec3 pos = tmpPos.xyz;
				vec3 velocity = normalize(texture2D( textureVelocity, reference.xy ).xyz);
				vec3 aniPos = texture2D( textureAnimation, vec2( reference.z, mod( time + ( seeds.x ) * ( ( 0.0004 + seeds.y / 10000.0) + normalize( velocity ) / 20000.0 ), reference.w ) ) ).xyz;
				vec3 newPosition = position;

				newPosition = mat3( modelMatrix ) * ( newPosition + aniPos );
				newPosition *= size + seeds.y * size * 0.2;

				velocity.z *= -1.;
				float xz = length( velocity.xz );
				float xyz = 1.;
				float x = sqrt( 1. - velocity.y * velocity.y );

				float cosry = velocity.x / xz;
				float sinry = velocity.z / xz;

				float cosrz = x / xyz;
				float sinrz = velocity.y / xyz;

				mat3 maty =  mat3( cosry, 0, -sinry, 0    , 1, 0     , sinry, 0, cosry );
				mat3 matz =  mat3( cosrz , sinrz, 0, -sinrz, cosrz, 0, 0     , 0    , 1 );

				newPosition =  maty * matz * newPosition;
				newPosition += pos;

				vec3 transformed = vec3( newPosition );
			`;

			shader.vertexShader = shader.vertexShader.replace( token, insert );

			this.materialShader = shader;

		};
	}

	loadBird() {
		switch (this.controls.bird) {
			case 'models/gltf/Parrot.glb':
				this.controls.size = 0.2;
				this.backgroundColor = 0xccffff;
				break;
			case 'models/gltf/Flamingo.glb':
				this.controls.size = 0.1;
				this.backgroundColor = 0xffdeff;
				break;
		}
		const birdGeometry = new THREE.BufferGeometry();
		const BIRDS = this.controls.count;
		const WIDTH = 64;
		this.localStorageService.getObject(
			this.controls.bird,
			(
				_: I3JS.Object3D,
				clips?: I3JS.AnimationClip[],
				geometry?: I3JS.BufferGeometry,
				morphTargets?: any,
				source?: any
			) => {
				const gltf = source;
				const animations = gltf.animations;
				const durationAnimation = Math.round( animations[ 0 ].duration * 60 );
				const birdGeo = gltf.scene.children[ 0 ].geometry;
				const morphAttributes = birdGeo.morphAttributes.position;
				const tHeight = this.nextPowerOf2( durationAnimation );
				const tWidth = this.nextPowerOf2( birdGeo.getAttribute( 'position' ).count );
				this.vertexPerBird = birdGeo.getAttribute( 'position' ).count;
				const tData = new Float32Array( 3 * tWidth * tHeight );

				for ( let i = 0; i < tWidth; i ++ ) {

					for ( let j = 0; j < tHeight; j ++ ) {

						const offset = j * tWidth * 3;

						const curMorph = Math.floor( j / durationAnimation * morphAttributes.length );
						const nextMorph = ( Math.floor( j / durationAnimation * morphAttributes.length ) + 1 ) % morphAttributes.length;
						const lerpAmount = j / durationAnimation * morphAttributes.length % 1;

						if ( j < durationAnimation ) {

							let d0, d1;

							d0 = morphAttributes[ curMorph ].array[ i * 3 ];
							d1 = morphAttributes[ nextMorph ].array[ i * 3 ];

							if ( d0 !== undefined && d1 !== undefined ) tData[ offset + i * 3 ] = this.lerp( d0, d1, lerpAmount );

							d0 = morphAttributes[ curMorph ].array[ i * 3 + 1 ];
							d1 = morphAttributes[ nextMorph ].array[ i * 3 + 1 ];

							if ( d0 !== undefined && d1 !== undefined ) tData[ offset + i * 3 + 1 ] = this.lerp( d0, d1, lerpAmount );

							d0 = morphAttributes[ curMorph ].array[ i * 3 + 2 ];
							d1 = morphAttributes[ nextMorph ].array[ i * 3 + 2 ];

							if ( d0 !== undefined && d1 !== undefined ) tData[ offset + i * 3 + 2 ] = this.lerp( d0, d1, lerpAmount );

						}

					}
				}
				this.textureAnimation = new THREE.DataTexture( tData, tWidth, tHeight, THREE.RGBFormat, THREE.FloatType );
				this.textureAnimation.needsUpdate = true;

				const vertices = [], color = [], reference = [], seeds = [], indices = [];
				const totalVertices = birdGeo.getAttribute( 'position' ).count * 3 * BIRDS;
				for ( let i = 0; i < totalVertices; i ++ ) {

					const bIndex = i % ( birdGeo.getAttribute( 'position' ).count * 3 );
					vertices.push( birdGeo.getAttribute( 'position' ).array[ bIndex ] );
					color.push( birdGeo.getAttribute( 'color' ).array[ bIndex ] );

				}

				let r = Math.random();
				for ( let i = 0; i < birdGeo.getAttribute( 'position' ).count * BIRDS; i ++ ) {

					const bIndex = i % ( birdGeo.getAttribute( 'position' ).count );
					const bird = Math.floor( i / birdGeo.getAttribute( 'position' ).count );
					if ( bIndex == 0 ) r = Math.random();
					const j = ~ ~ bird;
					const x = ( j % WIDTH ) / WIDTH;
					const y = ~ ~ ( j / WIDTH ) / WIDTH;
					reference.push( x, y, bIndex / tWidth, durationAnimation / tHeight );
					seeds.push( bird, r, Math.random(), Math.random() );

				}

				for ( let i = 0; i < birdGeo.index.array.length * BIRDS; i ++ ) {

					const offset = Math.floor( i / birdGeo.index.array.length ) * ( birdGeo.getAttribute( 'position' ).count );
					indices.push( birdGeo.index.array[ i % birdGeo.index.array.length ] + offset );

				}

				birdGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
				birdGeometry.setAttribute( 'birdColor', new THREE.BufferAttribute( new Float32Array( color ), 3 ) );
				birdGeometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( color ), 3 ) );
				birdGeometry.setAttribute( 'reference', new THREE.BufferAttribute( new Float32Array( reference ), 4 ) );
				birdGeometry.setAttribute( 'seeds', new THREE.BufferAttribute( new Float32Array( seeds ), 4 ) );

				birdGeometry.setIndex( indices );
				this.bird = birdGeometry;
				this.valuesChanger();
			}
		);
		if (this.renderer !== null) {
			this.initComputeRenderer(this.renderer.renderer);
		}
	}

	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.initComputeRenderer(this.renderer.renderer);
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.initBirds();
	}

	bird: BufferGeometry = null;
	textureAnimation : I3JS.DataTexture = null;

	isSafari(): boolean {
		return (
			!!navigator.userAgent.match(/Safari/i) &&
			!navigator.userAgent.match(/Chrome/i)
		);
	}

	fillPositionTexture(texture) {
		const BOUNDS = 800,
			BOUNDS_HALF = BOUNDS / 2;
		const theArray = texture.image.data;
		for (let k = 0, kl = theArray.length; k < kl; k += 4) {
			const x = Math.random() * BOUNDS - BOUNDS_HALF;
			const y = Math.random() * BOUNDS - BOUNDS_HALF;
			const z = Math.random() * BOUNDS - BOUNDS_HALF;
			theArray[k + 0] = x;
			theArray[k + 1] = y;
			theArray[k + 2] = z;
			theArray[k + 3] = 1;
		}
	}

	fillVelocityTexture(texture) {
		const theArray = texture.image.data;
		for (let k = 0, kl = theArray.length; k < kl; k += 4) {
			const x = Math.random() - 0.5;
			const y = Math.random() - 0.5;
			const z = Math.random() - 0.5;
			theArray[k + 0] = x * 10;
			theArray[k + 1] = y * 10;
			theArray[k + 2] = z * 10;
			theArray[k + 3] = 1;
		}
	}

	initComputeRenderer(renderer: any) {
		const WIDTH = 32;
		const BOUNDS = 800;

		const gpuCompute = new GPUComputationRenderer( WIDTH, WIDTH, renderer );

		if ( this.isSafari() ) {

			gpuCompute.setDataType( THREE.HalfFloatType );

		}

		const dtPosition = gpuCompute.createTexture();
		const dtVelocity = gpuCompute.createTexture();
		this.fillPositionTexture( dtPosition );
		this.fillVelocityTexture( dtVelocity );

		const velocityVariable = gpuCompute.addVariable( "textureVelocity", this.fragmentShaderVelocity, dtVelocity );
		const positionVariable = gpuCompute.addVariable( "texturePosition", this.fragmentShaderPosition, dtPosition );

		gpuCompute.setVariableDependencies( velocityVariable, [ positionVariable, velocityVariable ] );
		gpuCompute.setVariableDependencies( positionVariable, [ positionVariable, velocityVariable ] );

		const positionUniforms = positionVariable.material.uniforms;
		const velocityUniforms = velocityVariable.material.uniforms;

		positionUniforms[ "time" ] = { value: 0.0 };
		positionUniforms[ "delta" ] = { value: 0.0 };
		velocityUniforms[ "time" ] = { value: 1.0 };
		velocityUniforms[ "delta" ] = { value: 0.0 };
		velocityUniforms[ "testing" ] = { value: 1.0 };
		velocityUniforms[ "separationDistance" ] = { value: 1.0 };
		velocityUniforms[ "alignmentDistance" ] = { value: 1.0 };
		velocityUniforms[ "cohesionDistance" ] = { value: 1.0 };
		velocityUniforms[ "freedomFactor" ] = { value: 1.0 };
		velocityUniforms[ "predator" ] = { value: new THREE.Vector3() };
		velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed( 2 );

		velocityVariable.wrapS = THREE.RepeatWrapping;
		velocityVariable.wrapT = THREE.RepeatWrapping;
		positionVariable.wrapS = THREE.RepeatWrapping;
		positionVariable.wrapT = THREE.RepeatWrapping;

		const error = gpuCompute.init();

		if ( error !== null ) {

			console.error( error );

		}

		this.positionUniforms = positionUniforms;
		this.velocityUniforms = velocityUniforms;
		this.gpuCompute = gpuCompute;
		this.positionVariable = positionVariable;
		this.velocityVariable = velocityVariable;
		this.valuesChanger();
	}

	positionUniforms: any = null;
	velocityUniforms: any = null;
	mouseX: number = 0;
	mouseY: number = 0;
	windowHalfX: number = 512;
	windowHalfY: number = 512;
	gpuCompute: any = null;
	positionVariable: any = null;
	velocityVariable: any = null;

	onPointerMove(event: IRendererEvent) {
		this.mouseX = event.client.x - event.width / 2;
		this.mouseY = event.client.y - event.height / 2;
		this.windowHalfX = event.width / 2;
		this.windowHalfY = event.height / 2;
	}

	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		if (this.gpuCompute !== null) {
			const now = timer.elapsedTime;
			const delta = timer.delta;
			this.positionUniforms[ "time" ].value = now;
			this.positionUniforms[ "delta" ].value = delta;
			this.velocityUniforms[ "time" ].value = now;
			this.velocityUniforms[ "delta" ].value = delta;
			if ( this.materialShader ) this.materialShader.uniforms[ "time" ].value = now;
			if ( this.materialShader ) this.materialShader.uniforms[ "delta" ].value = delta;

			this.velocityUniforms[ "predator" ].value.set( 0.5 * this.mouseX / this.windowHalfX, - 0.5 * this.mouseY / this.windowHalfY, 0 );

			this.mouseX = 10000;
			this.mouseY = 10000;

			this.gpuCompute.compute();

			if ( this.materialShader ) this.materialShader.uniforms[ "texturePosition" ].value = this.gpuCompute.getCurrentRenderTarget( this.positionVariable ).texture;
			if ( this.materialShader ) this.materialShader.uniforms[ "textureVelocity" ].value = this.gpuCompute.getCurrentRenderTarget( this.velocityVariable ).texture;
		}
	}
}
