import { Component } from '@angular/core';
import { BaseComponent, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-buffergeometry-glbufferattribute',
	templateUrl: './webgl-buffergeometry-glbufferattribute.component.html',
	styleUrls: ['./webgl-buffergeometry-glbufferattribute.component.scss'],
})
export class WebglBuffergeometryGlbufferattributeComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const particles = 300000;
		const positions = [];
		const positions2 = [];
		const colors = [];
		const color = N3js.getColor();
		const n = 1000,
			n2 = n / 2; // particles spread in the cube
		for (let i = 0; i < particles; i++) {
			// positions
			const x = Math.random() * n - n2;
			const y = Math.random() * n - n2;
			const z = Math.random() * n - n2;
			positions.push(x, y, z);
			positions2.push(z * 0.3, x * 0.3, y * 0.3);

			// colors

			const vx = x / n + 0.5;
			const vy = y / n + 0.5;
			const vz = z / n + 0.5;

			color.setRGB(vx, vy, vz);

			colors.push(color.r, color.g, color.b);
		}

		this.positions = positions;
		this.positions2 = positions2;
		this.colors = colors;
	}

	positions: number[] = [];
	positions2: number[] = [];
	colors: number[] = [];
}
