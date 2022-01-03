import { Component } from '@angular/core';
import { I3JS, IRendererInfo, N3JS, NgxBaseComponent, NgxThreeUtil } from 'ngx3js';

@Component({
	selector: 'app-webgl-depth-texture',
	templateUrl: './webgl-depth-texture.component.html',
	styleUrls: ['./webgl-depth-texture.component.scss'],
})
export class WebglDepthTextureComponent extends NgxBaseComponent<{
	format: string;
	type: string;
}> {
	constructor() {
		super(
			{
				format: 'Depth',
				type: 'UnsignedShort',
			},
			[
				{ name: 'format', type: 'select', select: ['Depth', 'DepthStencil'], change : () => { this.setupRenderTarget();} },
				{
					name: 'type',
					type: 'select',
					select: ['UnsignedShort', 'UnsignedInt', 'UnsignedInt248'], change : () => { this.setupRenderTarget();}
				},
			]
		, false, false);
	}

	models: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
	}[] = [];

	beforeRender : (info: IRendererInfo) => boolean = null;
	target : I3JS.WebGLRenderTarget = null;

	setupRenderTarget() {
		if ( this.target ) this.target.dispose();
		const format : I3JS.PixelFormat = NgxThreeUtil.getPixelFormatSafe(this.controls.format);
		const type : I3JS.TextureDataType = NgxThreeUtil.getTextureDataTypeSafe(this.controls.type);
		this.target = new N3JS.WebGLRenderTarget( window.innerWidth, window.innerHeight );
		const target = this.target;
		target.texture.format = N3JS.RGBFormat;
		target.texture.minFilter = N3JS.NearestFilter;
		target.texture.magFilter = N3JS.NearestFilter;
		target.texture.generateMipmaps = false;
		target.stencilBuffer = ( format === N3JS.DepthStencilFormat ) ? true : false;
		target.depthBuffer = true;
		target.depthTexture = new N3JS.DepthTexture();
		target.depthTexture.format = format;
		target.depthTexture.type = type;
	}

	postCamera : I3JS.OrthographicCamera = null;
	postMaterial : I3JS.ShaderMaterial = null;
	postScene : I3JS.Scene = null;

	private postVert = `
	varying vec2 vUv;

	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
	`;

	private postFrag = `
	#include <packing>

	varying vec2 vUv;
	uniform sampler2D tDiffuse;
	uniform sampler2D tDepth;
	uniform float cameraNear;
	uniform float cameraFar;


	float readDepth( sampler2D depthSampler, vec2 coord ) {
		float fragCoordZ = texture2D( depthSampler, coord ).x;
		float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
		return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
	}

	void main() {
		//vec3 diffuse = texture2D( tDiffuse, vUv ).rgb;
		float depth = readDepth( tDepth, vUv );

		gl_FragColor.rgb = 1.0 - vec3( depth );
		gl_FragColor.a = 1.0;
	}	
	`;

	setupPost() {
		// Setup post processing stage
		this.postCamera = new N3JS.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
		this.postMaterial = new N3JS.ShaderMaterial( {
			vertexShader: this.postVert.trim(),
			fragmentShader: this.postFrag.trim(),
			uniforms: {
				cameraNear: { value: 0.01 },
				cameraFar: { value: 50 },
				tDiffuse: { value: null },
				tDepth: { value: null }
			}
		} );
		const postPlane = new N3JS.PlaneGeometry( 2, 2 );
		const postQuad = new N3JS.Mesh( postPlane, this.postMaterial );
		this.postScene = new N3JS.Scene();
		this.postScene.add( postQuad );
	}

	ngOnInit() {
		this.setupPost();
		this.setupRenderTarget();
		this.beforeRender = (info: IRendererInfo) => {

			const renderer : I3JS.WebGLRenderer = info.renderer as any;
			renderer.setRenderTarget( this.target );
			renderer.render( info.scenes[0], info.cameras[0] );
			// render post FX
			this.postMaterial.uniforms.tDiffuse.value = this.target.texture;
			this.postMaterial.uniforms.tDepth.value = this.target.depthTexture;

			renderer.setRenderTarget( null );
			renderer.render( this.postScene, this.postCamera );
			return true;
		}
		const count = 50;
		const scale = 5;
		this.models = [];
		for (let i = 0; i < count; i++) {
			const r = Math.random() * 2.0 * Math.PI;
			const z = Math.random() * 2.0 - 1.0;
			const zScale = Math.sqrt(1.0 - z * z) * scale;
			this.models.push({
				position: {
					x: Math.cos(r) * zScale,
					y: Math.sin(r) * zScale,
					z: z * scale,
				},
				rotation: {
					x: (Math.random() / Math.PI) * 180,
					y: (Math.random() / Math.PI) * 180,
					z: (Math.random() / Math.PI) * 180,
				},
			});
		}
	}
}
