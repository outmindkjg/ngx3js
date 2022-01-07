import { Component } from '@angular/core';
import {
	I3JS,
	THREE,
	NgxBaseComponent,
	NgxMeshComponent,
	IRendererTimer,
	CameraUtils,
	NgxSceneComponent,
	IRendererInfo,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-portal',
	templateUrl: './webgl-portal.component.html',
	styleUrls: ['./webgl-portal.component.scss'],
})
export class WebglPortalComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	leftPortalTexture: I3JS.WebGLRenderTarget = null;
	rightPortalTexture: I3JS.WebGLRenderTarget = null;
	bottomLeftCorner = new THREE.Vector3();
	bottomRightCorner = new THREE.Vector3();
	topLeftCorner = new THREE.Vector3();
	reflectedPosition = new THREE.Vector3();
	portalCamera: I3JS.PerspectiveCamera = null;
	beforeRender: (info: IRendererInfo) => boolean;
	portalPlane:I3JS.Plane = null;
	
	ngOnInit(): void {
		this.portalPlane = new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 0.0 );
		this.portalCamera = new THREE.PerspectiveCamera(45, 1.0, 0.1, 500.0);
		this.leftPortalTexture = new THREE.WebGLRenderTarget(256, 256, {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBFormat,
		});
		this.rightPortalTexture = new THREE.WebGLRenderTarget(256, 256, {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBFormat,
		});
		this.beforeRender = (info: IRendererInfo): boolean => {
			if (this.leftPortal !== null && this.rightPortal !== null && this.cameraObject3d !== null) {
				const renderer = info.renderer as I3JS.WebGL1Renderer;
				const scene = info.scenes[0];
				const camera = info.cameras[0];
				const currentRenderTarget = renderer.getRenderTarget();
				const currentXrEnabled = renderer.xr.enabled;
				const currentShadowAutoUpdate = renderer.shadowMap.autoUpdate;

				renderer.xr.enabled = false; // Avoid camera modification
				renderer.shadowMap.autoUpdate = false; // Avoid re-computing shadows

				// render the portal effect
				this.renderPortal(
					renderer,
					scene,
					this.leftPortal,
					this.rightPortal,
					this.leftPortalTexture
				);
				this.renderPortal(
					renderer,
					scene,
					this.rightPortal,
					this.leftPortal,
					this.rightPortalTexture
				);

				// restore the original rendering properties
				renderer.xr.enabled = currentXrEnabled;
				renderer.shadowMap.autoUpdate = currentShadowAutoUpdate;
				renderer.setRenderTarget(currentRenderTarget);

				// render the main scene
				renderer.render(scene, camera);
				return true;
			} else {
				return false;
			}
		};
	}

	setScene(scene: NgxSceneComponent): void {
		super.setScene(scene);
		this.sceneObject3d.add(this.portalCamera);
	}

	leftPortal: I3JS.Object3D = null;
	rightPortal: I3JS.Object3D = null;

	setPortal(mesh: NgxMeshComponent, type: string): void {
		switch (type) {
			case 'left':
				this.leftPortal = mesh.getObject3d();
				break;
			case 'right':
				this.rightPortal = mesh.getObject3d();
				break;
		}
	}

	renderPortal(
		renderer: I3JS.WebGL1Renderer,
		scene: I3JS.Scene,
		thisPortalMesh: I3JS.Object3D,
		otherPortalMesh: I3JS.Object3D,
		thisPortalTexture: I3JS.WebGLRenderTarget
	) {
		const bottomLeftCorner = this.bottomLeftCorner;
		const bottomRightCorner = this.bottomRightCorner;
		const topLeftCorner = this.topLeftCorner;
		const reflectedPosition = this.reflectedPosition;
		const camera = this.cameraObject3d;
		const portalCamera = this.portalCamera;

		// set the portal camera position to be reflected about the portal plane
		thisPortalMesh.worldToLocal(reflectedPosition.copy(camera.position));
		reflectedPosition.x *= -1.0;
		reflectedPosition.z *= -1.0;
		otherPortalMesh.localToWorld(reflectedPosition);
		portalCamera.position.copy(reflectedPosition);

		// grab the corners of the other portal
		// - note: the portal is viewed backwards; flip the left/right coordinates
		otherPortalMesh.localToWorld(bottomLeftCorner.set(50.05, -50.05, 0.0));
		otherPortalMesh.localToWorld(bottomRightCorner.set(-50.05, -50.05, 0.0));
		otherPortalMesh.localToWorld(topLeftCorner.set(50.05, 50.05, 0.0));
		// set the projection matrix to encompass the portal's frame
		CameraUtils.frameCorners(
			portalCamera,
			bottomLeftCorner,
			bottomRightCorner,
			topLeftCorner,
			false
		);

		// render the portal
		thisPortalTexture.texture.encoding = renderer.outputEncoding;
		renderer.setRenderTarget(thisPortalTexture);
		renderer.state.buffers.depth.setMask(true); // make sure the depth buffer is writable so it can be properly cleared, see #18897
		if (renderer.autoClear === false) renderer.clear();
		thisPortalMesh.visible = false; // hide this portal from its own rendering
		renderer.render(scene, portalCamera);
		thisPortalMesh.visible = true; // re-enable this portal's visibility for general rendering
	}

	smallSphereOne: I3JS.Object3D = null;
	setSmallSphereOne(mesh: NgxMeshComponent) {
		this.smallSphereOne = mesh.getObject3d();
	}
	smallSphereTwo: I3JS.Object3D = null;
	setSmallSphereTwo(mesh: NgxMeshComponent) {
		this.smallSphereTwo = mesh.getObject3d();
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.smallSphereOne !== null && this.smallSphereTwo !== null) {
			const timerOne = timer.elapsedTime * 1000 * 0.01;
			const timerTwo = timerOne + Math.PI * 10.0;
			const smallSphereOne = this.smallSphereOne;
			const smallSphereTwo = this.smallSphereTwo;

			smallSphereOne.position.set(
				Math.cos(timerOne * 0.1) * 30,
				Math.abs(Math.cos(timerOne * 0.2)) * 20 + 5,
				Math.sin(timerOne * 0.1) * 30
			);
			smallSphereOne.rotation.y = Math.PI / 2 - timerOne * 0.1;
			smallSphereOne.rotation.z = timerOne * 0.8;

			smallSphereTwo.position.set(
				Math.cos(timerTwo * 0.1) * 30,
				Math.abs(Math.cos(timerTwo * 0.2)) * 20 + 5,
				Math.sin(timerTwo * 0.1) * 30
			);
			smallSphereTwo.rotation.y = Math.PI / 2 - timerTwo * 0.1;
			smallSphereTwo.rotation.z = timerTwo * 0.8;
		}
	}
}
