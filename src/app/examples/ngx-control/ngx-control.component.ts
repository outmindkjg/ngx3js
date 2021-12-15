import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	NgxBaseComponent,
	NgxControlComponent as Ngx3JsControlComponent,
	NgxMeshComponent,
	IRendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-ngx-control',
	templateUrl: './ngx-control.component.html',
	styleUrls: ['./ngx-control.component.scss'],
})
export class NgxControlComponent extends NgxBaseComponent<{
	controlType: string;
	minDistance: number;
	maxDistance: number;
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				controlType: 'OrbitControls',
				minDistance: 3,
				maxDistance: 100,
			},
			[
				{
					name: 'controlType',
					type: 'select',
					select: [
						'FlyControls',
						'FirstPersonControls',
						'DeviceOrientationControls',
						'DragControls',
						'TransformControls',
						'TrackballControls',
						'ArcballControls',
						'PlaneControls',
						'OrbitControls',
						'AVRControls',
					],
					change: () => {
						this.resetCamera();
					},
					listen: true,
				},
				{ name: 'minDistance', type: 'number', min: 2, max: 10, step: 0.1 },
				{ name: 'maxDistance', type: 'number', min: 10, max: 100, step: 0.1 },
			],
			true,
			false
		);
	}

	ngOnInit() {
		this.subscribeRefer(
			'router',
			this.route.params.subscribe((params) => {
				if (params['type']) {
					this.getTimeout().then(() => {
						this.controls.controlType = params['type'];
					});
				}
			})
		);
	}

	control: any = null;
	setControl(control: Ngx3JsControlComponent) {
		this.control = control.getControl();
		this.changeControl();
	}

	changeControl() {
		if (this.meshObject3d !== null && this.control !== null) {
			this.resetCamera();
			switch (this.controls.controlType) {
				case 'DragControls':
					if (this.meshObject3d !== null) {
						const draggableObjects = this.control.getObjects();
						draggableObjects.length = 0;
						draggableObjects.push(this.meshObject3d);
					}
					break;
				case 'TransformControls':
					if (this.meshObject3d !== null) {
						this.control.attach(this.meshObject3d);
					}
					break;
			}
		}
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.changeControl();
	}

	resetCamera() {
		if (this.cameraObject3d !== null) {
			(this.cameraObject3d.position).set(0, 5, 10);
		}
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
		}
	}
}
