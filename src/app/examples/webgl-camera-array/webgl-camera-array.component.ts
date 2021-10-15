import { Component, OnInit } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-camera-array',
	templateUrl: './webgl-camera-array.component.html',
	styleUrls: ['./webgl-camera-array.component.scss'],
})
export class WebglCameraArrayComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	cameraInfos: {
		viewport: { x: string; y: string; width: string; height: string };
		position: { x: number; y: number; z: number };
	}[] = [];
	ngOnInit(): void {
		this.cameraInfos = [];
		let AMOUNT = 6;
		for (let y = 0; y < AMOUNT; y++) {
			for (let x = 0; x < AMOUNT; x++) {
				this.cameraInfos.push({
					viewport: {
						x: ((x / AMOUNT) * 100).toFixed(3) + '%',
						y: ((y / AMOUNT) * 100).toFixed(3) + '%',
						width: ((1 / AMOUNT) * 100).toFixed(3) + '%',
						height: ((1 / AMOUNT) * 100).toFixed(3) + '%',
					},
					position: {
						x: x / AMOUNT - 0.5,
						y: 0.5 - y / AMOUNT,
						z: 1.5,
					},
				});
			}
		}
	}

	onRender(timer: RendererTimer) {
		if (this.mesh !== null) {
			this.mesh.addRotation(0.28, 0, 0.57);
		}
		super.onRender(timer);
	}
}
