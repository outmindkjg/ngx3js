import { Component } from '@angular/core';
import {
	BaseComponent,
	ControlComponent,
	MeshComponent,
	RendererEvent,
	DragControls,
} from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-misc-controls-drag',
	templateUrl: './misc-controls-drag.component.html',
	styleUrls: ['./misc-controls-drag.component.scss'],
})
export class MiscControlsDragComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.boxInfos = [];
		for (let i = 0; i < 200; i++) {
			this.boxInfos.push({
				color: Math.random() * 0xffffff,
				position: {
					x: Math.random() * 1000 - 500,
					y: Math.random() * 600 - 300,
					z: Math.random() * 800 - 400,
				},
				rotation: {
					x: Math.random() * 2 * 180,
					y: Math.random() * 2 * 180,
					z: Math.random() * 2 * 180,
				},
				scale: {
					x: Math.random() * 2 + 1,
					y: Math.random() * 2 + 1,
					z: Math.random() * 2 + 1,
				},
			});
		}
	}

	boxInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: { x: number; y: number; z: number };
		color: number;
	}[] = [];

	enableSelection: boolean = false;
	onMouseClick(event: RendererEvent) {
		if (this.camera !== null) {
			switch (event.type) {
				case 'keydown':
					this.enableSelection = event.event.keyCode === 16 ? true : false;
					break;
				case 'keyup':
					this.enableSelection = false;
					break;
				case 'pointerdown':
					if (this.enableSelection) {
						const draggableObjects = this.control.getObjects();
						draggableObjects.length = 0;
						const intersection = this.camera.getIntersection(event.mouse, [
							...this.meshChildren,
							...this.group.children,
						]);
						if (intersection !== null && intersection.object !== null) {
							const object = intersection.object;
							const group = this.group;
							if (group.children.includes(object) === true) {
								object['material'].emissive.set(0x000000);
								this.meshObject3d.attach(object);
							} else {
								object['material'].emissive.set(0xaaaaaa);
								group.attach(object);
							}
							this.control.transformGroup = true;
							draggableObjects.push(group);
						}
					}
					break;
				default:
					// console.log(event.type);
					break;
			}
		}
	}

	setDragControl(control: ControlComponent) {
		this.control = control.getControl();
		if (this.meshChildren !== null) {
			const draggableObjects = this.control.getObjects();
			draggableObjects.length = 0;
			this.meshChildren.forEach((mesh) => {
				draggableObjects.push(mesh);
			});
		}
	}

	setGroup(mesh: MeshComponent) {
		this.group = mesh.getObject3d();
	}

	group: THREE.Object3D = null;

	control: DragControls = null;
}
