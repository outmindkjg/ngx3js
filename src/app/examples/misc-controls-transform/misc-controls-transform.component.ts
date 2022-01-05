import { Component } from '@angular/core';
import {
	NgxBaseComponent,
	NgxControlComponent,
	NgxMeshComponent,
	NgxRendererComponent,
	IRendererEvent,
	THREE,
} from 'ngx3js';

@Component({
	selector: 'app-misc-controls-transform',
	templateUrl: './misc-controls-transform.component.html',
	styleUrls: ['./misc-controls-transform.component.scss'],
})
export class MiscControlsTransformComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	onUpPosition = new THREE.Vector2();
	onDownPosition = new THREE.Vector2();

	transformControl: NgxControlComponent = null;

	setRender(renderer: NgxRendererComponent) {
		super.setRender(renderer);
		this.setOrbitControl(renderer.getRenderControl());
	}

	setTransformControl(transformControl: NgxControlComponent) {
		this.transformControl = transformControl;
		if (this.meshObject3d !== null) {
			this.transformControl.getControl().attach(this.meshObject3d);
		}
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		if (this.transformControl !== null) {
			this.transformControl.getControl().attach(this.meshObject3d);
		}
	}

	orbitControl: NgxControlComponent = null;

	setOrbitControl(orbitControl: NgxControlComponent) {
		this.orbitControl = orbitControl;
	}

	setTransformEventListener(event: { type: string; event: any }) {
		if (this.orbitControl !== null) {
			switch (event.type) {
				case 'dragging-changed':
					const controls = this.orbitControl.getControl();
					controls.enabled = !event.event.value;
					break;
				case 'objectChange':
					break;
			}
		}
	}

	setEventListener(event: IRendererEvent) {
		if (this.transformControl !== null) {
			const control = this.transformControl.getControl();
			switch (event.type) {
				case 'keydown':
					switch (event.event.keyCode) {
						case 81: // Q
							control.setSpace(control.space === 'local' ? 'world' : 'local');
							break;
						case 16: // Shift
							control.setTranslationSnap(100);
							control.setRotationSnap(THREE.MathUtils.degToRad(15));
							control.setScaleSnap(0.25);
							break;
						case 87: // W
							control.setMode('translate');
							break;
						case 69: // E
							control.setMode('rotate');
							break;
						case 82: // R
							control.setMode('scale');
							break;
						case 67: // C
							this.cameraInfo.x = this.cameraObject3d.position.x;
							this.cameraInfo.y = this.cameraObject3d.position.y;
							this.cameraInfo.z = this.cameraObject3d.position.z;
							this.cameraInfo.type = (this.cameraInfo.type === 'PerspectiveCamera') ? 'OrthographicCamera' : 'PerspectiveCamera';
							break;
						case 86: // V
							this.cameraInfo.x = this.cameraObject3d.position.x;
							this.cameraInfo.y = this.cameraObject3d.position.y;
							this.cameraInfo.z = this.cameraObject3d.position.z;
							const randomFoV = Math.random() + 0.1;
							const randomZoom = Math.random() + 0.1;
							this.cameraInfo.fov = randomFoV * 160;
							this.cameraInfo.left = -randomFoV  * 2;
							this.cameraInfo.right = randomFoV * 2;
							this.cameraInfo.top = randomFoV * 2;
							this.cameraInfo.bottom = - randomFoV  * 2;
							this.cameraInfo.zoom = randomZoom;
							break;
						case 187:
						case 107: // +, =, num+
							control.setSize(control.size + 0.1);
							break;
						case 189:
						case 109: // -, _, num-
							control.setSize(Math.max(control.size - 0.1, 0.1));
							break;
						case 88: // X
							control.showX = !control.showX;
							break;
						case 89: // Y
							control.showY = !control.showY;
							break;
						case 90: // Z
							control.showZ = !control.showZ;
							break;
						case 32: // Spacebar
							control.enabled = !control.enabled;
							break;
						case 27: // Esc
							control.reset();
							break;
					}
					break;
				case 'keyup':
					control.setTranslationSnap(null);
					control.setRotationSnap(null);
					control.setScaleSnap(null);
					break;
				default:
					break;
			}
		}
	}

	cameraInfo : {
		type : string;
		fov : number;
		left : number;
		right : number;
		bottom : number;
		top : number;
		zoom : number;
		x : number;
		y : number;
		z : number;
	} = {
		type : 'PerspectiveCamera',
		fov : 50,
		left : -1, 
		right : 1,
		top : 1,
		bottom : -1,
		zoom : 1,
		x : 1000,
		y : 500,
		z : 1000
	}
}
