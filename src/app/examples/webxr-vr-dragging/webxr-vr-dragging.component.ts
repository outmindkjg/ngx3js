import { Component } from '@angular/core';
import {
	NgxAbstractGeometryComponent, NgxBaseComponent, NgxSharedComponent
} from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-dragging',
	templateUrl: './webxr-vr-dragging.component.html',
	styleUrls: ['./webxr-vr-dragging.component.scss'],
})
export class WebxrVrDraggingComponent extends NgxBaseComponent<{
	lookat: {
		x: number;
		y: number;
		z: number;
	};
}> {
	constructor() {
		super(
			{
				lookat: {
					x: 0,
					y: 0,
					z: 0,
				},
			},
			[
				{
					name: 'Look At',
					type: 'folder',
					control: 'lookat',
					children: [
						{ name: 'x', type: 'number', min: -1, max: 1, step: 0.1 },
						{ name: 'y', type: 'number', min: -1, max: 1, step: 0.1 },
						{ name: 'z', type: 'number', min: -1, max: 1, step: 0.1 },
					],
				},
			]
			,false , false);
	}

	setShared(shared: NgxSharedComponent) {
		const geometries = shared.getGeometryComponents();
		this.getTimeout(100).then(() => {
			this.geoInfos = [];
			for (let i = 0; i < 50; i++) {
				this.geoInfos.push({
					geometry: geometries[Math.floor(Math.random() * geometries.length)],
					color: Math.random() * 0xffffff,
					position: {
						x: Math.random() * 4 - 2,
						y: Math.random() * 2,
						z: Math.random() * 4 - 2,
					},
					rotation: {
						x: Math.random() * 360,
						y: Math.random() * 360,
						z: Math.random() * 360,
					},
					scale: Math.random() + 0.5,
				});
			}
		});
	}

	geoInfos: {
		geometry: NgxAbstractGeometryComponent;
		color: number;
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: number;
	}[] = [];
}
