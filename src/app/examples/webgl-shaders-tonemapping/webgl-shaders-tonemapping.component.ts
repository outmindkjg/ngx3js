import { Component } from '@angular/core';
import { IRendererInfo, NgxBaseComponent, THREE, I3JS, NgxRendererComponent, NgxMeshComponent } from 'ngx3js';

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
				{ name: 'bloomAmount', type: 'number', min: 0.0, max: 10.0, change : () => { this.changeBloomPass(); } },
				{ name: 'sunLight', type: 'number', min: 0.1, max: 12.0 },
				{ name: 'enabled', type: 'checkbox', change : () => { this.changeAdaptToneMappingPass(); } },
				{ name: 'middleGrey', type: 'number', min: 0.0, max: 12.0, change : () => { this.changeAdaptToneMappingPass(); }  },
				{ name: 'maxLuminance', type: 'number', min: 1.0, max: 30.0, change : () => { this.changeAdaptToneMappingPass(); }  },
				{ name: 'avgLuminance', type: 'number', min: 0.001, max: 2.0, change : () => { this.changeAdaptToneMappingPass(); }  },
				{ name: 'adaptionRate', type: 'number', min: 0.0, max: 10.0, change : () => { this.changeAdaptToneMappingPass(); }  },
			]
			,false , false);
	}

	beforeRender : (info: IRendererInfo) => boolean = null;
	ldrEffectComposer : I3JS.EffectComposer = null;
	dynamicHdrEffectComposer : I3JS.EffectComposer = null;
	hdrEffectComposer : I3JS.EffectComposer = null;
	bloomPass : I3JS.BloomPass = null;
	adaptToneMappingPass : I3JS.AdaptiveToneMappingPass = null;
	hdrToneMappingPass : I3JS.AdaptiveToneMappingPass = null;
	ldrToneMappingPass : I3JS.AdaptiveToneMappingPass = null;
	setRender(ngxRenderer: NgxRendererComponent): void {
		super.setRender(ngxRenderer);
		this.subscribeRefer('renderSize', this.renderer.sizeSubscribe().subscribe(size => {
			this.size = size;
			const windowThirdX = window.innerWidth / 3;
			camera.aspect = windowThirdX / window.innerHeight;
			camera.updateProjectionMatrix();
			this.cameraCube.aspect = windowThirdX / window.innerHeight;
			this.cameraCube.updateProjectionMatrix();

		}))	;
		this.size = ngxRenderer.getSize();
		let quadBG = new THREE.Mesh( new THREE.PlaneGeometry( 0.1, 0.1 ), this.currentLuminanceMat );
		quadBG.position.z = - 500;
		quadBG.position.x = - this.size.x * 0.5 + this.size.x * 0.05;
		quadBG.scale.set( this.size.x, this.size.y, 1 );
		this.debugScene.add( quadBG );

		quadBG = new THREE.Mesh( new THREE.PlaneGeometry( 0.1, 0.1 ), this.adaptiveLuminanceMat );
		quadBG.position.z = - 500;
		quadBG.position.x = - this.size.x * 0.5 + this.size.x * 0.15;
		quadBG.scale.set( this.size.x, this.size.y, 1 );
		this.debugScene.add( quadBG );

		const renderer = this.renderer.renderer as I3JS.WebGL1Renderer;
		const parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, type : THREE.FloatType };
		const regularRenderTarget = new THREE.WebGLRenderTarget( this.size.x / 3, this.size.y, parameters );

		this.ldrEffectComposer = new THREE.EffectComposer( renderer, regularRenderTarget );

		// parameters.type = THREE.FloatType;

		if ( renderer.capabilities.isWebGL2 === false && renderer.extensions.has( 'OES_texture_half_float_linear' ) === false ) {

			parameters.type = undefined; // avoid usage of floating point textures

		}
		const renderInfo = ngxRenderer.getRenderInfo();
		const scene = renderInfo.scenes[0];
		const camera : I3JS.PerspectiveCamera = renderInfo.cameras[0] as any;
		const hdrRenderTarget = new THREE.WebGLRenderTarget( this.size.x / 3, this.size.y, parameters );
		this.dynamicHdrEffectComposer = new THREE.EffectComposer( renderer, hdrRenderTarget );
		this.dynamicHdrEffectComposer.setSize( this.size.x, this.size.y );
		this.hdrEffectComposer = new THREE.EffectComposer( renderer, hdrRenderTarget );

		const debugPass = new THREE.RenderPass( this.debugScene, this.cameraBG );
		debugPass.clear = false;
		const scenePass = new THREE.RenderPass( scene, camera, undefined, undefined, undefined );
		const skyboxPass = new THREE.RenderPass( this.sceneCube, this.cameraCube );
		scenePass.clear = false;

		this.adaptToneMappingPass = new THREE.AdaptiveToneMappingPass( true, 256 );
		this.adaptToneMappingPass.needsSwap = true;
		this.ldrToneMappingPass = new THREE.AdaptiveToneMappingPass( false, 256 );
		this.hdrToneMappingPass = new THREE.AdaptiveToneMappingPass( false, 256 );
		this.bloomPass = new THREE.BloomPass();
		const gammaCorrectionPass = new THREE.ShaderPass( THREE.GammaCorrectionShader );

		this.dynamicHdrEffectComposer.addPass( skyboxPass );
		this.dynamicHdrEffectComposer.addPass( scenePass );
		this.dynamicHdrEffectComposer.addPass( this.adaptToneMappingPass );
		this.dynamicHdrEffectComposer.addPass( this.bloomPass );
		this.dynamicHdrEffectComposer.addPass( gammaCorrectionPass );

		this.hdrEffectComposer.addPass( skyboxPass );
		this.hdrEffectComposer.addPass( scenePass );
		this.hdrEffectComposer.addPass( this.hdrToneMappingPass );
		this.hdrEffectComposer.addPass( this.bloomPass );
		this.hdrEffectComposer.addPass( gammaCorrectionPass );

		this.ldrEffectComposer.addPass( skyboxPass );
		this.ldrEffectComposer.addPass( scenePass );
		this.ldrEffectComposer.addPass( this.ldrToneMappingPass );
		this.ldrEffectComposer.addPass( this.bloomPass );
		this.ldrEffectComposer.addPass( gammaCorrectionPass );
		this.changeBloomPass();
		this.changeAdaptToneMappingPass();
	}

	changeBloomPass() {
		this.bloomPass.copyUniforms[ "opacity" ].value = this.controls.bloomAmount;
	}

	changeAdaptToneMappingPass() {
		const adaptToneMappingPass = this.adaptToneMappingPass;
		adaptToneMappingPass.setAdaptionRate( this.controls.adaptionRate );
		this.adaptiveLuminanceMat.uniforms[ "map" ].value = adaptToneMappingPass.luminanceRT;
		this.currentLuminanceMat.uniforms[ "map" ].value = adaptToneMappingPass.currentLuminanceRT;

		adaptToneMappingPass.enabled = this.controls.enabled;
		adaptToneMappingPass.setMaxLuminance( this.controls.maxLuminance );
		adaptToneMappingPass.setMiddleGrey( this.controls.middleGrey );

		this.hdrToneMappingPass.enabled = this.controls.enabled;
		this.hdrToneMappingPass.setMaxLuminance( this.controls.maxLuminance );
		this.hdrToneMappingPass.setMiddleGrey( this.controls.middleGrey );
		if ( this.hdrToneMappingPass.setAverageLuminance ) {

			this.hdrToneMappingPass.setAverageLuminance( this.controls.avgLuminance );

		}

		this.ldrToneMappingPass.enabled = this.controls.enabled;
		this.ldrToneMappingPass.setMaxLuminance( this.controls.maxLuminance );
		this.ldrToneMappingPass.setMiddleGrey( this.controls.middleGrey );
		if ( this.ldrToneMappingPass.setAverageLuminance ) {

			this.ldrToneMappingPass.setAverageLuminance( this.controls.avgLuminance );

		}		
	}

	size : I3JS.Vector2 = new THREE.Vector2(1024,1024);
	cameraCube : I3JS.PerspectiveCamera = null;
	cameraBG : I3JS.OrthographicCamera = null;
	sceneCube : I3JS.Scene = null;
	debugScene : I3JS.Scene = null;
	adaptiveLuminanceMat : I3JS.ShaderMaterial = null;
	currentLuminanceMat : I3JS.ShaderMaterial = null;
	
	ngOnInit() {
		this.cameraCube = new THREE.PerspectiveCamera( 70, this.size.x / 3 / this.size.y, 1, 100000 );
		this.cameraBG = new THREE.OrthographicCamera( - this.size.x / 2 , this.size.x / 2 , this.size.y / 2 , - this.size.y / 2, - 10000, 10000 );
		this.cameraBG.position.z = 100;
		this.sceneCube = new THREE.Scene();
		this.debugScene = new THREE.Scene();
		const vBGShader = [
			// "attribute vec2 uv;",
			"varying vec2 vUv;",
			"void main() {",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"}"

		].join( "\n" );

		const pBGShader = [

			"uniform sampler2D map;",
			"varying vec2 vUv;",

			"void main() {",

			"vec2 sampleUV = vUv;",
			"vec4 color = texture2D( map, sampleUV, 0.0 );",

			"gl_FragColor = vec4( color.xyz, 1.0 );",

			"}"

		].join( "\n" );

		// Skybox
		this.adaptiveLuminanceMat = new THREE.ShaderMaterial( {
			uniforms: {
				"map": { value: null }
			},
			vertexShader: vBGShader,
			fragmentShader: pBGShader,
			depthTest: false,
			// color: 0xffffff
			blending: THREE.NoBlending
		} );

		this.currentLuminanceMat = new THREE.ShaderMaterial( {
			uniforms: {
				"map": { value: null }
			},
			vertexShader: vBGShader,
			fragmentShader: pBGShader,
			depthTest: false
			// color: 0xffffff
			// blending: THREE.NoBlending
		} );


		this.beforeRender = (info: IRendererInfo) => {
			const camera = info.cameras[0];
			const scene = info.scenes[0];
			const renderer = info.renderer as I3JS.WebGL1Renderer;
			camera.lookAt( scene.position );
			this.cameraCube.rotation.copy( camera.rotation );
			renderer.setViewport( 0, 0, this.size.x / 3 , this.size.y );
			this.ldrEffectComposer.render( 0.017 );
			renderer.setViewport( this.size.x / 3, 0, this.size.x / 3, this.size.y );
			this.hdrEffectComposer.render( 0.017 );
			renderer.setViewport( this.size.x / 3 * 2, 0, this.size.x / 3, this.size.y );
			this.dynamicHdrEffectComposer.render( 0.017 );
			return true;
		}
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
			THREE.ShaderChunk[ "common" ],
			THREE.ShaderChunk[ "bsdfs" ],
			THREE.ShaderChunk[ "lights_pars_begin" ],
			THREE.ShaderChunk[ "normal_pars_fragment" ],
			THREE.ShaderChunk[ "lights_phong_pars_fragment" ],

			"void main() {",
			"vec3 normal = normalize( -vNormal );",
			"vec3 viewPosition = normalize( vViewPosition );",
			"#if NUM_DIR_LIGHTS > 0",

			"vec3 dirDiffuse = vec3( 0.0 );",

			"for( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {",

			"vec4 lDirection = viewMatrix * vec4( directionalLights[i].direction, 0.0 );",
			"vec3 dirVector = normalize( lDirection.xyz );",
			"float dotProduct = dot( viewPosition, dirVector );",
			"dotProduct = 1.0 * max( dotProduct, 0.0 ) + (1.0 - max( -dot( normal, dirVector ), 0.0 ));",
			"dotProduct *= dotProduct;",
			"dirDiffuse += max( 0.5 * dotProduct, 0.0 ) * directionalLights[i].color;",
			"}",
			"#endif",

			//Fade out atmosphere at edge
			"float viewDot = abs(dot( normal, viewPosition ));",
			"viewDot = clamp( pow( viewDot + 0.6, 10.0 ), 0.0, 1.0);",

			"vec3 color = vec3( 0.05, 0.09, 0.13 ) * dirDiffuse;",
			"gl_FragColor = vec4( color, viewDot );",

			"}"
		].join('\n');
	}

	setSphereAtmoMesh(ngxMesh : NgxMeshComponent) {
		const mesh : I3JS.Mesh = ngxMesh.getMesh();
		const earthAtmoMat = new THREE.ShaderMaterial( {
			side : THREE.BackSide,
			transparent : true,
			lights : true,
			uniforms : this.uniforms,
			vertexShader : this.vertexShader,
			fragmentShader : this.fragmentShader
		} );
		mesh.material = earthAtmoMat;
	}
	uniforms: any = null;

	vertexShader: string = '';
	fragmentShader: string = '';
}
