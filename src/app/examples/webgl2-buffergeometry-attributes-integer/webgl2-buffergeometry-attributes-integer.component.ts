import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl2-buffergeometry-attributes-integer',
	templateUrl: './webgl2-buffergeometry-attributes-integer.component.html',
	styleUrls: ['./webgl2-buffergeometry-attributes-integer.component.scss'],
})
export class Webgl2BuffergeometryAttributesIntegerComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const triangles = 10000;
		const positions = [];
		const uvs = [];
		const textureIndices = [];
		const n = 800,
			n2 = n / 2; // triangles spread in the cube
		const d = 50,
			d2 = d / 2; // individual triangle size

		for (let i = 0; i < triangles; i++) {
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

			// uvs

			uvs.push(0, 0);
			uvs.push(0.5, 1);
			uvs.push(1, 0);

			// texture indices

			const t = i % 3;
			textureIndices.push(t, t, t);
		}
		this.positions = positions;
		this.uvs = uvs;
		this.textureIndices = textureIndices;
	}

	positions: number[] = [];
	uvs: number[] = [];
	textureIndices: number[] = [];
}
