import { Component } from '@angular/core';
import { NgxBaseComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-buffergeometry-selective-draw',
	templateUrl: './webgl-buffergeometry-selective-draw.component.html',
	styleUrls: ['./webgl-buffergeometry-selective-draw.component.scss'],
})
export class WebglBuffergeometrySelectiveDrawComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		const numLat = 100;
		const numLng = 200;
		let numLinesCulled = 0;
		const linePositions = new Float32Array(numLat * numLng * 3 * 2);
		const lineColors = new Float32Array(numLat * numLng * 3 * 2);
		const visible = new Float32Array(numLat * numLng * 2);
		const radius = 1.0;
		for (let i = 0; i < numLat; ++i) {
			for (let j = 0; j < numLng; ++j) {
				const lat = (Math.random() * Math.PI) / 50.0 + (i / numLat) * Math.PI;
				const lng =
					(Math.random() * Math.PI) / 50.0 + (j / numLng) * 2 * Math.PI;

				const index = i * numLng + j;

				linePositions[index * 6 + 0] = 0;
				linePositions[index * 6 + 1] = 0;
				linePositions[index * 6 + 2] = 0;
				linePositions[index * 6 + 3] = radius * Math.sin(lat) * Math.cos(lng);
				linePositions[index * 6 + 4] = radius * Math.cos(lat);
				linePositions[index * 6 + 5] = radius * Math.sin(lat) * Math.sin(lng);

				const color = new THREE.Color(0xffffff);

				color.setHSL(lat / Math.PI, 1.0, 0.2);
				lineColors[index * 6 + 0] = color.r;
				lineColors[index * 6 + 1] = color.g;
				lineColors[index * 6 + 2] = color.b;

				color.setHSL(lat / Math.PI, 1.0, 0.7);
				lineColors[index * 6 + 3] = color.r;
				lineColors[index * 6 + 4] = color.g;
				lineColors[index * 6 + 5] = color.b;

				// non-0 is visible
				visible[index * 2 + 0] = 1.0;
				visible[index * 2 + 1] = 1.0;
			}
		}
		this.linePositions = linePositions;
		this.lineColors = lineColors;
		this.lineVisible = visible;
	}

	linePositions: Float32Array;
	lineColors: Float32Array;
	lineVisible: Float32Array;
}
