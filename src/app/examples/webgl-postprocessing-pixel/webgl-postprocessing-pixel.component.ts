import { Component } from '@angular/core';
import {
	NgxAbstractGeometryComponent,
	NgxBaseComponent, NgxSharedComponent, IRendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-pixel',
	templateUrl: './webgl-postprocessing-pixel.component.html',
	styleUrls: ['./webgl-postprocessing-pixel.component.scss'],
})
export class WebglPostprocessingPixelComponent extends NgxBaseComponent<{
	pixelSize: number;
	postprocessing: boolean;
}> {
	constructor() {
		super(
			{
				pixelSize: 16,
				postprocessing: true,
			},
			[
				{ name: 'pixelSize', type: 'number', min: 2, max: 32, step: 2 },
				{ name: 'postprocessing', type: 'checkbox' },
			]
			,false , false);
	}

	setShared(shared: NgxSharedComponent) {
		this.geometries = shared.getGeometryComponents();
		setTimeout(() => {
			this.setMeshInfos(25);
		}, 100);
	}

	geometries: NgxAbstractGeometryComponent[] = null;

	setMeshInfos(len: number) {
		this.meshInfos = [];
		for (let i = 0; i < len; i++) {
			const geometry =
				this.geometries[Math.floor(Math.random() * this.geometries.length)];
			this.meshInfos.push({
				geometry: geometry,
				color:
					'hsl(' +
					Math.random() +
					', +' +
					(0.7 + 0.2 * Math.random()) +
					', ' +
					(0.5 + 0.1 * Math.random()) +
					')',
				scale: 4 + Math.random() * 10,
				position: {
					x: Math.random() - 0.5,
					y: Math.random() - 0.5,
					z: Math.random() - 0.5,
					multiply: Math.random() * 200,
				},
				rotation: {
					x: Math.random() * 180,
					y: Math.random() * 180,
					z: Math.random() * 180,
				},
			});
		}
	}

	meshInfos: {
		geometry: NgxAbstractGeometryComponent;
		color: string;
		scale: number;
		position: { x: number; y: number; z: number; multiply: number };
		rotation: { x: number; y: number; z: number };
	}[] = [];

	onRender(timer: IRendererTimer) {
		super.onRender(timer);

		if (this.mesh !== null) {
			const meshChildren = this.mesh.getObject3d().children;
			const delta = timer.delta * 20;
			meshChildren.forEach((child) => {
				child.rotation.y += 0.0015 * delta;
				child.rotation.z += 0.001 * delta;
			});
		}
	}
}
