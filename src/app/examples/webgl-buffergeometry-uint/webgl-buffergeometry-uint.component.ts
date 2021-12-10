import { Component } from '@angular/core';
import { BaseComponent, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-buffergeometry-uint',
	templateUrl: './webgl-buffergeometry-uint.component.html',
	styleUrls: ['./webgl-buffergeometry-uint.component.scss'],
})
export class WebglBuffergeometryUintComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const triangles = 500000;
		const positions = [];
		const normals = [];
		const colors = [];

		const color = N3js.getColor();

		const n = 800,
			n2 = n / 2; // triangles spread in the cube
		const d = 12,
			d2 = d / 2; // individual triangle size

		const pA = N3js.getVector3();
		const pB = N3js.getVector3();
		const pC = N3js.getVector3();

		const cb = N3js.getVector3();
		const ab = N3js.getVector3();

		for (let i = 0; i < triangles; i++) {
			// positions

			const x = Math.random() * n - n2;
			const y = Math.random() * n - n2;
			const z = Math.random() * n - n2;

			const ax = x + Math.random() * d - d2;
			const ay = y + Math.random() * d - d2;
			const az = z + Math.random() * d - d2;

			const bx = x + Math.random() * d - d2;
			const by = y + Math.random() * d - d2;
			const bz = z + Math.random() * d - d2;

			const cx = x + Math.random() * d - d2;
			const cy = y + Math.random() * d - d2;
			const cz = z + Math.random() * d - d2;

			positions.push(ax, ay, az);
			positions.push(bx, by, bz);
			positions.push(cx, cy, cz);

			// flat face normals

			pA.set(ax, ay, az);
			pB.set(bx, by, bz);
			pC.set(cx, cy, cz);

			cb.subVectors(pC, pB);
			ab.subVectors(pA, pB);
			cb.cross(ab);

			cb.normalize();

			const nx = cb.x;
			const ny = cb.y;
			const nz = cb.z;

			normals.push(nx * 32767, ny * 32767, nz * 32767);
			normals.push(nx * 32767, ny * 32767, nz * 32767);
			normals.push(nx * 32767, ny * 32767, nz * 32767);

			// colors

			const vx = x / n + 0.5;
			const vy = y / n + 0.5;
			const vz = z / n + 0.5;

			color.setRGB(vx, vy, vz);

			colors.push(color.r * 255, color.g * 255, color.b * 255);
			colors.push(color.r * 255, color.g * 255, color.b * 255);
			colors.push(color.r * 255, color.g * 255, color.b * 255);
		}
		this.positions = positions;
		this.normals = normals;
		this.colors = colors;
	}

	positions: number[] = [];
	normals: number[] = [];
	colors: number[] = [];
}
