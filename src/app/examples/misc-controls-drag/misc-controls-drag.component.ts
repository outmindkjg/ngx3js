import { Component } from '@angular/core';
import {
	I3JS, NgxBaseComponent,
	NgxControlComponent, NgxMeshComponent,
	IRendererEvent
} from 'ngx3js';

@Component({
	selector: 'app-misc-controls-drag',
	templateUrl: './misc-controls-drag.component.html',
	styleUrls: ['./misc-controls-drag.component.scss'],
})
export class MiscControlsDragComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
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
	onMouseClick(event: IRendererEvent) {
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
							const object = intersection.object as any;
							const group = this.group;
							if (group.children.includes(object) === true) {
								object['material'].emissive.set(0x000000);
								this.meshObject3d.attach(object);
							} else {
								object['material'].emissive.set(0xaaaaaa);
								group.attach(object);
							}
							this.control.transformGroup = true;
							draggableObjects.push(group as any);
						}
					}
					break;
				default:
					break;
			}
		}
	}

	setDragControl(control: NgxControlComponent) {
		this.control = control.getControl();
		if (this.meshChildren !== null) {
			const draggableObjects = this.control.getObjects();
			draggableObjects.length = 0;
			this.meshChildren.forEach((mesh) => {
				draggableObjects.push(mesh as any);
			});
		}
	}

	setGroup(mesh: NgxMeshComponent) {
		this.group = mesh.getObject3d();
	}

	group: I3JS.Object3D = null;

	control: I3JS.DragControls = null;
}
