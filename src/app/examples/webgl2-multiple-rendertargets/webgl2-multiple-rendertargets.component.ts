import { Component } from '@angular/core';
import { IRendererInfo, NgxBaseComponent, WebGL1Renderer, THREE, I3JS } from 'ngx3js';

@Component({
	selector: 'app-webgl2-multiple-rendertargets',
	templateUrl: './webgl2-multiple-rendertargets.component.html',
	styleUrls: ['./webgl2-multiple-rendertargets.component.scss'],
})
export class Webgl2MultipleRendertargetsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
	
	renderTarget : I3JS.WebGLMultipleRenderTargets = null;

	postScene : I3JS.Scene = null;
	postCamera : I3JS.Camera = null;
	ngOnInit(): void {
		const renderTarget = this.renderTarget = new THREE.WebGLMultipleRenderTargets(
			window.innerWidth * window.devicePixelRatio,
			window.innerHeight * window.devicePixelRatio,
			2
		);
		for ( let i = 0, il = renderTarget.texture.length; i < il; i ++ ) {
			renderTarget.texture[ i ].minFilter = THREE.NearestFilter;
			renderTarget.texture[ i ].magFilter = THREE.NearestFilter;
			renderTarget.texture[ i ].type = THREE.FloatType;
		}

		// Name our G-Buffer attachments for debugging

		renderTarget.texture[ 0 ].name = 'diffuse';
		renderTarget.texture[ 1 ].name = 'normal';
		this.postScene = new THREE.Scene();
		this.postCamera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

		this.postScene.add( new THREE.Mesh(
			new THREE.PlaneGeometry( 2, 2 ),
			new THREE.RawShaderMaterial( {
				vertexShader: this.renderVert.trim(),
				fragmentShader: this.renderFrag.trim(),
				uniforms: {
					tDiffuse: { value: renderTarget.texture[ 0 ] },
					tNormal: { value: renderTarget.texture[ 1 ] },
				},
				glslVersion: THREE.GLSL3
			} )
		) );

		this.beforeRender = (info: IRendererInfo) => {
			const renderer = info.renderer as WebGL1Renderer;
			const scene = info.scenes[0];
			const camera = info.cameras[0];
			renderer.setRenderTarget( renderTarget );
			renderer.render( scene, camera );
			// render post FX
			renderer.setRenderTarget( null );
			renderer.render( this.postScene, this.postCamera );
			return true;
		}
	}

	beforeRender : (info: IRendererInfo) => boolean = null;

	renderVert = `
	in vec3 position;
	in vec2 uv;

	out vec2 vUv;

	uniform mat4 modelViewMatrix;
	uniform mat4 projectionMatrix;

	void main() {

		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

	}	
	`;

	renderFrag = `
	precision highp float;
	precision highp int;

	layout(location = 0) out vec4 pc_FragColor;

	in vec2 vUv;

	uniform sampler2D tDiffuse;
	uniform sampler2D tNormal;

	void main() {

		vec3 diffuse = texture( tDiffuse, vUv ).rgb;
		vec3 normal = texture( tNormal, vUv ).rgb;

		pc_FragColor.rgb = mix( diffuse, normal, step( 0.5, vUv.x ) );
		pc_FragColor.a = 1.0;

	}
	`;
}
