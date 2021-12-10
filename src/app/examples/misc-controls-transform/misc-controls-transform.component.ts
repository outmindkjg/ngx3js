import { Component } from '@angular/core';
import {
	BaseComponent,
	ControlComponent,
	MeshComponent, N3js, RendererComponent,
	RendererEvent
} from 'ngx3js';

@Component({
	selector: 'app-misc-controls-transform',
	templateUrl: './misc-controls-transform.component.html',
	styleUrls: ['./misc-controls-transform.component.scss'],
})
export class MiscControlsTransformComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	onUpPosition = N3js.getVector2();
	onDownPosition = N3js.getVector2();

	transformControl: ControlComponent = null;

	setRender(renderer: RendererComponent) {
		super.setRender(renderer);
		this.setOrbitControl(renderer.getRenderControl());
	}

	setTransformControl(transformControl: ControlComponent) {
		this.transformControl = transformControl;
		if (this.meshObject3d !== null) {
			this.transformControl.getControl().attach(this.meshObject3d);
		}
	}

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		if (this.transformControl !== null) {
			this.transformControl.getControl().attach(this.meshObject3d);
		}
	}

	orbitControl: ControlComponent = null;

	setOrbitControl(orbitControl: ControlComponent) {
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

	setEventListener(event: RendererEvent) {
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
							control.setRotationSnap(N3js.MathUtils.degToRad(15));
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
							break;
						case 86: // V
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
}
