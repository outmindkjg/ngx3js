import { Component } from '@angular/core';
import { I3JS, IRendererInfo, IRendererTimer, NgxBaseComponent, NgxMeshComponent, NgxSceneComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-shadow-contact',
	templateUrl: './webgl-shadow-contact.component.html',
	styleUrls: ['./webgl-shadow-contact.component.scss'],
})
export class WebglShadowContactComponent extends NgxBaseComponent<{
	shadow: {
		blur: number;
		darkness: number;
		opacity: number;
	};
	plane: {
		color: string;
		opacity: number;
	};
	showWireframe: boolean;
}> {
	constructor() {
		super(
			{
				shadow: {
					blur: 3.5,
					darkness: 1,
					opacity: 1,
				},
				plane: {
					color: '#ffffff',
					opacity: 1,
				},
				showWireframe: false,
			},
			[
				{
					name: 'shadow',
					type: 'folder',
					control: 'shadow',
					children: [
						{ name: 'blur', type: 'number', min: 0, max: 15, step: 0.1 },
						{ name: 'darkness', type: 'number', min: 1, max: 5, step: 0.1 ,change : () => {
							this.depthMaterial.userData.darkness.value = this.controls.shadow.darkness;
						} },
						{ name: 'opacity', type: 'number', min: 0, max: 1, step: 0.01 },
					],
					isOpen: true,
				},

				{
					name: 'plane',
					type: 'folder',
					control: 'plane',
					children: [
						{ name: 'color', type: 'color' },
						{ name: 'opacity', type: 'number', min: 0, max: 1, step: 0.01 },
					],
					isOpen: true,
				},
				{ name: 'showWireframe', type: 'checkbox', change : () => {
					if (this.controls.showWireframe) {
						this.sceneObject3d.add(this.cameraHelper);
					} else {
						this.sceneObject3d.remove(this.cameraHelper);
					}
				} },
			],
			false,
			false
		);
	}

	renderTarget: I3JS.WebGLRenderTarget = null;
	renderTargetBlur: I3JS.WebGLRenderTarget = null;
	depthMaterial : I3JS.MeshDepthMaterial = null;
	beforeRender : (info: IRendererInfo) => boolean = null;
	ngOnInit(): void {
		const PLANE_WIDTH = 2.5;
		const PLANE_HEIGHT = 2.5;
		const CAMERA_HEIGHT = 0.3;
		this.shadowCamera = new THREE.OrthographicCamera( - PLANE_WIDTH / 2, PLANE_WIDTH / 2, PLANE_HEIGHT / 2, - PLANE_HEIGHT / 2, 0, CAMERA_HEIGHT );
		this.shadowCamera.rotation.x = Math.PI / 2; // get the camera to look up
		this.cameraHelper = new THREE.CameraHelper(this.shadowCamera);
		// the render target that will show the shadows in the plane texture
		this.renderTarget = new THREE.WebGLRenderTarget(512, 512);
		this.renderTarget.texture.generateMipmaps = false;

		// the render target that we will use to blur the first render target
		this.renderTargetBlur = new THREE.WebGLRenderTarget(512, 512);
		this.renderTargetBlur.texture.generateMipmaps = false;

		const depthMaterial = new THREE.MeshDepthMaterial();
		depthMaterial.userData.darkness = { value: this.controls.shadow.darkness };
		depthMaterial.onBeforeCompile = function ( shader ) {
			shader.uniforms.darkness = depthMaterial.userData.darkness;
			shader.fragmentShader = /* glsl */`
				uniform float darkness;
				${shader.fragmentShader.replace(
			'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
			'gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );'
		)}
			`;

		};

		depthMaterial.depthTest = false;
		depthMaterial.depthWrite = false;
		this.depthMaterial = depthMaterial;

		this.horizontalBlurMaterial = new THREE.ShaderMaterial( THREE.HorizontalBlurShader );
		this.horizontalBlurMaterial.depthTest = false;

		this.verticalBlurMaterial = new THREE.ShaderMaterial( THREE.VerticalBlurShader );
		this.verticalBlurMaterial.depthTest = false;

		this.beforeRender = (info: IRendererInfo) => {
			const scene = info.scenes[0];
			const camera = info.cameras[0];
			const renderer = info.renderer as I3JS.WebGL1Renderer;
			const initialBackground = scene.background;
			const renderTarget = this.renderTarget;
			const cameraHelper = this.cameraHelper;
			const shadowCamera = this.shadowCamera;
			scene.background = null;

			// force the depthMaterial to everything
			cameraHelper.visible = false;
			scene.overrideMaterial = depthMaterial;

			// render to the render target to get the depths
			renderer.setRenderTarget( renderTarget );
			renderer.render( scene, shadowCamera );

			// and reset the override material
			scene.overrideMaterial = null;
			cameraHelper.visible = true;

			this.blurShadow(renderer, this.controls.shadow.blur );

			// a second pass to reduce the artifacts
			// (0.4 is the minimum blur amout so that the artifacts are gone)
			this.blurShadow(renderer, this.controls.shadow.blur * 0.4 );

			// reset and render the normal scene
			renderer.setRenderTarget( null );
			scene.background = initialBackground;

			renderer.render( scene, camera );

			return true;
		}
	}
	
	setPlaneMesh(mesh : NgxMeshComponent, type : string) {
		switch(type) {
			case 'blur' :
				this.blurPlane = mesh.getMesh();
				break;
			case 'fill' :
				break;
			case 'plane' :
				break;
		}
	}

	cameraHelper : I3JS.CameraHelper = null;
	blurPlane : I3JS.Mesh = null;
	horizontalBlurMaterial : I3JS.ShaderMaterial = null;
	shadowCamera : I3JS.OrthographicCamera = null;
	verticalBlurMaterial : I3JS.ShaderMaterial = null;

	blurShadow(renderer :I3JS.WebGL1Renderer,  amount : number) {
		const blurPlane = this.blurPlane;
		const horizontalBlurMaterial = this.horizontalBlurMaterial;
		const renderTargetBlur = this.renderTargetBlur;
		const renderTarget = this.renderTarget;
		const shadowCamera = this.shadowCamera;
		const verticalBlurMaterial = this.verticalBlurMaterial;
		blurPlane.visible = true;
		// blur horizontally and draw in the renderTargetBlur
		blurPlane.material = horizontalBlurMaterial;
		horizontalBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture;
		horizontalBlurMaterial.uniforms.h.value = amount * 1 / 256;

		renderer.setRenderTarget( renderTargetBlur );
		renderer.render( blurPlane, shadowCamera );
		// blur vertically and draw in the main renderTarget
		blurPlane.material = verticalBlurMaterial;
		verticalBlurMaterial.uniforms.tDiffuse.value = renderTargetBlur.texture;
		verticalBlurMaterial.uniforms.v.value = amount * 1 / 256;

		renderer.setRenderTarget( renderTarget );
		renderer.render( blurPlane, shadowCamera );

		blurPlane.visible = false;

	}

	setShadowGroup(mesh : NgxMeshComponent) {
		mesh.getObject3d().add(this.shadowCamera);
	}

	addMeshes(mesh : NgxMeshComponent) {
		const meshObj = mesh.getObject3d();
		if (!this.meshes.includes(meshObj)) {
			this.meshes.push(meshObj);
		}
	}

	meshes : I3JS.Object3D[] = [];

	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		this.meshes.forEach( mesh => {
			mesh.rotation.x += 0.01;
			mesh.rotation.y += 0.02;
		} );
	}
	
}
