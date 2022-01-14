import { Component } from '@angular/core';
import { I3JS, IRendererInfo, NgxBaseComponent, NgxMeshComponent, NgxRendererComponent, NgxSceneComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-tiled-forward',
	templateUrl: './webgl-tiled-forward.component.html',
	styleUrls: ['./webgl-tiled-forward.component.scss'],
})
export class WebglTiledForwardComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	private org_lights_pars_begin : string = null;
	private lights_fragment_end : string = null;
	
	ngOnDestroy(): void {
		super.ngOnDestroy();
		THREE.ShaderChunk[ 'lights_pars_begin' ] = this.org_lights_pars_begin;
		THREE.ShaderChunk[ 'lights_fragment_end' ] = this.lights_fragment_end;
	}

	ngOnInit() {
		this.org_lights_pars_begin = THREE.ShaderChunk[ 'lights_pars_begin' ];
		this.lights_fragment_end = THREE.ShaderChunk[ 'lights_fragment_end' ];
		
		THREE.ShaderChunk[ 'lights_pars_begin' ] += [
			'',
			'#if defined TILED_FORWARD',
			'uniform vec4 tileData;',
			'uniform sampler2D tileTexture;',
			'uniform sampler2D lightTexture;',
			'#endif'
		].join( '\n' );

		THREE.ShaderChunk[ 'lights_fragment_end' ] += [
			'',
			'#if defined TILED_FORWARD',
			'vec2 tUv = floor(gl_FragCoord.xy / tileData.xy * 32.) / 32. + tileData.zw;',
			'vec4 tile = texture2D(tileTexture, tUv);',
			'for (int i=0; i < 4; i++) {',
			'	float tileVal = tile.x * 255.;',
			'  	tile.xyzw = tile.yzwx;',
			'	if(tileVal == 0.){ continue; }',
			'  	float tileDiv = 128.;',
			'	for (int j=0; j < 8; j++) {',
			'  		if (tileVal < tileDiv) {  tileDiv *= 0.5; continue; }',
			'		tileVal -= tileDiv;',
			'		tileDiv *= 0.5;',
			'  		PointLight pointlight;',
			'		float uvx = (float(8 * i + j) + 0.5) / 32.;',
			'  		vec4 lightData = texture2D(lightTexture, vec2(uvx, 0.));',
			'  		vec4 lightColor = texture2D(lightTexture, vec2(uvx, 1.));',
			'  		pointlight.position = lightData.xyz;',
			'  		pointlight.distance = lightData.w;',
			'  		pointlight.color = lightColor.rgb;',
			'  		pointlight.decay = lightColor.a;',
			'  		getPointLightInfo( pointlight, geometry, directLight );',
			'		RE_Direct( directLight, geometry, material, reflectedLight );',
			'	}',
			'}',
			'#endif'
		].join( '\n' );

		this.headInfos = [];
		const heads = [
			{ type: 'physical', uniforms: { "diffuse": 0x888888, "metalness": 1.0, "roughness": 0.66 }, defines: {} },
			{ type: 'standard', uniforms: { "diffuse": 0x666666, "metalness": 0.1, "roughness": 0.33 }, defines: {} },
			{ type: 'phong', uniforms: { "diffuse": 0x777777, "shininess": 20 }, defines: {} },
			{ type: 'phong', uniforms: { "diffuse": 0x555555, "shininess": 10 }, defines: { TOON: 1 } }
		];
		const tIndex = Math.round( Math.random() * 3 );
		this.headInfos = [];
		const State = this.State;
		const RADIUS = this.RADIUS;
		heads.forEach((conf, index) => {
			const ml = THREE.ShaderLib[ conf.type ];
			const uniforms = THREE.UniformsUtils.clone( ml.uniforms );

			uniforms[ "opacity" ].value = tIndex === index ? 0.9 : 1;
			uniforms[ "tileData" ] = State.tileData;
			uniforms[ "tileTexture" ] = State.tileTexture;
			uniforms[ "lightTexture" ] = State.lightTexture;
			for ( const u in conf.uniforms ) {
				const vu = conf.uniforms[ u ];
				if ( uniforms[ u ].value.set ) {
					uniforms[ u ].value.set( vu );
				} else {
					uniforms[ u ].value = vu;
				}
			}
			const defines = conf.defines;
			defines[ 'TILED_FORWARD' ] = 1;
			const lightInfos : {
				color : string;
				userData : {
					color: I3JS.Color;
					radius: number;
					decay: number;
					sy: number;
					sr: number;
					sc: number;
					py: number;
					pr: number;
					pc: number;
					dir: number;
				}
			}[] = [];
			for ( let i = 0; i < 8; i ++ ) {
				const color = new THREE.Color().setHSL( Math.random(), 1.0, 0.5 );
				lightInfos.push({
					color : '0x' + color.getHexString(),
					userData : {
						color: color,
						radius: RADIUS,
						decay: 1,
						sy: Math.random(),
						sr: Math.random(),
						sc: Math.random(),
						py: Math.random() * Math.PI,
						pr: Math.random() * Math.PI,
						pc: Math.random() * Math.PI,
						dir: Math.random() > 0.5 ? 1 : - 1
					}
				})
			}
			this.headInfos.push({
				lights: true,
				fragmentShader: ml.fragmentShader,
				vertexShader: ml.vertexShader,
				uniforms: uniforms,
				defines: defines,
				transparent: tIndex === index ? true : false,
				side : tIndex === index ? 'FrontSide' : 'DoubleSide',
				rotationY : index * 180 / 2,
				positionX : Math.sin( index * Math.PI / 2 ) * RADIUS,
				positionZ : Math.cos( index * Math.PI / 2 ) * RADIUS,
				lightInfos : lightInfos	
			})
		});
		const bloom = this.bloom = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 0.8, 0.6, 0.8 );
		bloom.renderToScreen = true;
		this.beforeRender = (info: IRendererInfo) => {
			const camera = info.cameras[0];
			const scene = info.scenes[0];
			this.update(info.timer.elapsedTime);
			const renderer = info.renderer as I3JS.WebGL1Renderer;
			renderer.setRenderTarget( this.renderTarget );
			renderer.render( scene, camera );
			return true;
		}

	}
	update( now ) {
		this.lights.forEach(( l ) => {
			const ld = l.userData;
			const radius = 0.8 + 0.2 * Math.sin( ld.pr + ( 0.6 + 0.3 * ld.sr ) * now );
			l.position.x = ( Math.sin( ld.pc + ( 0.8 + 0.2 * ld.sc ) * now * ld.dir ) ) * radius * this.RADIUS;
			l.position.z = ( Math.cos( ld.pc + ( 0.8 + 0.2 * ld.sc ) * now * ld.dir ) ) * radius * this.RADIUS;
			l.position.y = Math.sin( ld.py + ( 0.8 + 0.2 * ld.sy ) * now ) * radius * 32;
		} );
	}

	RADIUS : number = 75;

	bloom : I3JS.UnrealBloomPass = null;
	renderTarget : I3JS.WebGLRenderTarget = new THREE.WebGLRenderTarget();
	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.subscribeRefer('renderSize',
			this.renderer.sizeSubscribe().subscribe(size => {
				this.renderTarget.setSize( window.innerWidth, window.innerHeight );
				this.bloom.setSize( window.innerWidth, window.innerHeight );
				this.resizeTiles(size);
			})
		);
	}

	beforeRender : (info: IRendererInfo) => boolean = null;

	setScene(scene: NgxSceneComponent): void {
		super.setScene(scene);
		this.sceneObject3d.onBeforeRender = this.tileLights;
		this.sceneObject3d.onAfterRender = (renderer) => {
			this.bloom.render( renderer, null, this.renderTarget, undefined, undefined );
		};
	}

	setLights(mesh : NgxMeshComponent) {
		mesh.getObject3d().children.forEach(light => {
			if (!this.lights.includes(light)) {
				this.lights.push(light);
			}
		});
	}

	lights : any[] = [];

	tileLights = ( renderer, scene, camera ) => {

		if ( ! camera.projectionMatrix ) return;
		const State = this.State;
		const d = State.tileTexture.value.image.data;
		const ld = State.lightTexture.value.image.data;

		const viewMatrix = camera.matrixWorldInverse;

		d.fill( 0 );

		const vector = new THREE.Vector3();
		this.lights.forEach( ( light, index ) => {

			vector.setFromMatrixPosition( light.matrixWorld );

			const bs = this.lightBounds( camera, vector, light.userData.radius );

			vector.applyMatrix4( viewMatrix );
			vector.toArray( ld, 4 * index );
			ld[ 4 * index + 3 ] = light.userData.radius;
			light.userData.color.toArray( ld, 32 * 4 + 4 * index );
			ld[ 32 * 4 + 4 * index + 3 ] = light.userData.decay;

			if ( bs[ 1 ] < 0 || bs[ 0 ] > State.width || bs[ 3 ] < 0 || bs[ 2 ] > State.height ) return;
			if ( bs[ 0 ] < 0 ) bs[ 0 ] = 0;
			if ( bs[ 1 ] > State.width ) bs[ 1 ] = State.width;
			if ( bs[ 2 ] < 0 ) bs[ 2 ] = 0;
			if ( bs[ 3 ] > State.height ) bs[ 3 ] = State.height;

			const i4 = Math.floor( index / 8 ), i8 = 7 - ( index % 8 );

			for ( let i = Math.floor( bs[ 2 ] / 32 ); i <= Math.ceil( bs[ 3 ] / 32 ); i ++ ) {

				for ( let j = Math.floor( bs[ 0 ] / 32 ); j <= Math.ceil( bs[ 1 ] / 32 ); j ++ ) {

					d[ ( State.cols * i + j ) * 4 + i4 ] |= 1 << i8;

				}

			}

		} );

		State.tileTexture.value.needsUpdate = true;
		State.lightTexture.value.needsUpdate = true;

	}
	v = new THREE.Vector3();
	lightBounds ( camera, pos, r ) {
		const State = this.State;
		let minX = State.width, maxX = 0, minY = State.height, maxY = 0;
		const hw = State.width / 2, hh = State.height / 2;
		const v = this.v;

		for ( let i = 0; i < 8; i ++ ) {

			v.copy( pos );
			v.x += i & 1 ? r : - r;
			v.y += i & 2 ? r : - r;
			v.z += i & 4 ? r : - r;
			const vector = v.project( camera );
			const x = ( vector.x * hw ) + hw;
			const y = ( vector.y * hh ) + hh;
			minX = Math.min( minX, x );
			maxX = Math.max( maxX, x );
			minY = Math.min( minY, y );
			maxY = Math.max( maxY, y );

		}

		return [ minX, maxX, minY, maxY ];

	};

	resizeTiles(size : I3JS.Vector2) {
		const width = size.x;
		const height = size.y;
		const State = this.State;
		State.width = width;
		State.height = height;
		State.cols = Math.ceil( width / 32 );
		State.rows = Math.ceil( height / 32 );
		State.tileData.value = [ width, height, 0.5 / Math.ceil( width / 32 ), 0.5 / Math.ceil( height / 32 ) ];
		State.tileTexture.value = new THREE.DataTexture( new Uint8Array( State.cols * State.rows * 4 ), State.cols, State.rows );

	}

	State = {
		rows: 0,
		cols: 0,
		width: 0,
		height: 0,
		tileData: { value: null },
		tileTexture: { value: null },
		lightTexture: {
			value: new THREE.DataTexture( new Float32Array( 32 * 2 * 4 ), 32, 2, THREE.RGBAFormat, THREE.FloatType )
		},
	};

	headInfos: {
		lights : boolean;
		fragmentShader: string;
		vertexShader: string;
		uniforms: any;
		defines: any;
		transparent: boolean;
		side : string;
		rotationY : number;
		positionX: number; 
		positionZ: number; 
		lightInfos : {
			color : string;
			userData : {
				color: I3JS.Color;
				radius: number;
				decay: number;
				sy: number;
				sr: number;
				sc: number;
				py: number;
				pr: number;
				pc: number;
				dir: number;
			}
		}[]
	}[] = [];
}
