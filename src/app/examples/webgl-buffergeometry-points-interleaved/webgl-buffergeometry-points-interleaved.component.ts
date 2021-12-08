import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-webgl-buffergeometry-points-interleaved',
	templateUrl: './webgl-buffergeometry-points-interleaved.component.html',
	styleUrls: ['./webgl-buffergeometry-points-interleaved.component.scss'],
})
export class WebglBuffergeometryPointsInterleavedComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const particles = 500000;
		const positions = [];
		const colors = [];

		const color = new THREE.Color();

		const n = 1000,
			n2 = n / 2; // particles spread in the cube

		for (let i = 0; i < particles; i++) {
			// positions

			const x = Math.random() * n - n2;
			const y = Math.random() * n - n2;
			const z = Math.random() * n - n2;

			positions.push(x, y, z);

			// colors

			const vx = x / n + 0.5;
			const vy = y / n + 0.5;
			const vz = z / n + 0.5;

			color.setRGB(vx, vy, vz);

			colors.push(color.r, color.g, color.b);
		}
		this.positions = positions;
		this.colors = colors;
	}

	positions: number[] = [];
	colors: number[] = [];
}
