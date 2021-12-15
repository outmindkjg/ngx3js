import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-video',
	templateUrl: './webxr-vr-video.component.html',
	styleUrls: ['./webxr-vr-video.component.scss'],
})
export class WebxrVrVideoComponent extends NgxBaseComponent<{
	left: boolean;
	right: boolean;
}> {
	constructor() {
		super(
			{
				left: true,
				right: false,
			},
			[
				{
					name: 'left',
					type: 'checkbox',
					change: () => {
						this.checkLayers();
					},
				},
				{
					name: 'right',
					type: 'checkbox',
					change: () => {
						this.checkLayers();
					},
				},
			]
		);
	}

	layers: number[] = [1];

	checkLayers() {
		this.layers = [];
		if (this.controls.left) {
			this.layers.push(1);
		}
		if (this.controls.right) {
			this.layers.push(2);
		}
	}

	setGeometry1(geometry: I3JS.BufferGeometry) {
		const uvs1 = geometry.attributes.uv.array as any;
		for (let i = 0; i < uvs1.length; i += 2) {
			uvs1[i] *= 0.5;
		}
	}

	setGeometry2(geometry: I3JS.BufferGeometry) {
		const uvs1 = geometry.attributes.uv.array as any;
		for (let i = 0; i < uvs1.length; i += 2) {
			uvs1[i] *= 0.5;
			uvs1[i] += 0.5;
		}
	}
}
