import { Component } from '@angular/core';
import { BaseComponent, ControlComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-control',
	templateUrl: './ngx-control.component.html',
	styleUrls: ['./ngx-control.component.scss'],
})
export class NgxControlComponent extends BaseComponent<{
	controlType: string;
}> {
	constructor() {
		super(
			{
				controlType: 'OrbitControls',
			},
			[{ name: 'controlType', type: 'select' , select : [ 'FlyControls','FirstPersonControls','DeviceOrientationControls','DragControls','TransformControls','TrackballControls','ArcballControls','PlaneControls','OrbitControls'], change : () => {
				this.resetCamera();
			} }]
		);
	}

	control : any = null;
	setControl(control: ControlComponent) {
		this.control = control.getControl();
		switch(this.controls.controlType) {
			case 'DragControls' :
				if (this.meshObject3d !== null) {
					const draggableObjects = this.control.getObjects();
					draggableObjects.length = 0;
					draggableObjects.push(this.meshObject3d);
				}
				break;
			case 'TransformControls' :
				if (this.meshObject3d !== null) {
					this.control.attach(this.meshObject3d);
				}
				break;

		}
	}

	resetCamera() {
		(this.cameraObject3d.position as THREE.Vector3).set(0, 5, 10);
	}

	onRender(timer : RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
		}
	}

}
