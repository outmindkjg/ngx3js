import { Component } from '@angular/core';
import {
	I3JS, NgxBaseComponent,
	NgxControlComponent, NgxMeshComponent, IRendererEvent,
	IRendererTimer, THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-modifier-curve',
	templateUrl: './webgl-modifier-curve.component.html',
	styleUrls: ['./webgl-modifier-curve.component.scss'],
})
export class WebglModifierCurveComponent extends NgxBaseComponent<{
	moveAlongCurve: number;
}> {
	constructor() {
		super(
			{
				moveAlongCurve: 0.001,
			},
			[
				{
					name: 'moveAlongCurve',
					type: 'number',
					min: 0.001,
					max: 0.01,
					step: 0.001,
				},
			]
			,false , false);
	}

	initialPoints: { x: number; y: number; z: number }[] = [
		{ x: 1, y: 0, z: -1 },
		{ x: 1, y: 0, z: 1 },
		{ x: -1, y: 0, z: 1 },
		{ x: -1, y: 0, z: -1 },
	];

	curvePath: { x: number; y: number; z: number }[] = this.initialPoints;

	onUpPosition = new THREE.Vector2();
	onDownPosition = new THREE.Vector2();

	orbitControl: NgxControlComponent = null;
	setOrbitControl(orbitControl: NgxControlComponent) {
		this.orbitControl = orbitControl;
	}

	transformControl: NgxControlComponent = null;
	setTransformControl(transformControl: NgxControlComponent) {
		this.transformControl = transformControl;
	}

	setTransformEventListener(event: { type: string; event: any }) {
		if (this.orbitControl !== null) {
			switch (event.type) {
				case 'dragging-changed':
					const controls = this.orbitControl.getControl();
					controls.enabled = !event.event.value;
					break;
				case 'objectChange':
					const curvePath: { x: number; y: number; z: number }[] = [];

					this.pointMesh.forEach((mesh) => {
						const position = mesh.position;
						curvePath.push({
							x: position.x,
							y: position.y,
							z: position.z,
						});
					});
					this.curvePath = curvePath;
					break;
			}
		}
	}

	setPointMesh(mesh: NgxMeshComponent) {
		this.pointMesh.push(mesh.getObject3d());
	}

	pointMesh: I3JS.Object3D[] = [];

	setEventListener(event: IRendererEvent) {
		switch (event.type) {
			case 'pointerdown':
				this.onDownPosition.x = event.offsetX;
				this.onDownPosition.y = event.offsetY;
				break;
			case 'pointerup':
				this.onUpPosition.x = event.offsetX;
				this.onUpPosition.y = event.offsetY;
				if (
					this.transformControl !== null &&
					this.onDownPosition.distanceTo(this.onUpPosition) === 0
				) {
					const transformControl = this.transformControl.getControl();
					transformControl.detach();
				}
				break;
			case 'pointermove':
				if (this.camera !== null && this.transformControl !== null) {
					const intersect = this.camera.getIntersection(
						event.mouse,
						this.pointMesh
					);
					if (intersect !== null) {
						const object = intersect.object;
						const transformControl = this.transformControl.getControl();
						if (object !== transformControl.object) {
							transformControl.attach(object);
						}
					}
				}
				break;
			default:
				break;
		}
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
	}
}
